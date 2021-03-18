using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsFinOverviewRepository : GenericRepository<FinOverviewDD>, IArmsFinOverviewRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsFinOverviewRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public async Task<IEnumerable<FinOverviewDD>> GetAllArmsOverviewAsyncByProjectId(Guid ProjectId)
        {
            var projId = new SqlParameter("projId", ProjectId);
            return await _context.ArmsFinOverview.FromSqlRaw("EXEC uspGetOverviewDataByProjectId @ProjId", projId).ToListAsync();
        }
    }
}
