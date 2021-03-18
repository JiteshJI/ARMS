using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsEventUploadRepository
    {
        Task<List<FileUpload>> GetAllArmsEventUploadAsync();

        Task<List<FileUpload>> GetUploadBySrcIdAsync(Guid srcId);

        Task<int> GetUploadCountBySrcIdAsync(Guid srcId);

        Task<List<FileUpload>> GetUploadByProjAltIdAsync(int projAltId);

        Task<FileUpload> GetUploadByEventIdAsync(Guid Id);

        Task<FileUpload> AddArmsEventUploadAsync(FileUpload upload);

        FileUpload UpdateArmsEventUploadType(FileUpload upload);

        void DeleteUpload(FileUpload upload);

    }
}
