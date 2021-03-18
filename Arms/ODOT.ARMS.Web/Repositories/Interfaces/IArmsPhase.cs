using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsPhase
    {
        IEnumerable<ArmsPhase> GetAllArmsPhaseAsync(Guid projectId);

        ArmsPhase GetArmsArmsPhaseIdAsync(Guid armsPhaseId);

        Task<ArmsPhase> AddArmsArmsPhaseAsync(ArmsPhase armsPhase);
        Task<ArmsPhase> AddArmsPhase(ArmsPhase armsPhase);

        ArmsPhase UpdateArmsArmsPhaseType(ArmsPhase armsPhase);

        ArmsPhase UpdateArmsPhase(ArmsPhase armsPhase);
        List<ArmsPhase> UpdateArmsPhases(List<ArmsPhase> armsPhases);

        void DeleteArmsPhaseByProjectId(Guid projId);
    }
}
