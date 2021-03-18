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
    [Route("api/[controller]")]
    [ApiController]

    public class ControllingBoardController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IArmsControllingBoardRepository _controllingBoardRepo;
        private readonly IArmsEventUploadRepository _fileUploads;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ControllingBoardController(IMapper mapper, IArmsControllingBoardRepository controllingBoardRepository, IArmsEventUploadRepository fileUploads)
        {
            _mapper = mapper;
            _controllingBoardRepo = controllingBoardRepository;
            _fileUploads = fileUploads;
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.cbsforproject+json" })]
        public async Task<IActionResult> GetCBsListByProjectId(Guid projectId)
        {
            var cbs = await _controllingBoardRepo.GetAllArmsCBAsyncByProjectId(projectId);

            if (cbs == null)
            {
                return BadRequest();
            }

            var returnCBs = _mapper.Map<List<DTOs.ControllingBoard>>(cbs);


            var fileCnts = await _controllingBoardRepo.GetUploadFileCountsAsync(projectId);
            foreach (var item in returnCBs)
            {
                item.DocCnt = 0;//"0 Docs";//default value
                var fileSrcCnt = fileCnts.Find(x => x.Src == item.ControllingBoardId);
                if (fileSrcCnt != null)
                {
                    item.DocCnt = fileSrcCnt.FileCount;//String.Format("{0} Docs", fileSrcCnt.FileCount);
                }
            }

            return Ok(returnCBs);
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.cbforcreate+json" })]
        public async Task<IActionResult> AddCB([FromBody] DTOs.ControllingBoard cbForCreate)
        {
            Entities.ControllingBoard cbToAdd;

            try
            {
                cbForCreate.UserId = "preicher";
                cbToAdd = _mapper.Map<Entities.ControllingBoard>(cbForCreate);
                await _controllingBoardRepo.AddArmsCBAsync(cbToAdd);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                return StatusCode(500);
            }

            var copyCB = _mapper.Map<DTOs.ControllingBoard>(cbToAdd);
            copyCB.DocCnt = 0;
            return Ok(copyCB);
        }

        [HttpPatch("{ControllingBoardId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.cbforupdate+json" })]
        public async Task<IActionResult> UpdateCB(Guid ControllingBoardId, [FromBody] DTOs.ControllingBoard cbForUpdate)
        {
            var cbFromRepo = await _controllingBoardRepo.GetArmsCBIdAsync(ControllingBoardId);

            if (cbFromRepo == null)
            {
                return BadRequest();
            }

            cbForUpdate.UserId = "preicher";
            _controllingBoardRepo.UpdateArmsCB(_mapper.Map(cbForUpdate, cbFromRepo));
            var copyCB = _mapper.Map<DTOs.ControllingBoard>(cbFromRepo);
            copyCB.DocCnt = await _fileUploads.GetUploadCountBySrcIdAsync(cbForUpdate.ControllingBoardId ?? Guid.Empty);
            return Ok(copyCB);
        }
    }
}