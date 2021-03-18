using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Services.Interfaces;
using ODOT.ARMS.Web.DTOs;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsFundingController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IMapper _mapper;
        private readonly IArmsFundingRepository _armsFundingRepository;
        private readonly IArmsEventUploadRepository _fileUploads;

        public ArmsFundingController(IMapper mapper, IArmsFundingRepository armsFundingRepository, IArmsEventUploadRepository fileUploads)
        {
            _mapper = mapper;
            _armsFundingRepository = armsFundingRepository;
            _fileUploads = fileUploads;
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingforproject+json" })]
        public async Task<IActionResult> GetArmsFundingListByProjectId(Guid projectId)
        {
            var resultfunding = await _armsFundingRepository.GetAllArmFundingAsyncByProjectId(projectId);

            if (resultfunding == null)
            {
                return BadRequest();
            }
            var returnfundings = _mapper.Map<List<DTOs.Funding>>(resultfunding);
            var fileCnts = await _armsFundingRepository.GetUploadFileCountsAsync(projectId);
            foreach (var item in returnfundings)
            {
                item.DocCnt = 0;//"0 Docs";//default value
                var fileSrcCnt = fileCnts.Find(x => x.Src == item.EncumbranceId);
                if (fileSrcCnt != null)
                {
                    item.DocCnt = fileSrcCnt.FileCount;//String.Format("{0} Docs", fileSrcCnt.FileCount);
                }
            }

            return Ok(returnfundings);
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.fundingsforcreate+json" })]
        public async Task<IActionResult> AddFunding([FromBody] DTOs.Funding fundingForCreate)
        {
            Entities.Funding Funding;
            try
            {
                fundingForCreate.UserId = "sai";
                Funding = _mapper.Map<Entities.Funding>(fundingForCreate);
                await _armsFundingRepository.AddArmsFundingAsync(Funding);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
            var result = _mapper.Map<DTOs.Funding>(Funding);
            result.DocCnt = 0;
            return Ok(result);
        }

        [HttpPatch("{fundingId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.fundingsforupdate+json" })]
        public async Task<IActionResult> UpdateFunding(Guid fundingId, [FromBody] DTOs.Funding fundingForUpdate)
        {
            var fundingFromRepo = await _armsFundingRepository.GetArmsFundingIdAsync(fundingId);

            if (fundingFromRepo == null)
            {
                return BadRequest();
            }

            fundingForUpdate.UserId = "sai";
            _armsFundingRepository.UpdateArmsFunding(_mapper.Map(fundingForUpdate, fundingFromRepo));
            var result = _mapper.Map<DTOs.Funding>(fundingFromRepo);
            result.DocCnt = await _fileUploads.GetUploadCountBySrcIdAsync(fundingFromRepo.EncumbranceId);
            return Ok(result);
            // return Ok(_mapper.Map<DTOs.Funding>(fundingFromRepo));
        }
    }
}