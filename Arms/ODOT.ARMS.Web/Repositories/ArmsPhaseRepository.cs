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
    public class ArmsPhaseRepository : GenericRepository<ArmsPhase>, IArmsPhase
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsPhaseRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public IEnumerable<ArmsPhase> GetAllArmsPhaseAsync(Guid projectId)
        {
            return _context.ArmsPhases.AsNoTracking().Where(e => e.ProjId == projectId);
        }

        public ArmsPhase GetArmsArmsPhaseIdAsync(Guid armsPhaseId)
        {
            var result = _context.ArmsPhases.FirstOrDefault(a => a.PhaseId == armsPhaseId);
            if (result != null)
            {
                _context.Attach(result);
                _context.Entry(result).State = EntityState.Detached;
            }
            return result;
        }

        public async Task<ArmsPhase> AddArmsArmsPhaseAsync(ArmsPhase armsPhase)
        {
            await _context.ArmsPhases.AddAsync(armsPhase);
            _context.Attach(armsPhase);
            _context.Entry(armsPhase).State = EntityState.Added;
            return armsPhase;
        }

        public async Task<ArmsPhase> AddArmsPhase(ArmsPhase armsPhase)
        {
            await _context.ArmsPhases.AddAsync(armsPhase);
            _context.Attach(armsPhase);
            _context.Entry(armsPhase).State = EntityState.Added;
            _context.SaveChanges();
            return armsPhase;
        }
        public ArmsPhase UpdateArmsArmsPhaseType(ArmsPhase armsPhase)
        {
            _context.ArmsPhases.Update(armsPhase);
            _context.Attach(armsPhase);
            _context.Entry(armsPhase).State = EntityState.Modified;
            return armsPhase;
        }

        public ArmsPhase UpdateArmsPhase(ArmsPhase armsPhase)
        {         
            _context.ArmsPhases.Update(armsPhase);
            _context.Attach(armsPhase);
            _context.Entry(armsPhase).State = EntityState.Modified;
            _context.SaveChanges();
            return armsPhase;
        }

        public List<ArmsPhase> UpdateArmsPhases(List<ArmsPhase> armsPhases)
        {
            _context.ArmsPhases.UpdateRange(armsPhases);
            _context.SaveChanges();
            return armsPhases;
        }
        public void DeleteArmsPhaseByProjectId(Guid projId)
        {
            var result = _context.ArmsPhases.Where(e => e.ProjId == projId);
            foreach (var item in result)
            {
                _context.ArmsPhases.RemoveRange(item);
                _context.Attach(item);
                _context.Entry(item).State = EntityState.Deleted;
            }
        }
    }
}

