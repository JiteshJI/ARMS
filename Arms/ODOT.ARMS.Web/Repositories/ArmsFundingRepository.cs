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
    public class ArmsFundingRepository : GenericRepository<Funding>, IArmsFundingRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsFundingRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public async Task<Funding> AddArmsFundingAsync(Funding funding)
        {
            await _context.ArmsFunding.AddAsync(funding);
            try
            {
                await _context.SaveChangesAsync();
                _cache.Remove("Funding");
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
            return funding;
        }

        public Funding UpdateArmsFunding(Funding funding)
        {
            _context.ArmsFunding.Update(funding);
            _context.Attach(funding);
            _context.Entry(funding).State = EntityState.Modified;
            _context.SaveChanges();
            _cache.Remove("Funding");
            return funding;
        }
       
        public async Task<IEnumerable<Funding>> GetAllArmFundingAsyncByProjectId(Guid ProjectId)
        {
            var result = await GetAllArmsFundingAsync();
            return result.Where(a => a.ProjectId == ProjectId);
        }

        public async Task<List<Funding>> GetAllArmsFundingAsync()
        {
            return await _cache.GetOrCreateAsync("Funding", entry =>
            {
                return _context.ArmsFunding.ToListAsync();
            });
        }

        public async Task<Funding> GetArmsFundingIdAsync(Guid Id)
        {
            var result = await GetAllArmsFundingAsync();
            return result.FirstOrDefault(a => a.EncumbranceId == Id);
        }
        public async Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId)
        {
            var projId = new SqlParameter("projId", projectId);
            return await _context.ArmsSrcFileCount.FromSqlRaw(@"
                SELECT 
                    E.ENCUMBRANCE_ID AS Src, 
                    COUNT(1) AS FileCount
                FROM 
	                ARMS_EMBUMBRANCE E
	                INNER JOIN ARMS_EVENT_UPLOAD U ON U.EVENT_SRC = E.ENCUMBRANCE_ID
                WHERE
	                U.ACTIVE_IND = 'A' AND
                  	E.PROJ_ID = @projId
                GROUP BY E.ENCUMBRANCE_ID", projId).ToListAsync();
        }
        public void CommitChanges()
        {
            _context.SaveChanges();
        }


    }
}
