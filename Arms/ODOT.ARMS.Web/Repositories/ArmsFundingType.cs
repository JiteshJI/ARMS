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
    public class ArmsFundingTypeRepository : GenericRepository<ArmsFundingType>, IArmsFundingType
    {

        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsFundingTypeRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }

        public async Task<ArmsFundingType> AddArmsArmsFundingTypeAsync(ArmsFundingType armsFundingType)
        {
            await _context.ArmsFundingType.AddAsync(armsFundingType);
            await _context.SaveChangesAsync();
            _cache.Remove("FundingType");
            return armsFundingType;
        }

        public async Task<List<ArmsFundingType>> GetAllArmsFundingTypeAsync()
        {
            return await _cache.GetOrCreateAsync("FundingType", entry =>
            {
                return _context.ArmsFundingType.ToListAsync(); 
            });
        }

        public async Task<ArmsFundingType> GetArmsArmsFundingTypeIdAsync(int armsFundingTypeId)
        {
            var result = await GetAllArmsFundingTypeAsync();
            return result.FirstOrDefault(a => a.FundingTypeId == armsFundingTypeId);
        }

        public ArmsFundingType UpdateArmsArmsFundingType(ArmsFundingType armsFundingType)
        {
            _context.ArmsFundingType.Update(armsFundingType);
            _context.SaveChanges();
            _cache.Remove("FundingType");
            return armsFundingType;
        }
    }
}
