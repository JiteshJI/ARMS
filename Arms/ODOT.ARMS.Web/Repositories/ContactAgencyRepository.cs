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
    public class ContactAgencyRepository : IContactAgencyRepository
    {
        private ARMSContext CurrentContext { get; set; }
        private IMemoryCache _cache;

        public ContactAgencyRepository(ARMSContext context, IMemoryCache memoryCache)
        {
            this.CurrentContext = context;
            _cache = memoryCache;
        }

        public async Task<List<ArmsContactAgency>> GetAllContactAgencyAsync()
        {
            return await _cache.GetOrCreateAsync("ContactAgency", entry =>
            {
                return CurrentContext.ArmsContactAgency.ToListAsync();  /* brings back all agency information for contacts */
            });
        }

        public async Task<List<ArmsContactAgency>> GetContactAgencyByContactAsync(Guid ContactId)
        {
            var ContactAgencies = await GetAllContactAgencyAsync();
            return ContactAgencies.FindAll(a => a.ContactId == ContactId);
        }

        public async Task<ArmsContactAgency> GetContactAgencyIdByIdAsync(int ContactAgencyId)
        {
            var ContactAgencies = await GetAllContactAgencyAsync();
            return ContactAgencies.FirstOrDefault(a => a.ContactAgencyId == ContactAgencyId);
        }
        public ArmsContactAgency UpdateContactAgency(ArmsContactAgency armsContactAgency)
        {
            CurrentContext.ArmsContactAgency.Update(armsContactAgency);
            CurrentContext.SaveChanges();
            _cache.Remove("ContactAgency");
            return armsContactAgency;
        }

        public string getAgencyName(int AgencyId)
        {
            /* using Linq query to get the Agency Name for each Agency Id */
            var contactAgency = CurrentContext.ArmsAgency.Where(a => a.AgencyId == AgencyId)
                                                         .Select(a => a.AgencyNameTxt)
                                                         .FirstOrDefault();
            return contactAgency;                                     
        }
        public async Task<ArmsContactAgency> AddContactAgencyAsync(ArmsContactAgency armsContactAgency)
        {
            await CurrentContext.ArmsContactAgency.AddAsync(armsContactAgency);
            await CurrentContext.SaveChangesAsync();
            _cache.Remove("ContactAgency");
            return armsContactAgency;
        }

    }
}
