using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{

    public class ContactsRepository : GenericRepository<ArmsContacts>, IContactsRepository
    {
        private ARMSContext CurrentContext
        {
            get
            {
                return base._context as ARMSContext;
            }
        }
        private IMemoryCache _cache;
        private readonly IMapper _mapper;

        public ContactsRepository(ARMSContext context, IMapper mapper, IMemoryCache memoryCache) : base(context)
        {
            _mapper = mapper;
            _cache = memoryCache;
        }

        public async Task<List<ArmsContacts>> GetAllContactsAsync()
        {
            return await _cache.GetOrCreateAsync("Contacts", entry => {
                return CurrentContext.ArmsContacts.ToListAsync();  /* brings back all the contacts in a list array */
            });
        }

        public async Task<ArmsContacts> GetContactsIdAsync(Guid ContactID)
        {
            var Contacts = await GetAllContactsAsync();
            return Contacts.FirstOrDefault(a => a.ContactID == ContactID);
        }

        public async Task<ArmsContacts> AddContactAsync(ArmsContacts armsContact)
        {
            await CurrentContext.ArmsContacts.AddAsync(armsContact);
            await CurrentContext.SaveChangesAsync();
            _cache.Remove("Contacts");
            return armsContact;

        }
        public ArmsContacts UpdateContact(ArmsContacts armsContacts)
        {
            CurrentContext.ArmsContacts.Update(armsContacts);
            CurrentContext.SaveChanges();
            _cache.Remove("Contacts");
            return armsContacts;
        }
    }
}
