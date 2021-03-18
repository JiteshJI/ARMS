using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class PhaseProfile : Profile
    {
        public PhaseProfile() {
            CreateMap<DTOs.ArmsPhaseForDD, Entities.ArmsPhase>()
            .ForMember(d => d.PhaseId, o => o.MapFrom(e => e.PhaseId));

            CreateMap<Entities.ArmsPhase, DTOs.ArmsPhaseForDD>()
            .ForMember(d => d.IsUpdated, o => o.Ignore())
            .ForMember(d => d.IsOld, d => d.Ignore());
        }
    }
}
