using Microsoft.Extensions.Options;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace ODOT.ARMS.Web.Services
{
    public class FileService : IFileService
    {
        protected static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly FileSettings _fileSettings;

        public FileService(IOptions<FileSettings> options)
        {
            _fileSettings = options.Value;
        }
        #region Uploaded File Paths
        private static readonly string _uploadedFilePath = @"UserUploads";

        public string GetUploadedFileDirectoryName(string guidFileName)
        {
            if (string.IsNullOrEmpty(guidFileName)) throw new ArgumentException("cannot be empty or null", "guidFileName");
            var dir = guidFileName.Substring(0, 2);
            return Path.Combine(_fileSettings.StorePath, _uploadedFilePath, dir);
        }

        public string GetUploadedFileDirectoryName(int projAltId, string srcId)
        {
            Log.Info("Store Path " + _fileSettings.StorePath);
            Log.Info("Upload Path " + _fileSettings.UploadPath);
            return _fileSettings.StorePath + string.Format(_fileSettings.UploadPath, projAltId, srcId);
            //return Path.Combine(_fileSettings.StorePath, string.Format(_fileSettings.UploadPath, projAltId, srcId));            
        }

        public string GetUploadedFileName(string guidFileName)
        {
            if (string.IsNullOrEmpty(guidFileName)) 
                throw new ArgumentException("cannot be empty or null", "guidFileName");
            return guidFileName.Substring(2);
        }
        public string GetUploadedFilePath(string guidFileName)
        {
            if (string.IsNullOrEmpty(guidFileName)) throw new ArgumentException("cannot be empty or null", "guidFileName");
            var dir = GetUploadedFileDirectoryName(guidFileName);
            var fileName = GetUploadedFileName(guidFileName);

            return Path.Combine(dir, fileName);
        }

        public string GetUploadedFilePath(int projAltId, string srcId, string guidFileName) {
            if (string.IsNullOrEmpty(guidFileName)) 
                throw new ArgumentException("cannot be empty or null", "guidFileName");
            var dir = GetUploadedFileDirectoryName(projAltId, srcId);
            Log.Info(guidFileName);
            return Path.Combine(dir, guidFileName);
        }

        public void TryDeleteFiles(params string[] paths)
        {
            TryDeleteFiles(paths);
        }
        public void TryDeleteFiles(IEnumerable<string> paths)
        {
            try
            {
                if (paths == null) return;

                foreach (var path in paths)
                {
                    TryDeleteFile(path);
                }
            }
            catch (Exception ex)
            {
                Log.Error("Error trying to delete files", ex);
            }
        }

        public void TryDeleteFile(string path)
        {
            if (path == null || !System.IO.File.Exists(path)) return;

            var tryCount = 3;
            var delay = 3000;
            while (tryCount-- > 0)
            {
                try
                {
                    System.IO.File.Delete(path);
                }
                catch (Exception ex)
                {
                    Log.Warn($"Error trying to delete file: {path}", ex);

                    // If we have failed the specified number of times then throw an error
                    if (tryCount == 0)
                        throw;
                    if (delay > 0)
                        Thread.Sleep(3000);
                }
            }
        }

        public void TryDeleteFolder(string path)
        {
            if (path == null || !System.IO.Directory.Exists(path)) return;

            var tryCount = 3;
            var delay = 3000;
            while (tryCount-- > 0)
            {
                try
                {
                    Directory.Delete(path);
                }
                catch (Exception ex)
                {
                    Log.Warn($"Error trying to delete file: {path}", ex);

                    // If we have failed the specified number of times then throw an error
                    if (tryCount == 0)
                        throw;
                    if (delay > 0)
                        Thread.Sleep(3000);
                }
            }
        }
        #endregion
    }
}
