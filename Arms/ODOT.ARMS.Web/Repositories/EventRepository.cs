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
    public class EventRepository : GenericRepository<Event>, IArmsEventRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;
        public EventRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public async Task<Event> AddArmsEventAsync(Event evnt)
        {
            //Console.WriteLine("AddArmsEventAsync");
            await _context.ArmsEvents.AddAsync(evnt);
            await _context.SaveChangesAsync();
            _cache.Remove("Event");
            return evnt;
        }

        public Event UpdateArmsEventType(Event evnt)
        {
            _context.ArmsEvents.Update(evnt);
            _context.Attach(evnt);
            _context.Entry(evnt).State = EntityState.Modified;
            _context.SaveChanges();
            _cache.Remove("Event");
            return evnt;
        }
        public async Task<List<Event>> GetAllArmsEventAsync()
        {
            return await _cache.GetOrCreateAsync("Event", entry =>
            {
                return _context.ArmsEvents.ToListAsync();
            });
        }
        public async Task<Event> GetArmsEventIdAsync(Guid Id)
        {
            var result = await GetAllArmsEventAsync();
            return result.FirstOrDefault(a => a.EventId == Id);
        }        

        public async Task<IEnumerable<Event>> GetAllArmsEventAsyncByProjectId(Guid ProjectId)
        {
            var result = await GetAllArmsEventAsync();
            return result.Where(a => a.ProjectId == ProjectId);
        }
        public void CommitChanges()
        {
            _context.SaveChanges();
        }


        /// <summary>
        /// This query will find the uploaded file count for project events
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns>
        /// It returns a list of scr and file counts
        /// </returns>
        public async Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId)
        {
            var projId = new SqlParameter("projId", projectId);
            return await _context.ArmsSrcFileCount.FromSqlRaw(@"
                SELECT 
                    E.EVENT_ID AS Src, 
                    COUNT(1) AS FileCount
                FROM 
	                ARMS_EVENT E
	                INNER JOIN ARMS_EVENT_UPLOAD U ON U.EVENT_SRC = E.EVENT_ID
                WHERE
	                U.ACTIVE_IND = 'A' AND
                  	E.PROJ_ID = @projId
                GROUP BY E.EVENT_ID", projId).ToListAsync();
        }

    }
}
