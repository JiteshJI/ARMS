using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsAdministrationCategoryRepository : GenericRepository<ArmsAdministrationCategory>, IArmsAdministrationCategory
    {
        private ARMSContext CurrentContext
        {
            get
            {
                return base._context as ARMSContext;
            }
        }
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        public ArmsAdministrationCategoryRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache ): base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
        }
        public async Task<ArmsAdministrationCategory> AddArmsAdministrationCategoryAsync(ArmsAdministrationCategory armsAdministrationCategory)
        {
            await CurrentContext.ArmsAdministrationCategory.AddAsync(armsAdministrationCategory);
            await CurrentContext.SaveChangesAsync();
            _cache.Remove("ArmsAdministrationCategory");
            return armsAdministrationCategory;
        }

        public async Task<List<ArmsAdministrationCategory>> GetAllArmsAdministrationCategoryAsync()
        {
            //return await _cache.GetOrCreateAsync("ArmsAdministrationCategories", entry =>
            //{
                return await CurrentContext.ArmsAdministrationCategory.ToListAsync();
            //});
        }

        public  ArmsAdministrationCategory GetArmsAdministrationCategoryId(int administrationCategoryId)
        {
            //var ContactAgencies = await GetAllArmsAdministrationCategoryAsync();
            return CurrentContext.ArmsAdministrationCategory.FirstOrDefault(a => a.AdministrationCategoryID == administrationCategoryId);
        }

        public  ArmsAdministrationCategory UpdateArmsAdministrationCategory(ArmsAdministrationCategory armsAdministrationCategory)
        {
             CurrentContext.ArmsAdministrationCategory.Update(armsAdministrationCategory);
             CurrentContext.SaveChanges();
            _cache.Remove("ArmsAdministrationCategory");
            return armsAdministrationCategory;
        }
    }
}
