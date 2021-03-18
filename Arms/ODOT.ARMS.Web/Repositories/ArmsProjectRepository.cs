using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsProjectRepository : IArmsProjectRepository
    {
        private ARMSContext _currentContext { get; set; }
        private IMemoryCache _cache;

        public ArmsProjectRepository(ARMSContext context, IMemoryCache memoryCache)
        {
            this._currentContext = context;
            _cache = memoryCache;
        }

        /*
        public async Task<ArmsProject> AddArmsProjectAsync(ArmsProject armsProject)
        {
            await _currentContext.ArmsProject.AddAsync(armsProject);

            //  _currentContext.Attach(armsProject);
            //  _currentContext.Entry(armsProject).State = EntityState.Added;
            _currentContext.SaveChanges();
            return armsProject;
        }

        */

        public ArmsProjectType AddArmsProjectTypes(ArmsProjectType armsProjectType)
        {
            _currentContext.ArmsProjectType.Add(armsProjectType);
            _currentContext.SaveChanges();
            return armsProjectType;
        }

        /* Update ARMS Project Types Calls */

        public void AddPrjTypeAsync(ProjectInfo projectInfo, Guid ProjId)
        {
            foreach (var projectType in projectInfo.ProjectTypeList)
            {
                ArmsProjectType projType = new ArmsProjectType { ProjectTypeId = projectType.ProjectTypeId, ProjectId = ProjId, UserId = "Manoj" };
                AddArmsProjectTypes(projType);
            }
        }

        public void UpdatePrjTypeAsync(ProjectInfo projectInfo, Guid ProjId)
        {
            var projectTypeList = GetArmsProjectTypesByIdAsync(ProjId);
            var modifiedProjectTypeList = projectInfo.ProjectTypeList;

            var addProjectTypes =
                                from projectTypes in modifiedProjectTypeList
                                where !projectTypeList.Any(x => x.ProjectTypeId == projectTypes.ProjectTypeId)
                                select projectTypes;

            var deletedProjectTypes =
                                     from projecttypes in projectTypeList
                                     where !modifiedProjectTypeList.Any(x => x.ProjectTypeId == projecttypes.ProjectTypeId)
                                     select projecttypes;


            var LambdaaddProjectTypes = modifiedProjectTypeList.Where(x => !projectTypeList.Any(y => x.ProjectTypeId == y.ProjectTypeId));
            var LambdadelProjectTypes = projectTypeList.Where(x => !modifiedProjectTypeList.Any(y => x.ProjectTypeId == y.ProjectTypeId));

            foreach (var delprojectType in deletedProjectTypes)
            {
                ArmsProjectType projType = new ArmsProjectType { ProjectTypeId = delprojectType.ProjectTypeId, ProjectId = ProjId, UserId = "Manoj" };
                DeleteProjectType(projType);
            }

            foreach (var addprojectType in addProjectTypes)
            {
                ArmsProjectType projType = new ArmsProjectType { ProjectTypeId = addprojectType.ProjectTypeId, ProjectId = ProjId, UserId = "Manoj" };
                AddArmsProjectTypes(projType);
            }

        }


        /** End of Arms Project Types */

        public void DeleteProjectType(ArmsProjectType projType)
        {
            var result = _currentContext.ArmsProjectType.Where(x => x.ProjectId == projType.ProjectId && x.ProjectTypeId == projType.ProjectTypeId);
            foreach (var prjtype in result)
            {
                _currentContext.ArmsProjectType.Remove(prjtype);

            }
            _currentContext.SaveChanges();
        }

        public void DeleteArmsProjectType(Guid projId)
        {
            var result = _currentContext.ArmsProjectType.Where(e => e.ProjectId == projId);

            foreach (var item in result)
            {
                _currentContext.ArmsProjectType.Remove(item);
                _currentContext.Attach(item);
                _currentContext.Entry(item).State = EntityState.Deleted;
            }

        }

        public ArmsProject UpdateArmsProject(ArmsProject armsProject)
        {
            _currentContext.ArmsProject.Update(armsProject);
            _currentContext.Attach(armsProject);
            _currentContext.Entry(armsProject).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _currentContext.SaveChanges();
            return armsProject;
        }

        /******************** Add and Update Projects Async calls */

        public async Task<ArmsProject> AddArmsProjectAsync(ArmsProject armsProject)
        {
            await _currentContext.ArmsProject.AddAsync(armsProject);
            await _currentContext.SaveChangesAsync();
            return armsProject;
        }

        public async Task<ArmsProject> UpdateArmsProjectAsync(ArmsProject armsProject)
        {
            _currentContext.ArmsProject.Update(armsProject);
            await _currentContext.SaveChangesAsync();
            return armsProject;
        }

        public async Task<List<ArmsProject>> GetAllArmsProjectAsync()
        {
            return await _currentContext.ArmsProject.ToListAsync();
        }


        // Task<List<SearchProject>> GetAllSearchProjectAsync();
        public async Task<List<SearchProject>> GetAllSearchProjectsAsync()
        {
            return await _currentContext.ArmsProjectSearch.FromSqlRaw(@"
                SELECT 
	                P.PROJ_ALT_ID AS ProjectAltId,
	                P.PROJ_ID AS ProjId,
	                MAX(P.RFP_NUM) AS RfpNum,
	                MAX(P.PID_NUM) AS PidNum,
	                MAX(A.AGENCY_NAME_TXT) AS AgencyName,
	                STUFF(
		                (
			                SELECT N', ' + C_PM.FIRST_NME + ' ' + C_PM.LAST_NME 
			                FROM 
				                ARMS_PERSONNEL PRSL 
				                INNER JOIN ARMS_CONTACT C_PM ON C_PM.CONTACT_ID = PRSL.CONTACT_ID
			                WHERE PRSL.PROJ_ID = P.PROJ_ID AND PRSL.ROLE_ID = 119
			                ORDER BY C_PM.LAST_NME
			                FOR XML PATH(N'')), 1, 2, N''
	                ) AS Pm,
	                MAX(CNTCT.FIRST_NME + ' ' + CNTCT.LAST_NME) AS Pi,
	                MAX(P.PROJECT_CLASSIFICATION_ID) AS ProjectClassificationId,
	                MAX(AC.Administration_Category_Text) AS ProjectType,
	                MAX(P.PROJECT_TITLE_TXT) AS ProjectTitleTxt,
	                MAX(P.PROJECT_STATUS_ID) AS ProjectStatusId,
	                MAX(ADCA.Administration_Category_Text) AS ProjectStatusTxt,
	                MAX(P.USER_ID) AS UserId
                FROM 
	                ARMS_PROJECT P
	                LEFT OUTER JOIN ARMS_AGENCY A ON A.AGENCY_ID = P.AGENCY_ID
	                INNER JOIN ARMS_ADMINISTRATION_CATEGORY AC ON AC.Administration_Category_ID = P.PROJECT_CLASSIFICATION_ID
	                LEFT OUTER JOIN ARMS_ADMINISTRATION_CATEGORY ADCA ON ADCA.Administration_Category_ID = P.PROJECT_STATUS_ID
	                LEFT OUTER JOIN ARMS_PERSONNEL PRSL ON PRSL.PROJ_ID = P.PROJ_ID AND PRSL.ROLE_ID = 115  
	                LEFT OUTER JOIN ARMS_CONTACT CNTCT ON CNTCT.CONTACT_ID = PRSL.CONTACT_ID
                GROUP BY P.PROJ_ALT_ID, P.PROJ_ID").ToListAsync();
        }
        public ArmsProject GetArmsArmsProjectId(Guid projId)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.ProjId == projId);
        }
        public ArmsProject GetArmsProjectByProjAltId(int projAltId)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.ProjectAltId == projAltId);
        }

        public async Task<List<ArmsProjectType>> GetArmsProjectTypesAsync()
        {
            return await _currentContext.ArmsProjectType.ToListAsync();
        }
        public List<ArmsProjectType> GetArmsProjectTypesByIdAsync(Guid projId)
        {

            return _currentContext.ArmsProjectType.Where(e => e.ProjectId == projId).ToList();  /* brings back all the projectTypes in a list array */
        }

        public async Task<ArmsProjectType> AddArmsProjectType(ArmsProjectType armsProjectType)
        {
            await _currentContext.ArmsProjectType.AddAsync(armsProjectType);
            _currentContext.Attach(armsProjectType);
            _currentContext.Entry(armsProjectType).State = EntityState.Added;
            return armsProjectType;
        }

        public ArmsProject GetArmsProjectByrfpNbr(string rfpNumber)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.RfpNum == rfpNumber);
        }
        ArmsProject IArmsProjectRepository.GetArmsProjectBySjn(string sjn)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.StateJobNum == sjn);
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectByPid(string pid)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.PidNum == pid);
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectByIdeaNum(string ideaNum)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.IdeaNum == ideaNum);
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectBySolNbr(string solNumber)
        {
            throw new NotImplementedException();
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectByAgreeNbr(string agreeNumber)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.AgreementNum == agreeNumber);
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectByFan(string Fan)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.FedAuthNum == Fan);
        }

        ArmsProject IArmsProjectRepository.GetArmsProjectByTPFNbr(string tpfNumber)
        {
            return _currentContext.ArmsProject.FirstOrDefault(e => e.TpfNum == tpfNumber);
        }

    }

}
