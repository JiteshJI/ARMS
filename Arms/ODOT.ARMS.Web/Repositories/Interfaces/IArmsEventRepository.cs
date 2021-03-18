using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsEventRepository
    {
        Task<List<Event>> GetAllArmsEventAsync();
        Task<IEnumerable<Event>> GetAllArmsEventAsyncByProjectId(Guid ProjectId);
        Task<Event> GetArmsEventIdAsync(Guid Id);
        Task<Event> AddArmsEventAsync(Event armsEvent);
        Event UpdateArmsEventType(Event armsEvent);
        void CommitChanges();

        Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
    }
}
