using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsPersonnelRepository : GenericRepository<ArmsPersonnel>, IArmsPersonnelRepository
    {


        private IMemoryCache _cache;
        private IMapper _mapper;
        private new readonly ARMSContext _context;


        public ArmsPersonnelRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }

        public async Task<List<ArmsPersonnel>> GetAllPersonnelAsync()
        {
            return await _cache.GetOrCreateAsync("Personnel", entry =>
            {
                return _context.ArmsPersonnel.ToListAsync(); //brings back all the arms personnel
            });
        }

        public async Task<List<ArmsPersonnel>> GetPersonnelByPersonnelAsync(Guid Personneld)
        {
            var personnel = await GetAllPersonnelAsync();
            return personnel.FindAll(a => a.PersonnelId == Personneld);

        }

        public async Task<ArmsPersonnel> AddPersonnelAsync(ArmsPersonnel armsPersonnel)
        {
            await _context.ArmsPersonnel.AddAsync(armsPersonnel);
            await _context.SaveChangesAsync();
            _cache.Remove("Personnel");
            return armsPersonnel;
        }

        public ArmsPersonnel UpdatePersonnel(ArmsPersonnel armsPersonnel)
        {
           // _context.ArmsPersonnel.Update(armsPersonnel);
           // _context.Attach(armsPersonnel);
            _context.Entry(armsPersonnel).State = EntityState.Modified;
            _context.SaveChanges();
            _cache.Remove("Personnel");
            return armsPersonnel;
        }

        public async Task<ArmsPersonnel> GetPersonnelByIdAsync(Guid Personneld)
        {
            var personnel = await GetAllPersonnelAsync();
            return personnel.FirstOrDefault(a => a.PersonnelId == Personneld);
        }

         public async Task<List<ArmsPersonnel>> GetPersonnelByProjIdAsync(Guid PrjId)
        {
            var personnel = await GetAllPersonnelAsync();
            return personnel.FindAll(a => a.ProjId == PrjId);
        }

    }
}
