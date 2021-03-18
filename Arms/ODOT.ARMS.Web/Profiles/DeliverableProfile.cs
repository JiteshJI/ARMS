using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class DeliverableProfile : Profile
    {
        public DeliverableProfile()
        {

            CreateMap<DTOs.ProjDeliverables, Entities.ArmsDeliverables>()
                .ForMember(d => d.EntryDt, o => o.Ignore());

            CreateMap<Entities.ArmsDeliverables, DTOs.ProjDeliverables>();

            CreateMap<DTOs.ProjDeliverables, Entities.ArmsProjectDeliverables>()
                .ForMember(d => d.EntryDt, o => o.Ignore())
                .ForMember(d => d.ProjId, o => o.MapFrom(o => o.ProjectId));

            CreateMap<Entities.ArmsProjectDeliverables, DTOs.ProjDeliverables>();





        }
    }
}
