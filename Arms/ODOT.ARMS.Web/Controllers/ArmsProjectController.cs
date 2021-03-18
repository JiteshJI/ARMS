using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Configuration;


namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsProjectController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IArmsProjectRepository _armsProjectRepository;
        public readonly IArmsPhase _armsPhaseRepository;
        private readonly IArmsAdministrationCategory _armsAdministrationCategory;

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ArmsProjectController(IMapper mapper, IArmsProjectRepository armsProjectRepository, IArmsPhase armsPhaseRepository, IArmsAdministrationCategory armsAdministrationCategory, IConfiguration configuration)
        {
            _mapper = mapper;
            _armsProjectRepository = armsProjectRepository;
            _armsAdministrationCategory = armsAdministrationCategory;
            _armsPhaseRepository = armsPhaseRepository;
        }

        [HttpGet(Name = "GetArmsProjectTypeList")]
        [Route("GetArmsProjectTypeList")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectTypeListfordd+json" })]
        public async Task<IActionResult> GetArmsProjectTypeList()
        {

            var resultEntity = await _armsProjectRepository.GetArmsProjectTypesAsync();
            var result = _mapper.Map<IEnumerable<DTOs.ProjectType>>(resultEntity);
            return Ok(result);
        }

        [HttpPost]
        [Route("DeleteAllArmsProjectType")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.projectTypefordelete+json" })]
        public IActionResult DeleteAllArmsProjectType(Guid projectId)
        {
            if (projectId == null)
            {
                return BadRequest();
            }
            _armsProjectRepository.DeleteArmsProjectType(projectId);
            return Ok();
        }

        [HttpPost]
        [Route("AddArmsProjectType")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.projectTypeforcreate+json" })]
        public async Task<IActionResult> AddArmsProjectType([FromBody] ProjectType projectTypeCreate)
        {
            //log.Info("AddNewAgency");
            if (projectTypeCreate == null)
            {
                return BadRequest();
            }
            var armsAdministration = _mapper.Map<Entities.ArmsProjectType>(projectTypeCreate);
            await _armsProjectRepository.AddArmsProjectType(armsAdministration);
            return Ok(projectTypeCreate);
        }


        [HttpGet(Name = "GetArmsProjectById")]
        [Route("GetArmsProjectById/{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectByIdfordd+json" })]
        public IActionResult GetArmsProjectById(Guid projectId)
        {
            if (projectId == Guid.Empty)
            {
                return BadRequest();
            }
            dynamic result = null;
            var resultEntity = _armsProjectRepository.GetArmsArmsProjectId(projectId);
            var phaseList = _armsPhaseRepository.GetAllArmsPhaseAsync(projectId);
            if (resultEntity != null)
            {
                result = _mapper.Map<DTOs.ArmsProjectForDD>(resultEntity);
                result.PhaseList = _mapper.Map<IEnumerable<DTOs.ArmsPhaseForDD>>(phaseList).ToList();
            }
            return Ok(result);
        }

        [HttpGet(Name = "GetArmsProjectByProjAltId")]
        [Route("GetArmsProjectByProjAltId")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectByIdfordd+json" })]
        public IActionResult GetArmsProjectByProjAltId(string projAltId)
        {
            var projId=Guid.Empty;
            if (projAltId == String.Empty)
            {
                return BadRequest();
            }
            int projAltID=Int32.Parse(projAltId);
             var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var result = _mapper.Map<DTOs.ArmsProjectForDD>(project);
            if (result != null)
            {        
                projId = result.ProjId;
            }
            return Ok(projId);
        }
        
        [HttpGet(Name = "GetProjectHeaderByProjAltId")]
        [Route("GetProjectHeaderByProjAltId/{projAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectheaderbyid+json" })]
        public IActionResult GetProjectHeaderByProjAltId(string projAltId)
        {
            if (string.IsNullOrEmpty(projAltId))
            {
                return BadRequest();
            }
            int projAltID=Int32.Parse(projAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var projectDto = _mapper.Map<DTOs.ProjectHeader>(project);
            return Ok(projectDto);
        }
        
        [HttpGet(Name = "GetProjectByProjAltId")]
        [Route("GetProjectByProjAltId")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectbyid+json" })]
        public IActionResult GetProjectByProjAltId(string projAltId)
        {
            if (string.IsNullOrEmpty(projAltId))
            {
                return BadRequest();
            }
            int projAltID = int.Parse(projAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var projectDto = _mapper.Map<DTOs.ArmsProjectForDD>(project);
            if (projectDto != null)
            {
                var phaseList = new List<ArmsPhaseForDD>();
                phaseList.AddRange(_mapper.Map<IEnumerable<DTOs.ArmsPhaseForDD>>(_armsPhaseRepository.GetAllArmsPhaseAsync(project.ProjId)));
                projectDto.PhaseList = phaseList;
            }
            return Ok(projectDto);
        }
        
        private static void formatDate(ArmsProjectForDD armsProject)
        {
            if (armsProject != null)
            {
                armsProject.ContractStartDt = armsProject.ContractStartDt == null ? armsProject.ContractStartDt : armsProject.ContractStartDt.Value.AddDays(1);
                armsProject.ContractEndDt = armsProject.ContractEndDt == null ? armsProject.ContractEndDt : armsProject.ContractEndDt.Value.AddDays(1);
                armsProject.CurrentEndDt = armsProject.CurrentEndDt == null ? armsProject.CurrentEndDt : armsProject.CurrentEndDt.Value.AddDays(1);
            }
        }
    }
}