using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public class ArmsEventUploadRepository: GenericRepository<FileUpload>, IArmsEventUploadRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsEventUploadRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }

        public async Task<FileUpload> AddArmsEventUploadAsync(FileUpload upload)
        {
            await _context.ArmsEventUploads.AddAsync(upload);
            await _context.SaveChangesAsync();
            _cache.Remove("Upload");
            return upload;
        }
        public async Task<List<FileUpload>> GetAllArmsEventUploadAsync()
        {
            return await _cache.GetOrCreateAsync("Upload", entry =>
            {
                return _context.ArmsEventUploads.ToListAsync();
            });            
        }

        public async Task<List<FileUpload>> GetUploadBySrcIdAsync(Guid srcId)
        {
            var result = await GetAllArmsEventUploadAsync();
            return result.Where(a => a.EventSrc == srcId).ToList();
        }

        public async Task<int> GetUploadCountBySrcIdAsync(Guid srcId) {
            var rst = await GetUploadBySrcIdAsync(srcId);
            return rst.Count;
        }

        public async Task<List<FileUpload>> GetUploadByProjAltIdAsync(int projAltId) {
            var result = await GetAllArmsEventUploadAsync();
            return result.Where(a => a.ProjAltId == projAltId).ToList();
        }

        public FileUpload UpdateArmsEventUploadType(FileUpload upload)
        {
            _context.ArmsEventUploads.Update(upload);
            _context.Attach(upload);
            _context.Entry(upload).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            _cache.Remove("Upload");
            return upload;
        }
        public async Task<FileUpload> GetUploadByEventIdAsync(Guid Id)
        {
            var result = await GetAllArmsEventUploadAsync();
            return result.Where(a => a.EventUploadId == Id).First();
        }

        public void DeleteUpload(FileUpload upload)
        {
            _context.ArmsEventUploads.Remove(upload);
            _context.SaveChanges();
            _cache.Remove("Upload");
        }
    }
}
