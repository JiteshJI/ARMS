using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ArmsAdministrationCategoryController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;
        private readonly IArmsAdministrationCategory _armsAdministrationCategory;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ArmsAdministrationCategoryController(IMapper mapper, IARMSDataRepository armsDataRepository, IArmsAdministrationCategory administrationCategory)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
            _armsAdministrationCategory = administrationCategory;
        }

        [HttpGet(Name = "GetArmsAdministrationCategories")]
        [Route("GetArmsAdministrationCategories")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsadministrationcategoryforDD+json" })]
        public async Task<IActionResult> GetArmsAdministrationCategories()
        {
            log.Info("GetArmsAdministrationCategories");
            var agencyCategoryFromRepo = await _armsDataRepository.GetAllAdministrationCategoriesAsync();

            var agencyCategories = _mapper.Map<IEnumerable<DTOs.ArmsAdministrationCategoryForDD>>(agencyCategoryFromRepo);
            agencyCategories = agencyCategories.OrderBy(a => a.AdministrationCategoryText);
            return Ok(agencyCategories);
        }

        [HttpGet("{FundingSpecificListId}", Name = "GetArmsAdministrationCategoryBySpecificListId")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.administrationcategorybyspecificlistid+json" })]
        public async Task<IActionResult> GetArmsAdministrationCategoryBySpecificListId(int FundingSpecificListId)
        {
            log.Info("GetArmsAdministrationCategoryBySpecificListId");
            var agencyCategoryFromRepo = await _armsDataRepository.GetAllAdministrationCategoriesAsync();

            var agencyCategories = _mapper.Map<IEnumerable<DTOs.ArmsAdministrationCategoryForDD>>
                (agencyCategoryFromRepo.Where(a => a.SpecificListID == FundingSpecificListId));

            return Ok(agencyCategories);
        }

        //[HttpGet(Name = "GetArmsAdministrationCategory")]
        [HttpGet("{AdministrationCategoryId}", Name = "GetArmsAdministrationCategory")]
        //[Route("GetArmsAdministrationCategory/{FundingSpecificListId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.administrationcategory+json" })]
        public async Task<IActionResult> GetArmsAdministrationCategory(int AdministrationCategoryId)
        {
            log.Info("GetArmsAdministrationCategory");
            var agencyCategoryFromRepo = await _armsDataRepository.GetAdministrationCategoryTypeIdAsync(AdministrationCategoryId);
            if (agencyCategoryFromRepo == null)
            {
                return BadRequest();
            }

            var agencyCategory = _mapper.Map<DTOs.ArmsAdministrationCategoryForDD>(agencyCategoryFromRepo);

            return Ok(agencyCategory);
        }

        [HttpPatch]
        [Route("UpdateArmsAdministrationCategory")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.administrationCategoryforupdate+json" })]
        public async Task<IActionResult> UpdateArmsAdministrationCategory([FromBody] ArmsAdministrationCategoryForDD armsAdministrationCategory)
        {
            if (armsAdministrationCategory == null)
            {
                return BadRequest();
            }

            var agencyByIdFromRepo = await _armsDataRepository.GetAdministrationCategoryTypeIdAsync(armsAdministrationCategory.AdministrationCategoryID);
            if (agencyByIdFromRepo == null)
            {
                return BadRequest();
            }
            var agencyToUpdate = _mapper.Map(armsAdministrationCategory,agencyByIdFromRepo);
             _armsAdministrationCategory.UpdateArmsAdministrationCategory(agencyToUpdate);
            var result = _mapper.Map<DTOs.ArmsAdministrationCategoryForDD>(armsAdministrationCategory);
            return Ok(result);
        }

        [HttpPost]
        [Route("AddArmsAdministrationCategory")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.administrationCategoryforcreate+json" })]
        public async Task<IActionResult> AddArmsAdministrationCategory([FromBody] ArmsAdministrationCategoryForDD armsAdministrationCategory)
        {
            //log.Info("AddNewAgency");
            if (armsAdministrationCategory == null)
            {
                return BadRequest();
            }
            var armsAdministration = _mapper.Map<Entities.ArmsAdministrationCategory>(armsAdministrationCategory);
             await _armsAdministrationCategory.AddArmsAdministrationCategoryAsync(armsAdministration);
            var result = _mapper.Map<DTOs.ArmsAdministrationCategoryForDD>(armsAdministrationCategory);
            return Ok(_armsAdministrationCategory);
        }
    }
}
