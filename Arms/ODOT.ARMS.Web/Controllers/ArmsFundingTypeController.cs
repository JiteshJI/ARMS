using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ArmsFundingTypeController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IArmsFundingType _armsFundingTypeRepository;


        public ArmsFundingTypeController(IMapper mapper, IArmsFundingType armsFundingTypeRepository)
        {
            _mapper = mapper;
            _armsFundingTypeRepository = armsFundingTypeRepository;
        }


        [HttpGet(Name = "GetFundingTypeList")]
        [Route("GetFundingTypeList")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingtypeListfordd+json" })]
        public async Task<IActionResult> GetFundingTypeList()
        {
            var fundingTypesFromRepo = await _armsFundingTypeRepository.GetAllArmsFundingTypeAsync();
            var fundingTypes = _mapper.Map<IEnumerable<DTOs.FundingTypeForDD>>(fundingTypesFromRepo);
            return Ok(fundingTypes);
        }
       
        [HttpGet(Name = "GetFundingTypeById")]
        [Route("GetFundingType/{FundingTypeId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] {"application/vnd.dot.arms.fundingtypebyId+json"})]
        public async Task<IActionResult> GetFundingTypeById(int FundingTypeId)
        {
            if (FundingTypeId < 0)
            {
                return BadRequest();
            }
            var FundingTypeFromRepo = await _armsFundingTypeRepository.GetArmsArmsFundingTypeIdAsync(FundingTypeId);
            var fundingType = _mapper.Map<DTOs.FundingTypeForDD>(FundingTypeFromRepo);
            return Ok(fundingType);
        }
        
    }
}
