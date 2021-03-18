using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IArmsProjectRepository _armsProjectRepository;
        public readonly IArmsPhase _armsPhaseRepository;
        private readonly IConfiguration _configuration;
        private readonly ICustomDeliverableRepository _customDeliverableRepository;

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ProjectController(IMapper mapper, IArmsProjectRepository armsProjectRepository, IArmsPhase armsPhaseRepository, IConfiguration configuration, ICustomDeliverableRepository customDeliverableRepository)
        {
            _mapper = mapper;
            _armsProjectRepository = armsProjectRepository;
            _armsPhaseRepository = armsPhaseRepository;
            _configuration = configuration;
            _customDeliverableRepository = customDeliverableRepository;
        }

        [HttpGet("{projAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectheaderbyaltid+json" })]
        public IActionResult GetProjectHeaderByProjAltId(string projAltId)
        {
            if (string.IsNullOrEmpty(projAltId))
            {
                return BadRequest();
            }
            int projAltID = int.Parse(projAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var projectDto = _mapper.Map<DTOs.ProjectHeader>(project);
            return Ok(projectDto);
        }

        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectsearch+json" })]
        public async Task<IActionResult> GetProjectsForSearch()
        {
            var projectEntities = await _armsProjectRepository.GetAllSearchProjectsAsync();//This works
            var projects = _mapper.Map<IEnumerable<DTOs.ProjectForSearch>>(projectEntities);//This complains and fails
            return Ok(projects);//This never happens
        }

        [HttpGet("{projId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectphaselistbyid+json" })]
        public IActionResult GetProjectPhaseListById(string projId)
        {
            if (string.IsNullOrEmpty(projId))
            {
                return BadRequest();
            }
            var projectId = new Guid(projId);
            return Ok(_mapper.Map<IEnumerable<DTOs.ArmsPhaseForDD>>(_armsPhaseRepository.GetAllArmsPhaseAsync(projectId)));
        }

        [HttpGet("{prjAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectsummarybyaltid+json" })]
        public IActionResult GetProjectCurrentSummaryByAltId(string prjAltId)
        {
            if (string.IsNullOrEmpty(prjAltId))
            {
                return BadRequest();
            }

            int projAltID = Int32.Parse(prjAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var prjSummaryDto = _mapper.Map<DTOs.ProjectCurrentSummary>(project);
            return Ok(prjSummaryDto);

        }

        
        [HttpPatch]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.projectsummaryforupdate+json" })]
        public IActionResult UpdateProjectCurrentSummaryByAltId([FromBody] DTOs.ProjectCurrentSummary currentSummaryForUpdate)
        {

            log.Info("UpdateCurrentSummary");
            if (currentSummaryForUpdate == null)
            {
                return BadRequest();
            }

            int projAltID = currentSummaryForUpdate.ProjectAltId;
            /* getting the object from entity framework */
            var projectFromRepo = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);

            if (projectFromRepo == null)
            {
                return BadRequest();
            }

            currentSummaryForUpdate.UserId = "Manoj"; //Todo: Replace with Session variable

            //? Comment getting the modified object by mapping the objects 
            var currentSummaryToUpdate = _mapper.Map(currentSummaryForUpdate, projectFromRepo);
            //* Updating the project summary 
            _armsProjectRepository.UpdateArmsProject(currentSummaryToUpdate);
            var prjSummaryDto = _mapper.Map<DTOs.ProjectCurrentSummary>(currentSummaryToUpdate);

            return Ok(prjSummaryDto); //?Returning back the currentSummary for updating the state.                             

        }
             
        [HttpGet("{prjAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectInfoByAltId+json"})] 
        public IActionResult getSelectedProjectInfoByProjectID(string prjAltId)  //This parameter name should match with the one passed by api
        {
            if (string.IsNullOrEmpty(prjAltId))
            {
                return BadRequest();
            }
            int projAltID = int.Parse(prjAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);
            var projectDto = _mapper.Map<DTOs.ProjectInfo>(project);
            if (projectDto != null)
            {
                /* getting project type list */
                var projectTypeList= new List<ProjectType>();
                var projectTypes=_armsProjectRepository.GetArmsProjectTypesByIdAsync(project.ProjId);
                projectTypeList.AddRange(_mapper.Map<IEnumerable<DTOs.ProjectType>>(projectTypes));
                projectDto.ProjectTypeList=projectTypeList;

                /* getting project Deliverable list */
                var projDeliverableList = new List<ProjDeliverables>();
                var projDeliverables = _customDeliverableRepository.GetDeliverablesByProjIdAsync(project.ProjId).Result;
                projDeliverableList.AddRange(_mapper.Map<IEnumerable<DTOs.ProjDeliverables>>(projDeliverables));
                projectDto.projectDeliverableList = projDeliverableList;

            }
            return Ok(projectDto);
        }
/*
        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] {"application/vnd.dot.arms.projectforcreate+json"})]

        public IActionResult addNewProject([FromBody] DTOs.ProjectInfo addProject)
        {
            if (addProject == null)
                return BadRequest();

            addProject.UserId = "Manoj";
            var projectEntity = _mapper.Map<Entities.ArmsProject>(addProject); //Map the DTO to an entity
            projectEntity.ProjId=new Guid(); 
            projectEntity.UserId="Manoj";
            projectEntity.ActiveInd = "A";
            //This is how you insert into two tables that have a foreign key relationship

            if (addProject.ProjectTypeList != null && addProject.ProjectTypeList.Count > 0)
            {
                List<Entities.ArmsProjectType> projTypeCollect = new List<Entities.ArmsProjectType>();
                foreach (var projectType in addProject.ProjectTypeList)
                {
                    Entities.ArmsProjectType projType = new Entities.ArmsProjectType();
                    projType.ProjectTypeId = projectType.ProjectTypeId;
                    projType.UserId = projectEntity.UserId;
                    projTypeCollect.Add(projType);                   
                }
                projectEntity.ArmsProjectType=projTypeCollect;

            }

            try
            {
                var addedProjectEntity = _armsProjectRepository.AddArmsProjectAsync(projectEntity);              
                var projectDto = _mapper.Map<DTOs.ProjectInfo>(addedProjectEntity);
                return Ok(projectDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
*/
        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] {"application/vnd.dot.arms.projectforcreate+json"})]
        public IActionResult NewProject([FromBody] DTOs.ProjectInfo addnewProject)
        {
            if(addnewProject ==null)
            {
                return BadRequest();
            }
           
            var projectEntity = _mapper.Map<Entities.ArmsProject>(addnewProject);
            projectEntity.ProjId = Guid.NewGuid();
            projectEntity.UserId="Manoj";
            projectEntity.ActiveInd = "A";
            Entities.ArmsProject addedProjectEntity;
            try
            {
                addedProjectEntity=_armsProjectRepository.AddArmsProjectAsync(projectEntity).Result;
                _armsProjectRepository.AddPrjTypeAsync(addnewProject, projectEntity.ProjId);
                _customDeliverableRepository.AddCustomDeliverable(addnewProject.projectDeliverableList, projectEntity.ProjId);
                //===================================================================================================================================================
                // 
                // Generate the first default Phase to the Project Here (it contains the merge guid and is set to proposed with a zero amount)
                //
                //===================================================================================================================================================
                _armsPhaseRepository.AddArmsPhase(new Entities.ArmsPhase(projectEntity.ProjId, "Manoj"));// Make sure you always blame Manoj if bad things happen
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                return StatusCode(500);
            }

            return Ok(_mapper.Map<DTOs.ProjectInfo>(addedProjectEntity));
        }

        [HttpPatch]
        [RequestHeaderMatchesMediaType("Content-Type", new[] {"application/vnd.dot.arms.projectforupdate+json"})]
        public IActionResult UpdateProject([FromBody] DTOs.ProjectInfo updateProject)
        {
           if(updateProject ==null)
           {
               return BadRequest();
           }
            updateProject.UserId = "Manoj";

            int projectAltId = int.Parse(updateProject.ProjectAltId.ToString());
            Guid projId = Guid.Parse(updateProject.ProjId);
           
           var projectEntity = _mapper.Map<Entities.ArmsProject>(updateProject);
           projectEntity.UserId="Manoj";
           projectEntity.ActiveInd = "A";

            /* get the project from database and then modify the object with the new values.finally  update the project */
            var projectFromRepo = _armsProjectRepository.GetArmsProjectByProjAltId(projectAltId);
            var projectToUpdate = _mapper.Map(updateProject, projectFromRepo);
            var addedProjectEntity = _armsProjectRepository.UpdateArmsProjectAsync(projectToUpdate).Result;
            _armsProjectRepository.UpdatePrjTypeAsync(updateProject, projectToUpdate.ProjId);
            _customDeliverableRepository.UpdateCustomDeliverable(updateProject.projectDeliverableList, projId, projectAltId);
            var projectDto = _mapper.Map<DTOs.ProjectInfo>(addedProjectEntity);
           return Ok(projectDto);
        }


        [HttpGet("{prjAltId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectabstractbyaltid+json" })]
        public IActionResult GetProjectAbstractByAltId(string prjAltId)
        {
            if (string.IsNullOrWhiteSpace(prjAltId))
                return BadRequest();

            int projAltId = int.Parse(prjAltId);
            var project = _armsProjectRepository.GetArmsProjectByProjAltId(projAltId);
            var projectAbstract = _mapper.Map<DTOs.ProjectAbstract>(project);
            return Ok(projectAbstract);

        }


        [HttpPatch]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.projectabstractforupdate+json" })]
        public IActionResult UpdateProjectAbstractByAltId([FromBody] DTOs.ProjectAbstract abstractForUpdate)
        {

            log.Info("UpdateProjectAbstractByAltId");
            if (abstractForUpdate == null)
            {
                return BadRequest();
            }

            int projAltID = abstractForUpdate.ProjectAltId;
            /* getting the object from entity framework */
            var projectFromRepo = _armsProjectRepository.GetArmsProjectByProjAltId(projAltID);

            if (projectFromRepo == null)
            {
                return BadRequest();
            }

            abstractForUpdate.UserId = "Manoj"; //Todo: Replace with Session variable

            //? Comment getting the modified object by mapping the objects 
            var projectAbstractToUpdate = _mapper.Map(abstractForUpdate, projectFromRepo);
            //* Updating the project abstract 
            _armsProjectRepository.UpdateArmsProject(projectAbstractToUpdate);
            var prjAbstractDto = _mapper.Map<DTOs.ProjectCurrentSummary>(projectAbstractToUpdate);

            return Ok(prjAbstractDto); //?Returning back the abstract for updating the state.                             

        }

        [HttpGet("{pid}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.getWarehousDetailById+json" })]
        public async Task<IActionResult> GetWarehousDetailById(int pId)
        {
            using SqlConnection connection = new SqlConnection(_configuration["ConnectionStrings:WarehouseConnection"]);
            var sqlString = @"select distinct PF.PID_NBR,FAN_NUM,EA.AGREEMENT_NBR, PPS.STATE_JOB_NUM from PAS_FAN as PF
                                inner join  ELLIS_AGREEMENTS EA
                                on PF.PID_NBR=EA.PID_NBR
                                inner Join PAS_PID_SJN PPS
                                on PF.PID_NBR = PPS.PID_NBR
                                where PF.PID_NBR=" + pId;
            using SqlCommand command = new SqlCommand(sqlString, connection);
            try
            {
                command.CommandType = CommandType.Text;
                command.Connection.Open();
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                log.Error(e.Message);
                throw;
            }

            await using SqlDataReader rdr = command.ExecuteReader();
            var warehouseData = new WarehouseInfo();
            while (rdr.Read())
            {
                warehouseData.AgreementNumber = Convert.ToString(rdr["AGREEMENT_NBR"]);
                warehouseData.FanNumber = Convert.ToString(rdr["FAN_NUM"]);
                warehouseData.PidNumber = Convert.ToInt32(rdr["PID_NBR"]);
                warehouseData.StateJobNumber = Convert.ToString(rdr["STATE_JOB_NUM"]);
            }
            return Ok(warehouseData);
        }

       [HttpGet("{validationField}/{value?}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.validateValues" })]
        public IActionResult ValidateValues(string validationField, string value=null)
        {
            bool validatedValue = false;

            if (value == null || validationField == null)
            {
                return Ok(validatedValue);
            }
            if (validationField == "PID")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectByPid(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }
            }
            if (validationField == "RFP")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectByrfpNbr(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }
            }
            if (validationField == "SJN")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectBySjn(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }

            }
            if (validationField == "IdeaNumber")
            {

                var armsProject = _armsProjectRepository.GetArmsProjectByIdeaNum(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }

            }
            if (validationField == "SolicitationNumber")
            {

            }

            if (validationField == "AgreementNumber")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectByAgreeNbr(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }

            }

            if (validationField == "FAN")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectByFan(value);
                if (armsProject != null)
                {
                   validatedValue = true;
                }
            }
            if (validationField == "TPF")
            {
                var armsProject = _armsProjectRepository.GetArmsProjectByTPFNbr(value);
                if (armsProject != null)
                {
                    validatedValue = true;
                }
            }

            return Ok(validatedValue);
        }
    }
}
