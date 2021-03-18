using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsControllingBoardRepository
    {
        Task<List<ControllingBoard>> GetAllArmsCBAsync();
        Task<IEnumerable<ControllingBoard>> GetAllArmsCBAsyncByProjectId(Guid ProjectId);

        Task<ControllingBoard> GetArmsCBIdAsync(Guid Id);

        Task<ControllingBoard> AddArmsCBAsync(ControllingBoard armsControlling);

        ControllingBoard UpdateArmsCB(ControllingBoard armsControlling);

        void CommitChanges();

        Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
    }
}
