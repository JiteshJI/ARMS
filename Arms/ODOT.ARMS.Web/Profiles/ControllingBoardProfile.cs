using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class ControllingBoardProfile : Profile
    {
        public ControllingBoardProfile() {
            CreateMap<DTOs.ControllingBoard, Entities.ControllingBoard>()
            .ForMember(d => d.ControllingBoardId, o => o.MapFrom(e => e.ControllingBoardId));

            CreateMap<Entities.ControllingBoard, DTOs.ControllingBoard>()
            .ForMember(d => d.DocCnt, o => o.Ignore());
        }

    }
}
