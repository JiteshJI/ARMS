using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IARMSDataRepository
    {
        //Task<List<ArmsAgencyCategory>> GetAllAgencyCategoriesAsync();

        //Task<ArmsAgencyCategory> GetAgencyCategoryIdAsync(int AgencyCatId);
        Task<List<DTOs.GenericLookupListForDD>> GetListByIdAsync(int specListId);

        Task<List<ArmsAgency>> GetAllAgencyAsync();
        Task<List<ArmsVendorAddress>> GetAllArmsVendorAsync(string vendorId);

        Task<ArmsAgency> GetAgencyByIdAsync(int AgencyId);
        ArmsAgency GetAgencyById(int AgencyId);

        int? AddAgencyAsync(ArmsAgency armsAgency);

        Task<ArmsAgency> UpdateAgency(ArmsAgency armsAgency);

        void DeleteAgency(ArmsAgency armsAgency);

       

        Task<List<ArmsAdministrationCategory>> GetAllAdministrationCategoriesAsync();

        Task<List<ArmsAdministrationCategory>> GetAdministrationCategoryTypeBySpecificListAsync(int specificListId);

        Task<ArmsAdministrationCategory> GetAdministrationCategoryTypeIdAsync(int? administrationCategoryId);

        //Task<List<ArmsFundingSource>> GetAllFundingSourcesAsync();

        //Task<ArmsFundingSource> GetFundingSourceIdAsync(int FundingSrcId);

        //Task<List<ArmsFundingType>> GetAllFundingTypesAsync();

        //Task<ArmsFundingType> GetFundingTypeIdAsync(int FundingTypeId);

        Task<List<ArmsSpecificList>> GetAllFundingSpecificListAsync();

        Task<List<DTOs.GenericLookupListForDD>> GetContactRoles();

        Task<List<DTOs.GenericLookupListForDD>> GetCBTypes();

        Task<List<DTOs.GenericLookupListForDD>> GetAgencyCategory();//DTOs.GenericLookupListForDD

        Task<List<DTOs.GenericLookupListForDD>> GetCBStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetDeliveryType();

        Task<List<DTOs.GenericLookupListForDD>> GetDeliveryStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetFundingSource();

        Task<List<DTOs.GenericLookupListForDD>> GetFundingType();

        Task<List<DTOs.GenericLookupListForDD>> GetBudgetCategory();

        Task<List<DTOs.GenericLookupListForDD>> GetFundingStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetImplementationStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetProjectTypes();

        Task<List<DTOs.GenericLookupListForDD>> GetMeetingTypes();

        Task<List<DTOs.GenericLookupListForDD>> GetModificationStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetProjectClassifications();

        Task<List<DTOs.GenericLookupListForDD>> GetProjectStatuses();

        Task<List<DTOs.GenericLookupListForDD>> GetPooledFundingStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetPrimaryEvents();

        Task<List<DTOs.GenericLookupListForDD>> GetSecondaryEvents();

        Task<List<DTOs.GenericLookupListForDD>> GetPhaseStatus();

        Task<List<DTOs.GenericLookupListForDD>> GetCBCategory();

        Task<List<DTOs.GenericLookupListForDDGuid>> GetContactNames();

        Task<ArmsSpecificList> GetFundingSpecificListIdAsync(int FundingSpecificListeId);

        Task<List<ArmsBudgetCategory>> GetAllBudgetCategoriesAsync();

        Task<ArmsBudgetCategory> GetBudgetCategoryIdAsync(int BudgetCategoryId);

        Task<List<ArmsDeliverableType>> GetAllDeliverableTypesAsync();

        Task<ArmsDeliverableType> GetDeliverableTypeIdAsync(int DeliverableTypeId);

        Task<List<ArmsDeliverableStatus>> GetAllDeliverableStatusAsync();

        Task<ArmsDeliverableStatus> GetDeliverableStatusIdAsync(int DeliverableStatusId);

        Task<List<ArmsContacts>> GetAllContactsAsync();

        Task<ArmsContacts> GetContactsIdAsync(Guid ContactID);

        Task<ArmsContacts> AddContactAsync(ArmsContacts armsContacts);

        

     //void AddContactAsync(ArmsContacts armsContacts);
        string getAgencyName(int AgencyCatId);


    }
}