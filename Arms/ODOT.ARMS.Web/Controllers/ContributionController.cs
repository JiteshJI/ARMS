using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    public class ContributionController : Controller
    {
        // GET: ContributionController
        private readonly IMapper _mapper;
        private readonly IArmsContributionRepository _ContributionRepo;
        private readonly IArmsEventUploadRepository _fileUploads;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ContributionController(IMapper mapper,IArmsContributionRepository ContributionRepository, IArmsEventUploadRepository fileUploads)
        {
            _mapper = mapper;
            _ContributionRepo = ContributionRepository;
            _fileUploads = fileUploads;
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.cbsforproject+json" })]
        public async Task<IActionResult> GetCBsListByProjectId(Guid projectId)
        {
            var cbs = await _ContributionRepo.GetAllArmsContributionAsyncByProjectId(projectId);

            if (cbs == null)
            {
                return BadRequest();
            }

            var returnCBs = _mapper.Map<List<DTOs.ArmsContribution>>(cbs);


            var fileCnts = await _ContributionRepo.GetUploadFileCountsAsync(projectId);
            foreach (var item in returnCBs)
            {
                item.DocCnt = 0;//"0 Docs";//default value
                var fileSrcCnt = fileCnts.Find(x => x.Src == item.ContributionId);
                if (fileSrcCnt != null)
                {
                    item.DocCnt = fileSrcCnt.FileCount;//String.Format("{0} Docs", fileSrcCnt.FileCount);
                }
            }

            return Ok(returnCBs);
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.cbforcreate+json" })]
        public async Task<IActionResult> AddCB([FromBody] DTOs.ArmsContribution cbForCreate)
        {
            Entities.ArmsContribution cbToAdd;

            try
            {
                cbForCreate.UserId = "preicher";
                cbToAdd = _mapper.Map<Entities.ArmsContribution>(cbForCreate);
                await _ContributionRepo.AddArmsContributionAsync(cbToAdd);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                return StatusCode(500);
            }

            var copyCB = _mapper.Map<DTOs.ArmsContribution>(cbToAdd);
            copyCB.DocCnt = 0;
            return Ok(copyCB);
        }

        [HttpPatch("{ContributionId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.cbforupdate+json" })]
        public async Task<IActionResult> UpdateCB(Guid ContributionId, [FromBody] DTOs.ArmsContribution cbForUpdate)
        {
            var cbFromRepo = await _ContributionRepo.GetArmsContributionIdAsync(ContributionId);

            if (cbFromRepo == null)
            {
                return BadRequest();
            }

            cbForUpdate.UserId = "preicher";
            _ContributionRepo.UpdateArmsContribution(_mapper.Map(cbForUpdate, cbFromRepo));
            var copyCB = _mapper.Map<DTOs.ArmsContribution>(cbFromRepo);
            copyCB.DocCnt = await _fileUploads.GetUploadCountBySrcIdAsync(cbForUpdate.ContributionId ?? Guid.Empty);
            return Ok(copyCB);
        }
    }
}