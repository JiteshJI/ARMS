using AutoMapper;
using Microsoft.Data.SqlClient;
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
    public class ConfigRepository :  GenericRepository<ConfigItem>, IConfigRepository
    {

        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;
        public ConfigRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }

        //public async Task<List<ConfigItem>> GetAllConfigItemsAsync()
        //{
        //    return await _cache.GetOrCreateAsync("Config", entry =>
        //    {
        //        return _context.ArmsConfigItems.ToListAsync();
        //    });
        //}

        public ConfigItem UpdateConfigItem(ConfigItem ci)
        {
            _context.ArmsConfigItems.Update(ci);
            _context.Attach(ci);
            _context.Entry(ci).State = EntityState.Modified;
            _context.SaveChanges();
            _cache.Remove("Config");
            return ci;
        }

        public ConfigItem GetConfigByKey(string key)
        {
            return _context.ArmsConfigItems.Where(ci => ci.KeyNme == key).FirstOrDefault();
        }

    }
}
