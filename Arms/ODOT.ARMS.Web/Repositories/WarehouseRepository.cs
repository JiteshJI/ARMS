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
    public class WarehouseRepository : IWarehouseRepository
    {
        private ArmsWarehouseContext _wh_context;

        public WarehouseRepository(ArmsWarehouseContext context)
        {
            this._wh_context = context;
        }
        public async Task<List<Encumbrance>> GetEncumbranceByPid(string pid)
        {
            var projId = new SqlParameter("projId", pid);
            return await _wh_context.ArmsEncumbrance.FromSqlRaw(@"SELECT
                E.FISCAL_YEAR AS FiscalYear,
                E.ENCUMBRANCE_NBR AS EncumbranceNbr,
                E.SAC,
                SUM(E.LINE_AMT) AS PoLineAmt,
                SUM(E.LINE_ADJ_AMT) AS PoLineAdj,
                SUM(E.LINE_DISBURSE_AMT) AS PoLineDisb,
                SUM(E.LINE_AMT + E.LINE_ADJ_AMT - E.LINE_DISBURSE_AMT) AS PoLineBalance
            FROM 
                AA_ENCUMB_FILE E
            WHERE
                E.PID = @projId
            GROUP BY E.FISCAL_YEAR, E.ENCUMBRANCE_NBR, E.SAC", projId).ToListAsync();
        }
    }
}
