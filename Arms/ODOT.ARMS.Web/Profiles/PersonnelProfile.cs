using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class PersonnelProfile : Profile
    {
        public PersonnelProfile()
        {
            CreateMap<Entities.ArmsPersonnel, DTOs.Personnel>()
            .ForMember(d => d.PersonnelId, o => o.MapFrom(e => e.PersonnelId));

             CreateMap<DTOs.Personnel, Entities.ArmsPersonnel>()
            .ForMember(d => d.PersonnelId, o => o.Ignore())
            .ForMember(d => d.EntryDt, o => o.Ignore());

             CreateMap<Entities.ArmsPersonnel, DTOs.PersonnelForDisplay>()
            .ForMember(d => d.PersonnelId, o => o.MapFrom(e => e.PersonnelId))
            .ForMember(d => d.ContactName, o => o.Ignore())
            .ForMember(d => d.ContactRole, o => o.Ignore())
            .ForMember(d => d.EmailAddress, o => o.Ignore())
            .ForMember(d => d.agencyName, o => o.Ignore());

             CreateMap<DTOs.PersonnelForDisplay, Entities.ArmsPersonnel>()
            .ForMember(d => d.PersonnelId, o => o.Ignore())
            .ForMember(d => d.EntryDt, o => o.Ignore());
        }
    }
}