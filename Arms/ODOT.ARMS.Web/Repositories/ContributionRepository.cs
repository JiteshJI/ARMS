using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ContributionRepository:
    GenericRepository<ArmsContribution>, IArmsContributionRepository
        {
            private IMemoryCache _cache;
            private readonly IMapper _mapper;
            private new readonly ARMSContext _context;

            public ContributionRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
            {
                _mapper = mapper;
                _cache = memoryCache;
                _context = context;
            }
            public async Task<ArmsContribution> AddArmsContribAsync(ArmsContribution cb)
            {
                await _context.ARMSContributions.AddAsync(cb);
                await _context.SaveChangesAsync();
                _cache.Remove("CB");
                return cb;
            }
            public void CommitChanges()
            {
                _context.SaveChanges();
            }

            public async Task<List<ArmsContribution>> GetAllArmsContribAsync()
            {
                return await _cache.GetOrCreateAsync("CB", entry =>
                {
                    return _context.ARMSContributions.ToListAsync();
                });

                //return await _cache.GetOrCreateAsync("Event", entry =>
                //{
                //    return _context.ArmsEvents.ToListAsync();
                //});
            }

            public async Task<IEnumerable<ArmsContribution>> GetAllArmsContribAsyncByProjectId(Guid ProjectId)
            {
                var result = await GetAllArmsContribAsync();
                return result.Where(a => a.ProjectId == ProjectId);
            }
            public async Task<ArmsContribution> GetArmsContribIdAsync(Guid Id)
            {
                //throw new NotImplementedException();
                var result = await GetAllArmsContribAsync();
                return result.FirstOrDefault(a => a.ContributionId == Id);
            }

            public ArmsContribution UpdateArmsContrib(ArmsContribution cb)
            {
                _context.ARMSContributions.Update(cb);
                _context.Attach(cb);
                _context.Entry(cb).State = EntityState.Modified;
                _context.SaveChanges();
                _cache.Remove("CB");
                return cb;
            }

            /// </summary>
            /// <param name="projectId"></param>
            /// <returns>
            /// It returns a list of scr and file counts
            /// </returns>
            public async Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId)
            {
                var projId = new SqlParameter("projId", projectId);
                return await _context.ArmsSrcCBFileCount.FromSqlRaw(@"
                SELECT 
                    CB.CONTROLLING_BOARD_ID AS Src, 
                    COUNT(1) AS FileCount
                FROM 
	                ARMS_POOLED_CONTRIBUTIONS CB
	                INNER JOIN ARMS_EVENT_UPLOAD U ON U.EVENT_SRC = CB.CONTROLLING_BOARD_ID
                WHERE
	                U.ACTIVE_IND = 'A' AND
                  	CB.PROJ_ID = @projId
                GROUP BY CB.CONTROLLING_BOARD_ID", projId).ToListAsync();
            }
        }
    }


