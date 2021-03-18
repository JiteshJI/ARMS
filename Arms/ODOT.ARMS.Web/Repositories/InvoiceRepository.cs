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
    public class InvoiceRepository : GenericRepository<Invoice>, IInvoiceRepository
    {
        private IMemoryCache _cache;
        private readonly IMapper _mapper;
        private new readonly ARMSContext _context;
        //private new readonly ArmsWarehouseContext _wh_context;
        private readonly ArmsWarehouseContext _wh_context;

        public InvoiceRepository(ARMSContext context, ArmsWarehouseContext whContext,  IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
            _context = context;
            _wh_context = whContext;
        }

        public async Task<List<Invoice>> GetAllInvoicesAsync() {
            return await _cache.GetOrCreateAsync("Invoice", entry =>
            {
                return _context.ArmsInvoices.ToListAsync();
            });
        }

        public async Task<List<InvoiceDetail>> GetAllInvoiceDetailsAsync() {
            return await _cache.GetOrCreateAsync("InvoiceDetail", entry =>
            {
                return _context.ArmsInvoiceDetails.ToListAsync();
            });
        }
        public async Task<IEnumerable<Invoice>> GetAllInvoicesByProjectIdAsync(Guid ProjId) {
            var result = await GetAllInvoicesAsync();
            return result.Where(a => a.ProjId == ProjId);
        }
        public async Task<IEnumerable<InvoiceDetail>> GetInvoiceDetailsByInvoiceIdAsync(Guid InvoiceId) {
            var result = await GetAllInvoiceDetailsAsync();
            return result.Where(a => a.InvoiceId == InvoiceId);
        }

        public async Task<Invoice> GetInvoiceByIdAsync(Guid InvoiceId)
        {
            var result = await GetAllInvoicesAsync();
            return result.FirstOrDefault(a => a.InvoiceId == InvoiceId);
        }

        public async Task<Invoice> AddInvoiceAsync(Invoice invoice) {
            await _context.ArmsInvoices.AddAsync(invoice);
            await _context.SaveChangesAsync();
            _cache.Remove("Invoice");
            return invoice;
        }

        public Invoice AddInvoice(Invoice invoice)
        {
            _context.ArmsInvoices.Add(invoice);
            _context.SaveChanges();
            _cache.Remove("Invoice");
            return invoice;
        }

        public Invoice UpdateInvoice(Invoice invoice) {
            _context.ArmsInvoices.Update(invoice);
            _context.Attach(invoice);
            _context.Entry(invoice).State = EntityState.Modified;
            _context.SaveChanges();
            //_cache.Remove("Invoice");
            return invoice;
        }

        /*
            _currentContext.ArmsProject.Update(armsProject);
            _currentContext.Attach(armsProject);
            _currentContext.Entry(armsProject).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _currentContext.SaveChanges();
            return armsProject;
         */

        public async Task<Invoice> UpdateInvoiceAsync(Invoice invoice)
        {
            _context.ArmsInvoices.Update(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public void AddInvoiceDetail(InvoiceDetail invD) {
            
            _context.ArmsInvoiceDetails.Add(invD);
            //_context.Attach(invD);
            _context.Entry(invD).State = EntityState.Added;
            _cache.Remove("InvoiceDetail");
            _context.SaveChanges();
            
        }

        public void UpdateInvoiceDetail(InvoiceDetail invD) {
            _context.ArmsInvoiceDetails.Update(invD);
            _context.Attach(invD);
            _context.Entry(invD).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _cache.Remove("InvoiceDetail");
            _context.SaveChanges();
        }
        public void DeleteInvoiceDetail(InvoiceDetail invD) {
            var result = _context.ArmsInvoiceDetails.Where(x => x.invoiceDetailId == invD.invoiceDetailId);
            foreach (var invDtl in result)
                _context.ArmsInvoiceDetails.Remove(invDtl);
            _cache.Remove("InvoiceDetail");
            _context.SaveChanges();
        }

        /// </summary>
        ///   
        /// <param name="projectId"></param>
        /// <returns>
        /// It returns a list of scr and file counts
        /// </returns>
        public async Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId)
        {
            var projId = new SqlParameter("projId", projectId);
            return await _context.ArmsSrcCBFileCount.FromSqlRaw(@"
                SELECT 
                    INV.INVOICE_ID AS Src, 
                    COUNT(1) AS FileCount
                FROM 
	                ARMS_INVOICE INV
	                INNER JOIN ARMS_EVENT_UPLOAD U ON U.EVENT_SRC = INV.INVOICE_ID
                WHERE
                  	INV.PROJ_ID = @projId
                GROUP BY INV.INVOICE_ID", projId).ToListAsync();
        }

        /// <summary>
        /// Used by the Invoice details grid in the drop down
        /// 
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<List<BudgetCatDD>> GetBudgetCategoriesAsync(Guid projectId)
        {
            //I.FUNDING_STATUS_CD = 131 is funding approved
            var projId = new SqlParameter("projId", projectId);
            return await _context.ArmsBudgetCatDD.FromSqlRaw(@"SELECT
                AB.PHASE_ID AS PhaseId,
                ABC.BC_ALT_ID AS BudgetCatId,
                CASE
                    WHEN ABC.BUDGET_CAT_ID = 46 THEN AB.BUDGET_ALT_ID
                    ELSE NULL
                END AS BudgetId,
                CASE
                    WHEN ABC.BUDGET_CAT_ID = 46 THEN AC.Administration_Category_Text + ' - ' + AB.BUDGET_TITLE
                    ELSE AC.Administration_Category_Text
                END AS LookupTitle,
                CASE
                    WHEN ABC.BUDGET_CAT_ID = 46 THEN CONVERT(varchar(10), ABC.BC_ALT_ID) + '-' + CONVERT(varchar(10), AB.BUDGET_ALT_ID)
                    ELSE CONVERT(varchar(10), ABC.BC_ALT_ID)
                END AS LookupKey,
				INV.INV_AMT,
                (AB.ODOT_FUNDING + AB.ORG_COST_SHARING) * ISNULL(AB.QTY, 1) - ISNULL(INV.INV_AMT, 0) AS BudgetAmt
            FROM
                ARMS_BUDGET AB
                INNER JOIN ARMS_BUDGET_CATEGORY ABC ON ABC.BC_ALT_ID = AB.BC_ALT_ID
                INNER JOIN ARMS_ADMINISTRATION_CATEGORY AC ON AC.Administration_Category_ID = ABC.BUDGET_CAT_ID
				LEFT OUTER JOIN (
					SELECT 
						AI.PHASE_ID,
						CASE
							WHEN MAX(BC.BUDGET_CAT_ID) = 46 THEN CONVERT(varchar(10), AID.BC_ALT_ID) + '-' + CONVERT(varchar(10), AID.BUDGET_ALT_ID)
							ELSE CONVERT(varchar(10), AID.BC_ALT_ID)
						END AS LookupKey,
						SUM(AID.INV_AMT) AS INV_AMT

					FROM 
						ARMS_INVOICE AI
						INNER JOIN ARMS_INVOICE_DETAIL AID ON AID.INVOICE_ID = AI.INVOICE_ID
						INNER JOIN ARMS_BUDGET_CATEGORY BC ON BC.PROJ_ID = AI.PROJ_ID AND BC.BC_ALT_ID = AID.BC_ALT_ID 
					WHERE
						AI.PROJ_ID = @projId
					GROUP BY AI.PHASE_ID, AID.BC_ALT_ID, AID.BUDGET_ALT_ID,
						CASE
							WHEN BC.BUDGET_CAT_ID = 46 THEN AID.BC_ALT_ID
							ELSE NULL
						END
				) INV ON INV.PHASE_ID = AB.PHASE_ID AND INV.LookupKey =
					CASE
						WHEN ABC.BUDGET_CAT_ID = 46 THEN CONVERT(varchar(10), ABC.BC_ALT_ID) + '-' + CONVERT(varchar(10), AB.BUDGET_ALT_ID)
						ELSE CONVERT(varchar(10), ABC.BC_ALT_ID)
					END
            WHERE
                ABC.PROJ_ID = @projId AND
                AB.ACTIVE_IND = 'A' AND
                AC.ACTIVE_IND = 'A'", projId).ToListAsync();
        }

        public ProjectBalance GetProjectBalance(Guid projectId)
        {
            var projId = new SqlParameter("projId", projectId);
            return _context.ArmsProjectBalance.FromSqlRaw(@"SELECT 
                P.PROJ_ID AS ProjId,
                DATEDIFF(DAY, getDate(), P.CURRENT_END_DT) AS DaysToCompletion,
                ISNULL(BC.CONTRACT_AMT, 0) - ISNULL(INV.INVOICE_AMT, 0) - ISNULL(P.WITHHOLDING_AMOUNT, 0) AS WithholdingAmtReached, 
                ISNULL(E.ENCUMBERED_AMT, 0) - ISNULL(INV.INVOICE_AMT, 0) AS EncumbranceAmtReached,
                ISNULL(BC.CONTRACT_AMT, 0) - ISNULL(INV.INVOICE_AMT, 0) AS BudgetAmtReached 
            FROM
                ARMS_PROJECT P
                LEFT OUTER JOIN(
                    SELECT
                         I.PROJ_ID,
                         SUM(INVD.INV_AMT) AS INVOICE_AMT
                    FROM
                         ARMS_INVOICE I
                         INNER JOIN ARMS_INVOICE_DETAIL INVD ON INVD.INVOICE_ID = I.INVOICE_ID
                    WHERE
                         I.FUNDING_STATUS_CD = 131 AND
                         I.PROJ_ID = @projId
                    GROUP BY I.PROJ_ID
               ) AS INV ON INV.PROJ_ID = P.PROJ_ID
               LEFT OUTER JOIN(
                    SELECT
                         BC.PROJ_ID,
                         SUM((ISNULL(B.ODOT_FUNDING, 0) + ISNULL(B.ORG_COST_SHARING, 0)) * ISNULL(B.QTY, 1)) AS CONTRACT_AMT
                    FROM
                         ARMS_BUDGET_CATEGORY BC
                         INNER JOIN ARMS_BUDGET B ON BC.BC_ALT_ID = B.BC_ALT_ID
                    WHERE
                         B.ACTIVE_IND = 'A' AND
                         BC.PROJ_ID = @projId
                    GROUP BY BC.PROJ_ID
            ) AS BC ON BC.PROJ_ID = P.PROJ_ID
              LEFT OUTER JOIN(
                    SELECT
                        E.PROJ_ID,
                        SUM(ISNULL(E.AMT, 0)) AS ENCUMBERED_AMT
                    FROM
                        ARMS_EMBUMBRANCE E
                    WHERE
                        E.PROJ_ID = @projId
                    GROUP BY E.PROJ_ID
              ) AS E ON E.PROJ_ID = P.PROJ_ID
            WHERE
                P.PROJ_ID = @projId", projId).First();
        }
    }

 }
