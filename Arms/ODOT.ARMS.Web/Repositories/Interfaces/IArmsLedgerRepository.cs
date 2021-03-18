using ODOT.ARMS.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsLedgerRepository
    {
        Task<IEnumerable<LedgerForDD>> GetAllArmLedgerAsyncByProjectId(Guid ProjectId);
    }
}