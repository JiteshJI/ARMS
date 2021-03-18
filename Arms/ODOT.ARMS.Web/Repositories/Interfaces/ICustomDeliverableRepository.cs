using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface ICustomDeliverableRepository
    {
        Task<List<ArmsDeliverables>> GetCustomDeliverablesByPrjAltId(Guid prjId);
        Task<List<DTOs.ProjDeliverables>> GetDeliverablesByProjIdAsync(Guid prjId);
        void AddCustomDeliverable(IEnumerable<ProjDeliverables> projectDeliverables, Guid projId);
        void AddProjectDeliverable(IEnumerable<ProjDeliverables> projectDeliverables);
        void UpdateCustomDeliverable(ICollection<ProjDeliverables> projectDeliverables, Guid ProjId, int projectAltId);
        void UpdateArmsProjectDeliverable(IEnumerable<ProjDeliverables> projectDeliverables);
        void UpdateArmsDeliverable(IEnumerable<ProjDeliverables> projectDeliverables);

        void DeleteArmsProjectDeliverable(IEnumerable<ArmsProjectDeliverables> projectDeliverables);

        void DeleteArmsDeliverable(IEnumerable<ArmsDeliverables> projectDeliverables);

        Task<List<ArmsProjectDeliverables>> GetAllProjectDeliverablesAsync();
        List<ProjDeliverables> GetAllDeliverablesbyProjectAsync(Guid prjId);
        Task<List<ProjDeliverables>> GetStandardDeliverables();


    }

}
