using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IContactsRepository : IGenericRepository<ArmsContacts>
    {
        Task<List<ArmsContacts>> GetAllContactsAsync();

        Task<ArmsContacts> GetContactsIdAsync(Guid ContactID);

        Task<ArmsContacts> AddContactAsync(ArmsContacts armsContacts);

        ArmsContacts UpdateContact(ArmsContacts armsContacts);
    }
}
