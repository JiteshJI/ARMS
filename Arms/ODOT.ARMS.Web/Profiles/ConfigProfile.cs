using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class ConfigProfile : Profile
    {
        public ConfigProfile()
        {
            CreateMap<DTOs.ConfigItem, Entities.ConfigItem>()
            .ForMember(d => d.KeyNme, o => o.MapFrom(e => e.KeyNme));

            CreateMap<Entities.ConfigItem, DTOs.ConfigItem>();
        }
    }
}
