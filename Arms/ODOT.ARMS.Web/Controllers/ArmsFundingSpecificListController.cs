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

    public class ArmsFundingSpecificListController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;


        public ArmsFundingSpecificListController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet(Name = "GetFundingSpecificListTypes")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingspecificlistfordd+json" })]
        public async Task<IActionResult> GetFundingSpecificListTypes()
        {
            var specificListFromRepo = await _armsDataRepository.GetAllFundingSpecificListAsync();

            var specificList = _mapper.Map<IEnumerable<DTOs.SpecificListForDD>>(specificListFromRepo);

            return Ok(specificList);
        }

        [HttpGet("{FundingSpecificListTypeId}", Name = "GetFundingSpecificListType")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingspecificlist+json" })]
        public async Task<IActionResult> GetFundingSpecificListType(int FundingSpecificListTypeId)
        {

            var SpecificListFromRepo = await _armsDataRepository.GetFundingSpecificListIdAsync(FundingSpecificListTypeId);
            if (SpecificListFromRepo == null)
            {
                return BadRequest();
            }

            var specificList = _mapper.Map<DTOs.SpecificListForDD>(SpecificListFromRepo);

            return Ok(specificList);
        }
    }
}
