using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IContactAgencyRepository
    {
        Task<List<ArmsContactAgency>> GetAllContactAgencyAsync();
        Task<List<ArmsContactAgency>> GetContactAgencyByContactAsync(Guid ContactId);

        Task<ArmsContactAgency> GetContactAgencyIdByIdAsync(int ContactAgencyId);

        Task<ArmsContactAgency> AddContactAgencyAsync(ArmsContactAgency armsContactAgency);

        ArmsContactAgency UpdateContactAgency(ArmsContactAgency armsContactAgency);

        string getAgencyName(int AgencyId);
    }
}
