using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CustomDeliverablesController : Controller
    {

        private readonly IMapper _mapper;
        private readonly ICustomDeliverableRepository _customDeliverableRepo;
        private readonly IArmsProjectRepository _armsProjectRepo;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public CustomDeliverablesController(IMapper mapper, ICustomDeliverableRepository customDeliverableRepository, IArmsProjectRepository armsProjectRepository)
        {
            _mapper = mapper;
            _customDeliverableRepo = customDeliverableRepository;
            _armsProjectRepo = armsProjectRepository;
        }

        [HttpGet("{projectAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projdeliverablesByAltId+json" })]
        public async Task<IActionResult> GetAllProjectDeliverablesByProjectId(string projectAltId)

        {
            var prjId = _armsProjectRepo.GetArmsProjectByProjAltId(int.Parse(projectAltId)).ProjId;
            var CustomDeliverablesByIDFromRepo = await _customDeliverableRepo.GetDeliverablesByProjIdAsync(prjId);
            if (CustomDeliverablesByIDFromRepo == null)
            {
                return BadRequest();
            }
            return Ok(CustomDeliverablesByIDFromRepo);
        }


        [HttpGet("{projectAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.customdeliverablesforproject+json" })]
        public async Task<IActionResult> GetCustomDeliverablesByProjectAltId(string projectAltId)
        {
            var prjId = _armsProjectRepo.GetArmsProjectByProjAltId(int.Parse(projectAltId)).ProjId;
            var CustomDeliverablesFromRepo = await _customDeliverableRepo.GetCustomDeliverablesByPrjAltId(prjId);
            if (CustomDeliverablesFromRepo == null)
            {
                return BadRequest();
            }
            return Ok(CustomDeliverablesFromRepo);
        }

        [HttpGet("{projectAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.alldeliverablesByproject+json" })]
        public IActionResult GetAllDeliverablesByProjectAltId(string projectAltId)
        {
            var prjId = _armsProjectRepo.GetArmsProjectByProjAltId(int.Parse(projectAltId)).ProjId;
            var AllDeliverablesFromRepo =  _customDeliverableRepo.GetAllDeliverablesbyProjectAsync(prjId);
            if (AllDeliverablesFromRepo == null)
            {
                return BadRequest();
            }
            return Ok(AllDeliverablesFromRepo);
        }

     
        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.customdeliverable+json" })]
        public IActionResult SaveProjectDeliverables([FromBody] DTOs.ProjDeliverables[] addnewProjectDeliverables)
        {
            if(addnewProjectDeliverables ==null)
            {
                return BadRequest();
            }
            try
            {
               addnewProjectDeliverables.ToList().ForEach(pd => pd.UserId= "Manoj");
               var projectId = (Guid)addnewProjectDeliverables.First().ProjectId;
                var projectAltId = _armsProjectRepo.GetArmsArmsProjectId(projectId).ProjectAltId;
               _customDeliverableRepo.UpdateCustomDeliverable(addnewProjectDeliverables,projectId, projectAltId);
                return Ok(projectAltId);
            }

            catch(Exception ex)
            {
                var error = ex.Message;
                return BadRequest(error);
            }
        }
    }
}