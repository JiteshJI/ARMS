using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsPersonnelRepository : IGenericRepository<ArmsPersonnel>
    {
        Task<List<ArmsPersonnel>> GetAllPersonnelAsync();
        Task<ArmsPersonnel> GetPersonnelByIdAsync(Guid Personneld);
        Task<List<ArmsPersonnel>> GetPersonnelByProjIdAsync(Guid ProjId);
        Task<ArmsPersonnel> AddPersonnelAsync(ArmsPersonnel armsPersonnel);
        ArmsPersonnel UpdatePersonnel(ArmsPersonnel armsPersonnel);

    }
}
