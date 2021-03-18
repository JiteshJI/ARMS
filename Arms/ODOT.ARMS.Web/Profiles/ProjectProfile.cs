using AutoMapper;
using ODOT.ARMS.Web.Entities.Extensions;

namespace ODOT.ARMS.Web.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<DTOs.ArmsProjectForDD, Entities.ArmsProject>()
            .ForMember(d => d.ProjId, o => o.MapFrom(e => e.ProjId));


            CreateMap<Entities.ArmsProject, DTOs.ArmsProjectForDD>()
            .ForMember(d => d.ProjectTypeList, o => o.Ignore())
            .ForMember(d => d.AgencyName, o => o.MapFrom(e => e.Agency.AgencyNameTxt))  /** using entity framework to get the field from lookup table **/
            .ForMember(d => d.ProjectStatusTxt, o => o.MapFrom(e => e.ProjectStatus.AdministrationCategoryText));  /** using entity framework to get the field from lookup table **/

            CreateMap<DTOs.ProjectInfo, Entities.ArmsProject>()
            .ForMember(d => d.ProjId, o => o.Ignore())
            .ForMember(d => d.UserId, o =>o.Ignore());


            CreateMap<Entities.ArmsProject, DTOs.ProjectInfo>()
            .ForMember(d => d.ProjectTypeList, o => o.Ignore())
            .ForMember(d => d.ProjId, o => o.MapFrom(e =>e.ProjId.ToString()));
            
            //.ForMember(d => d.AgencyName, o => o.MapFrom(e => e.Agency.AgencyNameTxt))  /** using entity framework to get the field from lookup table **/
           // .ForMember(d => d.ProjectStatusTxt, o => o.MapFrom(e => e.ProjectStatus.AdministrationCategoryText));  /** using entity framework to get the field from lookup table **/

            CreateMap<Entities.ArmsProject, DTOs.ProjectHeader>()
            .ForMember(d => d.ProjectType, o => o.MapFrom(s => System.Enum.IsDefined(typeof(ProjectTypeEnum), s.ProjectClassificationId) ? ((ProjectTypeEnum)s.ProjectClassificationId).GetDescription() : ""));

            CreateMap<Entities.ArmsProject, DTOs.ProjectForSearch>()
            .ForMember(d => d.AgencyName, o => o.MapFrom(e => e.Agency.AgencyNameTxt))
            .ForMember(d => d.ProjectType, o => o.MapFrom(e => ((ProjectTypeEnum)e.ProjectClassificationId).GetDescription()))
            .ForMember(d => d.ProjectStatusTxt, o => o.MapFrom(e => e.ProjectStatus.AdministrationCategoryText ?? ""));

            CreateMap<Entities.SearchProject, DTOs.ProjectForSearch>()
            .ForMember(d => d.ProjectAltId, o => o.MapFrom(e => e.ProjectAltId));

            CreateMap<DTOs.ProjectCurrentSummary, Entities.ArmsProject>()
           .ForMember(d => d.ProjId, o => o.MapFrom(e => e.ProjId));

            CreateMap<Entities.ArmsProject, DTOs.ProjectCurrentSummary>()
            .ForMember(d => d.ProjId, o => o.MapFrom(e => e.ProjId));

            CreateMap<Entities.ArmsProject, DTOs.ProjectAbstract>()
            .ForMember(d => d.AbstractTxt, o => o.MapFrom(e => e.ObjectiveTxt));

            CreateMap<DTOs.ProjectAbstract, Entities.ArmsProject>()
            .ForMember(d => d.ObjectiveTxt, o => o.MapFrom(e => e.AbstractTxt));

            CreateMap<Entities.ArmsProjectType, DTOs.ProjectType>()
            .ForMember(d => d.ProjectTypeId, o => o.MapFrom(e => e.ProjectTypeId));

            CreateMap<Entities.ArmsPhase, DTOs.Phase>();

            CreateMap<DTOs.Phase, Entities.ArmsPhase>();


        }
    }
}