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

    public class ARMSDataRepository : IARMSDataRepository
    {
        public enum RefData : int
        {
            AgencyCategory = 1,
            ContactRoles = 2,
            CBType = 3,
            CBStatus = 4,
            DeliverableType = 5,
            DeliverableStatus = 6,
            FundingSrc = 7,
            FundingType = 8,
            BudgetCategory = 9,
            FundingStatus = 10,
            ImplementationStatus = 11,
            MeetingTypes = 12,
            ModificationStatus = 13,
            PrjClassification = 14,
            PrjType = 15,
            PrjStatus = 16,
            PooledFundingStatus = 17,
            PrimaryEvents = 18,
            SecondaryEvents = 19,
            CBCategory = 21,
            PhaseStatus = 22

        }

        private ARMSContext CurrentContext { get; set; }
        private IMemoryCache _cache;

        public ARMSDataRepository(ARMSContext context, IMemoryCache memoryCache)
        {
            this.CurrentContext = context;
            _cache = memoryCache;
        }


        public ArmsAgency GetAgencyById(int AgencyCatId)
        {
            return CurrentContext.ArmsAgency.Where(e => e.AgencyId == AgencyCatId).FirstOrDefault();
        }

        public async Task<List<ArmsAgency>> GetAllAgencyAsync()
        {

            return await CurrentContext.ArmsAgency.ToListAsync();

        }

        public async Task<ArmsAgency> GetAgencyByIdAsync(int AgencyId)
        {
            var agency = await GetAllAgencyAsync();
            return agency.FirstOrDefault(a => a.AgencyId == AgencyId);
        }

        public int? AddAgencyAsync(ArmsAgency armsAgency)
        {
            CurrentContext.ArmsAgency.AddAsync(armsAgency);
            CurrentContext.SaveChanges();
            return armsAgency.AgencyId;

        }

        public async Task<ArmsAgency> UpdateAgency(ArmsAgency armsAgency)
        {
            CurrentContext.ArmsAgency.Update(armsAgency);
            await CurrentContext.SaveChangesAsync();
            return armsAgency;
        }

        public async Task<List<ArmsAdministrationCategory>> GetAllAdministrationCategoriesAsync()
        {
            //return await _cache.GetOrCreateAsync("ArmsAdministrationCategories", entry =>
            //{
            return await CurrentContext.ArmsAdministrationCategory.ToListAsync();
            //});
        }

        public void DeleteAgency(ArmsAgency armsAgency)
        {
            CurrentContext.ArmsAgency.Remove(armsAgency);
            CurrentContext.SaveChangesAsync();
        }

        public async Task<List<ArmsAdministrationCategory>> GetAdministrationCategoryTypeBySpecificListAsync(int specificListId)
        {
            return await _cache.GetOrCreateAsync("ArmsAdministrationCategorySpecificList", entry =>
            {
                return CurrentContext.ArmsAdministrationCategory.Where(a => a.SpecificListID == specificListId).ToListAsync();
            });
        }

        public async Task<ArmsAdministrationCategory> GetAdministrationCategoryTypeIdAsync(int? administrationCategoryId)
        {
            var administrationCategory = await GetAllAdministrationCategoriesAsync();
            return administrationCategory.FirstOrDefault(a => a.AdministrationCategoryID == administrationCategoryId);
        }

        //===============================================================================================================================================================================
        // This block of code should replace 80% of the code in this module
        //
        // Author: Philip Reicher
        //
        //===============================================================================================================================================================================
        public async Task<List<DTOs.GenericLookupListForDD>> GetListByIdAsync(int specListId)
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == specListId && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetAgencyCategory()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.AgencyCategory && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetContactRoles()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.ContactRoles && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }


        public async Task<List<DTOs.GenericLookupListForDDGuid>> GetContactNames()
        {
            return await (from s in CurrentContext.ArmsContacts
                          select new DTOs.GenericLookupListForDDGuid
                          {
                              Value = s.ContactID,
                              Text = s.FirstName + " " + s.LastName
                          }).ToListAsync();
        }



        public async Task<List<DTOs.GenericLookupListForDD>> GetCBTypes()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.CBType && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetCBStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.CBStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();

        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetDeliveryType()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.DeliverableType && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetDeliveryStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.DeliverableStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetFundingSource()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.FundingSrc && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetFundingType()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.FundingType && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetBudgetCategory()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.BudgetCategory && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetFundingStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.FundingStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetImplementationStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.ImplementationStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetMeetingTypes()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.MeetingTypes && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetModificationStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.ModificationStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetProjectClassifications()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PrjClassification && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetProjectTypes()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PrjType && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetProjectStatuses()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PrjStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetPooledFundingStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PooledFundingStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetPrimaryEvents()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PrimaryEvents && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }

        public async Task<List<DTOs.GenericLookupListForDD>> GetSecondaryEvents()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.SecondaryEvents && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText,
                              PrimaryTypeId = s.PrimaryTypeId
                          }).ToListAsync();
        }
        public async Task<List<DTOs.GenericLookupListForDD>> GetPhaseStatus()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.PhaseStatus && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }
        public async Task<List<DTOs.GenericLookupListForDD>> GetCBCategory()
        {
            return await (from s in CurrentContext.ArmsAdministrationCategory
                          where s.SpecificListID == (int)RefData.CBCategory && s.ACTIVEIND == "A"
                          select new DTOs.GenericLookupListForDD
                          {
                              Value = s.AdministrationCategoryID,
                              Text = s.AdministrationCategoryText
                          }).ToListAsync();
        }
        //public async Task<List<ArmsFundingSource>> GetAllFundingSourcesAsync()
        //{
        //     return await _cache.GetOrCreateAsync("FundingSources", entry =>
        //     {
        ///        return CurrentContext.ArmsFundingSource.ToListAsync();
        //    });
        //}

        //public async Task<ArmsFundingSource> GetFundingSourceIdAsync(int FundingSrcId)
        //{
        //    var fundingSource = await GetAllFundingSourcesAsync();
        //    return fundingSource.FirstOrDefault(a => a.FundingSrcId == FundingSrcId);
        //}

        //public async Task<List<ArmsFundingType>> GetAllFundingTypesAsync()
        //{
        //    return await _cache.GetOrCreateAsync("FundingTypes", entry =>
        //    {
        //        return CurrentContext.ArmsFundingType.ToListAsync();
        //    });
        //}
        //public async Task<ArmsFundingType> GetFundingTypeIdAsync(int FundingTypeId)
        //{
        //    var fundingType = await GetAllFundingTypesAsync();
        //    return fundingType.FirstOrDefault(a => a.FundingTypeId == FundingTypeId);
        //}

        public async Task<List<ArmsSpecificList>> GetAllFundingSpecificListAsync()
        {
            return await _cache.GetOrCreateAsync("SpecificList", entry =>
            {
                return CurrentContext.ArmsSpecificList.ToListAsync();
            });
        }

        public async Task<ArmsSpecificList> GetFundingSpecificListIdAsync(int fundingSpecificListId)
        {
            var fundingSpecificList = await GetAllFundingSpecificListAsync();
            return fundingSpecificList.FirstOrDefault(a => a.SpecificListID == fundingSpecificListId);
        }

        public async Task<List<ArmsBudgetCategory>> GetAllBudgetCategoriesAsync()
        {
            return await _cache.GetOrCreateAsync("BudgetCategories", entry =>
            {
                return CurrentContext.ArmsBudgetCategory.ToListAsync();
            });
        }

        public async Task<ArmsBudgetCategory> GetBudgetCategoryIdAsync(int BudgetCategoryId)
        {
            var budgetCategory = await GetAllBudgetCategoriesAsync();
            return budgetCategory.FirstOrDefault(a => a.BudgetCatId == BudgetCategoryId);
        }

        public async Task<List<ArmsDeliverableType>> GetAllDeliverableTypesAsync()
        {
            return await _cache.GetOrCreateAsync("DeliverableTypes", entry =>
            {
                return CurrentContext.ArmsDeliverableType.ToListAsync();
            });
        }

        public async Task<ArmsDeliverableType> GetDeliverableTypeIdAsync(int DeliverableTypeId)
        {
            var deliverableType = await GetAllDeliverableTypesAsync();
            return deliverableType.FirstOrDefault(a => a.DeliverableTypeId == DeliverableTypeId);
        }

        public async Task<List<ArmsDeliverableStatus>> GetAllDeliverableStatusAsync()
        {
            return await _cache.GetOrCreateAsync("DeliverableStatuses", entry =>
            {
                return CurrentContext.ArmsDeliverableStatus.ToListAsync();
            });
        }

        public async Task<ArmsDeliverableStatus> GetDeliverableStatusIdAsync(int DeliverableStatusId)
        {
            var deliverableStatus = await GetAllDeliverableStatusAsync();
            return deliverableStatus.FirstOrDefault(a => a.DeliverableStatusId == DeliverableStatusId);
        }

        public async Task<List<ArmsContacts>> GetAllContactsAsync()
        {
            return await _cache.GetOrCreateAsync("Contacts", entry =>
            {
                return CurrentContext.ArmsContacts.ToListAsync();
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

        public string getAgencyName(int AgencyCatId)
        {
            /* using Linq query to get the Agency Name for each Agency Id */
            var categorytxt = CurrentContext.ArmsAdministrationCategory.Where(a => a.AdministrationCategoryID == AgencyCatId)
                                                         .Select(a => a.AdministrationCategoryText)
                                                         .FirstOrDefault();
            return categorytxt;
        }

        public async Task<List<ArmsVendorAddress>> GetAllArmsVendorAsync(string vendorId)
        {
            //return await _cache.GetOrCreateAsync("VendorAddress", entry =>
            //{
            return await CurrentContext.ArmsVendorAddress.Where(e => e.oaksVendorNo == vendorId).ToListAsync();
            //});


        }
    }
}