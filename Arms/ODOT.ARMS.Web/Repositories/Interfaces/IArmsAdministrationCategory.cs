using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsAdministrationCategory : IGenericRepository<ArmsAdministrationCategory>
    {
        Task<List<ArmsAdministrationCategory>> GetAllArmsAdministrationCategoryAsync();

        ArmsAdministrationCategory GetArmsAdministrationCategoryId(int armsAdministrationCategory);

        Task<ArmsAdministrationCategory> AddArmsAdministrationCategoryAsync(ArmsAdministrationCategory armsAdministrationCategory);

        ArmsAdministrationCategory UpdateArmsAdministrationCategory(ArmsAdministrationCategory armsAdministrationCategory);
    }
}
