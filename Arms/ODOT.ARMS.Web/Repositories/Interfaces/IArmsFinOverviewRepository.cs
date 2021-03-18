using ODOT.ARMS.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsFinOverviewRepository
    {
        Task<IEnumerable<FinOverviewDD>> GetAllArmsOverviewAsyncByProjectId(Guid ProjectId);
    }
}
