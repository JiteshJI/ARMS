using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ODOT.ARMS.Web.Entities;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsContributionRepository
    {
        Task<List<ArmsContribution>> GetAllArmsContribAsync();
        Task<IEnumerable<ArmsContribution>> GetAllArmsContribAsyncByProjectId(Guid ProjectId);

        Task<ArmsContribution> GetArmsContribIdAsync(Guid Id);

        Task<ArmsContribution> AddArmsContribAsync(ArmsContribution armsContribution);

        ArmsContribution UpdateArmsContrib(ArmsContribution armsContribution);

        void CommitChanges();

        Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
    }
}
