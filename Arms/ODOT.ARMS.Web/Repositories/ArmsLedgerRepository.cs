using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsLedgerRepository : GenericRepository<LedgerForDD>, IArmsLedgerRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;

        public ArmsLedgerRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
        }
        public async Task<IEnumerable<LedgerForDD>> GetAllArmLedgerAsyncByProjectId(Guid ProjectId)
        {
            var projId = new SqlParameter("projId", ProjectId);
            return await _context.ArmsLedger.FromSqlRaw(@" SELECT *, ROW_NUMBER() OVER(ORDER BY phase) RowNum
                    FROM (
                SELECT p.phase_title as Phase, adc.Administration_Category_Text as Category, b.BUDGET_TITLE as Title, 'BUDGET' as TransactionType ,
                b.ODOT_FUNDING as Amount, b.USER_ID as [User], b.ENTRY_DT as Date
                from ARMS_BUDGET b inner join ARMS_PHASE p on b.PHASE_ID = p.PHASE_ID inner join ARMS_BUDGET_CATEGORY ac on ac.BC_ALT_ID = b.BC_ALT_ID
                inner join ARMS_ADMINISTRATION_CATEGORY adc on adc.Administration_Category_ID = ac.BUDGET_CAT_ID
                where
                ac.PROJ_ID = @projId union
                select 'NA' as Phase, acat.Administration_Category_Text as Category, 'NA' as Title, 'FUNDING' as TransactionType, f.AMT as Amount,
                f.USER_ID as [User], f.ENTRY_DT as Date
                from ARMS_EMBUMBRANCE f inner join ARMS_ADMINISTRATION_CATEGORY acat on acat.Administration_Category_ID = f.FUNDING_TYPE_CD
                where
                f.PROJ_ID = @projId  ) a", projId).ToListAsync();
        }
    }
}