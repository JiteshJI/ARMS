using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Services.Interfaces
{
    public interface IFileService
    {
        // Uploaded File Paths
        string GetUploadedFileDirectoryName(string guidFileName);
        string GetUploadedFileDirectoryName(int projAltId, string srcId);

        string GetUploadedFilePath(int projAltId, string srcId, string guidFileName);
        string GetUploadedFileName(string guidFileName);
        string GetUploadedFilePath(string guidFileName);
        void TryDeleteFiles(params string[] paths);
        void TryDeleteFile(string path);
        void TryDeleteFolder(string path);
    }
}
