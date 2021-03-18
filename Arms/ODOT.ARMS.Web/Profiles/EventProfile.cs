using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<DTOs.Event, Entities.Event>()
            .ForMember(d => d.EventId, o => o.MapFrom(e => e.EventId));
            CreateMap<Entities.Event, DTOs.Event>()
            .ForMember(d => d.DocCnt, o => o.Ignore())
            .ForMember(d => d.ActiveTxt, o => o.Ignore());
            CreateMap<DTOs.FileUpload, Entities.FileUpload>()
           .ForMember(d => d.EventSrc, o => o.MapFrom(e => e.EventSrc)).ReverseMap();


            CreateMap<DTOs.EventForAdd, Entities.Event>()
          .ForMember(d => d.EventId, o => o.MapFrom(e => e.EventId));

            CreateMap<Entities.Event, DTOs.EventForAdd>()
           .ForMember(d => d.DocCnt, o => o.Ignore())
           .ForMember(d => d.ActiveTxt, o => o.Ignore())
           .ForMember(d => d.contactIdList, o => o.Ignore());
        }
    }
}
