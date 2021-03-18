
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsProjectRepository
    {
        Task<List<ArmsProject>> GetAllArmsProjectAsync();

        Task<List<SearchProject>> GetAllSearchProjectsAsync();

        ArmsProject GetArmsArmsProjectId(Guid projId);

        ArmsProject GetArmsProjectByrfpNbr(string rfpNumber);

        ArmsProject GetArmsProjectBySjn(string sjn);

        ArmsProject GetArmsProjectByPid(string pid);

        ArmsProject GetArmsProjectByIdeaNum(string ideaNum);

        ArmsProject GetArmsProjectBySolNbr(string solNumber);

        ArmsProject GetArmsProjectByAgreeNbr(string agreeNumber);

        ArmsProject GetArmsProjectByFan(string Fan);

        ArmsProject GetArmsProjectByTPFNbr(string tpfNumber);

        ArmsProject GetArmsProjectByProjAltId(int projAltId);

        Task<ArmsProject> AddArmsProjectAsync(ArmsProject armsProject);

        ArmsProject UpdateArmsProject(ArmsProject armsProject);
        Task<ArmsProject> UpdateArmsProjectAsync(ArmsProject armsProject);

        Task<ArmsProjectType> AddArmsProjectType(ArmsProjectType armsProjectType);

        ArmsProjectType AddArmsProjectTypes(ArmsProjectType armsProjectType);

        Task<List<ArmsProjectType>> GetArmsProjectTypesAsync();

        List<ArmsProjectType> GetArmsProjectTypesByIdAsync(Guid projId);

        void DeleteArmsProjectType(Guid projId);
        void DeleteProjectType(ArmsProjectType projType);
        void AddPrjTypeAsync(ProjectInfo projectInfo, Guid projId);

        void UpdatePrjTypeAsync(ProjectInfo projectInfo, Guid ProjId);







    }
}
