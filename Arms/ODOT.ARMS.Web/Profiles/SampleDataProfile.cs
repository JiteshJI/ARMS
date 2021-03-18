using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class SampleDataProfile : Profile
    {
        public SampleDataProfile()
        {
            //CreateMap<Entities.ArmsAgencyCategory, DTOs.AgencyCategoryForDD>()
            // .ForMember(d => d.AgencyCatId, o => o.MapFrom(s => s.AgencyCatId));

            CreateMap<DTOs.ArmsAgencyForUpdate, Entities.ArmsAgency>()
             .ForMember(d => d.AgencyId, o => o.MapFrom(s => s.AgencyId));

            //CreateMap<DTOs.ArmsAgencyForUpdate, DTOs.ArmsAgencyForDD> ()
            // � � .ForMember(d => d.AgencyId, o => o.MapFrom(s => s.AgencyId));

            CreateMap<Entities.ArmsAgency, DTOs.ArmsAgencyForDD>()
             .ForMember(d => d.AgencyId, o => o.MapFrom(s => s.AgencyId));

            CreateMap<Entities.ArmsAdministrationCategory, DTOs.ArmsAdministrationCategoryForDD>()
              .ForMember(d => d.AdministrationCategoryID, o => o.MapFrom(s => s.AdministrationCategoryID))
              .ForMember(d => d.SpecificListID, o => o.MapFrom(s => s.SpecificListID));

            CreateMap<DTOs.ArmsAdministrationCategoryForDD, Entities.ArmsAdministrationCategory>()
             .ForMember(d => d.ArmsSpecificList, o => o.Ignore());

            CreateMap<Entities.ArmsFundingSource, DTOs.FundingSourceForDD>()
              .ForMember(d => d.FundingSrcId, o => o.MapFrom(s => s.FundingSrcId));

            CreateMap<Entities.ArmsFundingType, DTOs.FundingTypeForDD>()
              .ForMember(d => d.FundingTypeId, o => o.MapFrom(s => s.FundingTypeId));

            CreateMap<Entities.ArmsSpecificList, DTOs.SpecificListForDD>()
             .ForMember(d => d.SpecificListID, o => o.MapFrom(s => s.SpecificListID));

            CreateMap<Entities.ArmsBudgetCategory, DTOs.BudgetCategoryForDD>()
              .ForMember(d => d.BudgetCatId, o => o.MapFrom(s => s.BudgetCatId));

            CreateMap<DTOs.BudgetForDD, Entities.ArmsBudget>();

            CreateMap<Entities.ArmsBudget, DTOs.BudgetForDD>();

            CreateMap<Entities.ArmsDeliverableType, DTOs.DeliverableTypeForDD>()
              .ForMember(d => d.DeliverableTypeId, o => o.MapFrom(s => s.DeliverableTypeId));

            CreateMap<Entities.ArmsDeliverableStatus, DTOs.DeliverableStatusForDD>()
              .ForMember(d => d.DeliverableStatusId, o => o.MapFrom(s => s.DeliverableStatusId));

            CreateMap<Entities.ArmsInvoiceStatus, DTOs.InvoiceStatusForDD>()
             .ForMember(d => d.InvoiceStatusId, o => o.MapFrom(s => s.InvoiceStatusId));

            CreateMap<DTOs.ContactsForDD, Entities.ArmsContacts>()
              .ForMember(d => d.ContactID, o => o.Ignore())
              .ForMember(d => d.Entry_date, o => o.Ignore());

            CreateMap<Entities.ArmsContacts, DTOs.ContactsForDD>()
              .ForMember(d => d.ContactID, o => o.MapFrom(s => s.ContactID));

            /* Mapping for ArmsContactAgency from DTO to Entity for GET requests */
            CreateMap<Entities.ArmsContactAgency, DTOs.ContactAgencyForDD>()
               .ForMember(d => d.ContactAgencyId, o => o.MapFrom(s => s.ContactAgencyId));

            CreateMap<DTOs.ContactAgencyForDD, Entities.ArmsContactAgency>()
              .ForMember(d => d.ContactAgencyId, o => o.MapFrom(s => s.ContactAgencyId))
              .ForMember(d => d.Entry_Date, o => o.Ignore());


            CreateMap<Entities.ArmsContactAgency, DTOs.ContactAgencyForCreate>()
        .ForMember(d => d.ContactAgencyId, o => o.MapFrom(s => s.ContactAgencyId));

            CreateMap<DTOs.ContactAgencyForCreate, Entities.ArmsContactAgency>()
              .ForMember(d => d.ContactAgencyId, o => o.Ignore())
              .ForMember(d => d.Entry_Date, o => o.Ignore());



            CreateMap<Entities.ArmsAgency, DTOs.ArmsAgencyForUpdateDD>()
           .ForMember(d => d.AgencyCatId, o => o.MapFrom(s => s.AgencyCatId));

            CreateMap<DTOs.ArmsAgencyForUpdateDD, Entities.ArmsAgency>()
             .ForMember(d => d.AgencyId, o => o.MapFrom(s => s.AgencyId));

            CreateMap<Entities.ArmsAgency, DTOs.ArmsAgencyForCreateDD>()
           .ForMember(d => d.AgencyCatId, o => o.MapFrom(s => s.AgencyCatId));


            CreateMap<DTOs.ArmsAgencyForCreateDD, Entities.ArmsAgency>()
            .ForMember(d => d.AgencyId, o => o.Ignore())
            .ForMember(d => d.AgencyCat, o => o.Ignore());

            CreateMap<Entities.ArmsVendorAddress, DTOs.ArmVendorAddressForDD>()
            .ForMember(d => d.addressSeqNo, o => o.MapFrom(e => e.addressSeqNo));
            CreateMap<DTOs.ArmVendorAddressForDD, Entities.ArmsVendorAddress>()
            .ForMember(d => d.oaksVendorNo, o => o.MapFrom(e => e.oaksVendorNo));

            CreateMap<Entities.ArmsProjectType, DTOs.ProjectType>()
            .ForMember(d => d.ProjectTypeId, o => o.MapFrom(e => e.ProjectTypeId)).ReverseMap();

            CreateMap<DTOs.ArmsProjectForDD, Entities.ArmsProject>()
            .ForMember(d => d.ProjId, o => o.MapFrom(e => e.ProjId));

            CreateMap<Entities.ArmsProject, DTOs.ArmsProjectForDD>()
            .ForMember(d => d.ProjectTypeList, o => o.Ignore());


            CreateMap<Entities.Funding, DTOs.Funding>().ReverseMap();

        }
    }
}