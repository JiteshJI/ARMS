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
    
    public class ArmsFundingSourceController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;

        public ArmsFundingSourceController(IMapper mapper,IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }


        /*
        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingsourcefordd+json" })]

        public async Task<IActionResult> GetFundingSources()
        {
            var fundSourcesFromRepo = await _armsDataRepository.GetAllFundingSourcesAsync();

            var fundingSources = _mapper.Map<IEnumerable<DTOs.FundingSourceForDD>>(fundSourcesFromRepo);

            return Ok(fundingSources);
        }
        */

        /*
        [HttpGet("GetFundingSource/{FundingSrcId}", Name = "GetFundingSource")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingsource+json" })]
        public async Task<IActionResult> GetFundingSource(int FundingSrcId)
        {

            var FundingSourceFromRepo = await _armsDataRepository.GetFundingSourceIdAsync(FundingSrcId);
            if (FundingSourceFromRepo == null)
            {
                return BadRequest();
            }

            var fundingSource = _mapper.Map<DTOs.FundingSourceForDD>(FundingSourceFromRepo);

            return Ok(fundingSource);
        }
        */






    }
}
