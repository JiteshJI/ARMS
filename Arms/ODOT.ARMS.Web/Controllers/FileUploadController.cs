using System;
using System.Collections.Generic;
using System.Collections;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ODOT.ARMS.Web.Services.Interfaces;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Helpers;
//using Microsoft.AspNetCore.Authorization;//The future

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class FileUploadController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly IArmsEventUploadRepository _fileUploads;

        public FileUploadController(IMapper mapper, IFileService fileService, IArmsEventUploadRepository fileUploads)
        {
            _mapper = mapper;
            _fileService = fileService;
            _fileUploads = fileUploads;
        }

        [HttpGet("{projAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.uploadsforproject+json" })]
        public async Task<IActionResult> GetProjectUploads(int projAltId)
        {
            var projFilesFromRepo = await _fileUploads.GetUploadByProjAltIdAsync(projAltId);

            if (projFilesFromRepo == null)
                return BadRequest();

            return Ok(_mapper.Map<List<DTOs.FileUpload>>(projFilesFromRepo));
        }

        [HttpGet("{srcId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.uploadsforsource+json" })]
        public async Task<IActionResult> GetSourceUploads(Guid srcId)
        {
            var srcFilesFromRepo = await _fileUploads.GetUploadBySrcIdAsync(srcId);

            if (srcFilesFromRepo == null)
                return BadRequest();

            return Ok(_mapper.Map<List<DTOs.FileUpload>>(srcFilesFromRepo));
        }


        /***
         * To make this work, we will need to add security in the future
         * to prevent anyone from downloading any file
         * 
         */
        [HttpGet("{projAltId}/uploads/{srcId}/download/{uploadId}")]
        public async Task<IActionResult> DownloadFile(int projAltId, string srcId, string uploadId)
        {
            var key = Guid.Parse(uploadId);
            var uploadFileFromRepo = await _fileUploads.GetUploadByEventIdAsync(key);

            if (uploadFileFromRepo == null)
                return BadRequest();
            var filePath = _fileService.GetUploadedFilePath(projAltId, srcId, uploadId + (Path.GetExtension(uploadFileFromRepo.DocumentName) ?? "").ToLower());
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            //Restore the original File name
            return File(fileBytes, FileUtils.GetContentType(filePath), uploadFileFromRepo.DocumentName);
        }

        [HttpGet("{uploadId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.uploadforid+json" })]
        public async Task<IActionResult> GetUpload(Guid uploadId)
        {

            var uploadFileFromRepo = await _fileUploads.GetUploadByEventIdAsync(uploadId);

            if (uploadFileFromRepo == null)
                return BadRequest();

            return Ok(_mapper.Map<List<DTOs.FileUpload>>(uploadFileFromRepo));
        }

        [HttpPatch("{uploadId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.fileforupdate+json" })]
        public async Task<IActionResult> UpdateUpload(Guid uploadId, [FromBody] DTOs.FileUpload fileForUpdate)
        {
            var uploadFileFromRepo = await _fileUploads.GetUploadByEventIdAsync(uploadId);
            if (uploadFileFromRepo == null)
            {
                Log.Info("Bad uploadFileFromRepo");
                return BadRequest();
            }

            _fileUploads.UpdateArmsEventUploadType(_mapper.Map(fileForUpdate, uploadFileFromRepo));
            return Ok(_mapper.Map<DTOs.FileUpload>(uploadFileFromRepo));
        }


        [HttpPost("{projAltId}/uploads/{srcId}/upload")]
        public async Task<IActionResult> UploadSrcFiles(int projAltId, string srcId)
        {
            var files = HttpContext.Request.Form.Files;
            if (files == null || !files.Any())
                return BadRequest();

            var savedFiles = await SaveUploadedFiles(projAltId, srcId, files);
            if (savedFiles == null)
                return StatusCode(500);

            return Ok(_mapper.Map<List<DTOs.FileUpload>>(savedFiles));
        }

        private async Task<List<Entities.FileUpload>> SaveUploadedFiles(int projAltId, string srcId, IFormFileCollection files)
        {
            var savedFiles = new List<Entities.FileUpload>();
            Log.Info("*********************************************PROJECT ALT ID******************************************");
            Log.Info(projAltId);
            Log.Info("*********************************************SRC ID******************************************");
            Log.Info(srcId);
            //var fileNames = new Hashtable();
            foreach (var file in files)
            {
                /* Save the file to fileshare */
                string newfileName, filePath;
                string newfileKey;
                try
                {
                    // Generate a guid to use as a file name
                    newfileKey = Guid.NewGuid().ToString("D");
                    newfileName = newfileKey + (Path.GetExtension(file.FileName) ?? "").ToLower();
                    Log.Info("*********************************************NEW FILE NAME******************************************");
                    Log.Info(newfileName);
                    //Make a Key List
                    //fileNames.Add(newfileKey, file.FileName);

                    var dirPath = _fileService.GetUploadedFileDirectoryName(projAltId, srcId);
                    Log.Info("*********************************************DIR PATH******************************************");
                    Log.Info(dirPath);
                    if (!Directory.Exists(dirPath))
                    {
                        Directory.CreateDirectory(dirPath);
                    }
                    filePath = _fileService.GetUploadedFilePath(projAltId, srcId, newfileName);
                    Log.Info("*********************************************FILE PATH******************************************");
                    Log.Info(filePath);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(ex);
                    return null;
                }

                /* Save File object to the DB */
                Entities.FileUpload newFile;
                try
                {
                    newFile = new Entities.FileUpload
                    {
                        EventUploadId = Guid.Parse(newfileKey),
                        EventSrc = Guid.Parse(srcId),
                        ProjAltId = projAltId,
                        DocumentName = file.FileName,
                        FileSize = file.Length,
                        PrivateInd = "N",//I need to pass a second list to deal with this
                        ActiveInd = "A",
                        UserId = "preicher",
                        UploadDate = DateTime.Now
                    };

                    await _fileUploads.AddArmsEventUploadAsync(newFile);

                    //await _unitOfWork.SaveAsync();
                }
                catch (Exception ex)
                {
                    Log.Error(ex);

                    // Cleanup files since save wasn't successful
                    _fileService.TryDeleteFile(filePath);

                    return null;
                }
                savedFiles.Add(newFile);
            }
            return savedFiles;
        }

        [HttpDelete("{EventUploadId}")]
        public async Task<IActionResult> DeleteUpload(string EventUploadId)
        {
            var key = Guid.Parse(EventUploadId);
            var uploadFileFromRepo = await _fileUploads.GetUploadByEventIdAsync(key);
            if (uploadFileFromRepo == null)
            {
                Log.Info("Bad DeleteUpload");
                return BadRequest();
            }
            //Do the file file operation here
            try
            {
                var filePath = _fileService.GetUploadedFilePath(uploadFileFromRepo.ProjAltId, uploadFileFromRepo.EventSrc.ToString(), EventUploadId + Path.GetExtension(uploadFileFromRepo.DocumentName));
                _fileService.TryDeleteFile(filePath);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }

            try
            {
                //Do the record removal
                _fileUploads.DeleteUpload(uploadFileFromRepo);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }

            return NoContent();
        }
    }
}
