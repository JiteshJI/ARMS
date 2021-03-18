using AutoMapper;

namespace ODOT.ARMS.Web.Profiles
{
    public class InvoiceProfile : Profile
    {
        public InvoiceProfile() {
            CreateMap<DTOs.Invoice, Entities.Invoice>()
                //.ForMember(d => d.InvoiceId, o => o.Ignore())
                .ForMember(d => d.UserId, o => o.Ignore())
                .ForMember(d => d.EntryDt, o => o.Ignore()); 
                
            CreateMap<Entities.Invoice, DTOs.Invoice>()
                .ForMember(d => d.DocCnt, o => o.Ignore());

            CreateMap<DTOs.InvoiceDetail, Entities.InvoiceDetail>()
                .ForMember(d => d.UserId, o => o.Ignore())
                .ForMember(d => d.EntryDt, o => o.Ignore())
                .ForMember(d => d.InvoiceId, o => o.Ignore());

            CreateMap<Entities.InvoiceDetail, DTOs.InvoiceDetail>() 
                .ForMember(d => d.invDtlKey, o => o.Ignore());

            CreateMap<Entities.BudgetCatDD, DTOs.BudgetCatDD>()
                .ForMember(d => d.LookupKey, o => o.MapFrom(e => e.LookupKey)).ReverseMap();

            CreateMap<Entities.Encumbrance, DTOs.Encumbrance>()
                .ForMember(d => d.EncumbranceNbr, o => o.MapFrom(e => e.EncumbranceNbr)).ReverseMap();

            CreateMap<Entities.ProjectBalance, DTOs.ProjectBalance>()
                .ForMember(d => d.ProjId, o => o.MapFrom(e => e.ProjId)).ReverseMap();//public Guid ProjId { get; set; }
        }
    }
}
