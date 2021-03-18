using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ODOT.ARMS.Web.Entities;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsContributionRepository
    {
        Task<List<ArmsContribution>> GetAllArmsContributionAsync();
        Task<IEnumerable<ArmsContribution>> GetAllArmsContributionAsyncByProjectId(Guid ProjectId);

        Task<ArmsContribution> GetArmsContributionIdAsync(Guid Id);

        Task<ArmsContribution> AddArmsContributionAsync(ArmsContribution armsContribution);

        ArmsContribution UpdateArmsContribution(ArmsContribution armsContribution);

        void CommitChanges();

        Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
    }
}
