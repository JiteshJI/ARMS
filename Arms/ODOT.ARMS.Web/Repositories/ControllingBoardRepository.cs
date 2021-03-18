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
    public class ControllingBoardRepository : GenericRepository<ControllingBoard>, IArmsControllingBoardRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ControllingBoardRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public async Task<ControllingBoard> AddArmsCBAsync(ControllingBoard cb)
        {
            await _context.ArmsControllingBoards.AddAsync(cb);
            await _context.SaveChangesAsync();
            _cache.Remove("CB");
            return cb;
        }
        public void CommitChanges()
        {
            _context.SaveChanges();
        }

        public async Task<List<ControllingBoard>> GetAllArmsCBAsync()
        {
            return await _cache.GetOrCreateAsync("CB", entry =>
            {
                return _context.ArmsControllingBoards.ToListAsync();
            });

            //return await _cache.GetOrCreateAsync("Event", entry =>
            //{
            //    return _context.ArmsEvents.ToListAsync();
            //});
        }

        public async Task<IEnumerable<ControllingBoard>> GetAllArmsCBAsyncByProjectId(Guid ProjectId)
        {
            var result = await GetAllArmsCBAsync();
            return result.Where(a=>a.ProjectId==ProjectId);
        }
        public async Task<ControllingBoard> GetArmsCBIdAsync(Guid Id)
        {
            //throw new NotImplementedException();
            var result = await GetAllArmsCBAsync();
            return result.FirstOrDefault(a => a.ControllingBoardId == Id);
        }

        public ControllingBoard UpdateArmsCB(ControllingBoard cb)
        {
            _context.ArmsControllingBoards.Update(cb);
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
	                ARMS_CONTROLLING_BOARD CB
	                INNER JOIN ARMS_EVENT_UPLOAD U ON U.EVENT_SRC = CB.CONTROLLING_BOARD_ID
                WHERE
	                U.ACTIVE_IND = 'A' AND
                  	CB.PROJ_ID = @projId
                GROUP BY CB.CONTROLLING_BOARD_ID", projId).ToListAsync();
        }
    }
}
