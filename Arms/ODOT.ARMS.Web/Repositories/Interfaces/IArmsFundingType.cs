using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsFundingType
    {
        Task<List<ArmsFundingType>> GetAllArmsFundingTypeAsync();

        Task<ArmsFundingType> GetArmsArmsFundingTypeIdAsync(int armsFundingTypeId);

        Task<ArmsFundingType> AddArmsArmsFundingTypeAsync(ArmsFundingType armsFundingType);

        ArmsFundingType UpdateArmsArmsFundingType(ArmsFundingType armsFundingType);
    }
}
