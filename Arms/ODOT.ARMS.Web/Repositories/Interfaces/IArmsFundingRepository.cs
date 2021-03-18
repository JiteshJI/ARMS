using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsFundingRepository
    {
        Task<List<Funding>> GetAllArmsFundingAsync();
        Task<IEnumerable<Funding>> GetAllArmFundingAsyncByProjectId(Guid ProjectId);
        Task<Funding> GetArmsFundingIdAsync(Guid Id);
        Task<Funding> AddArmsFundingAsync(Funding funding);
        Funding UpdateArmsFunding(Funding funding);
        void CommitChanges();
        Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
    }
}
