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
    public class ArmsGenericLookupListController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        public ArmsGenericLookupListController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            log.Info("ArmsGenericLookupListController Constructor");
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet(Name = "GetAgencyCategories")]
        [Route("GetAgencyCategories")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.agencycategoriesfordd+json" })]
        public async Task<IActionResult> GetAgencyCategories()
        {
            log.Info("GetAgencyCategories");
            return Ok(await _armsDataRepository.GetAgencyCategory());

        }

        [HttpGet(Name = "GetContactRoles")]
        [Route("GetContactRoles")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contactrolesfordd+json" })]
        public async Task<IActionResult> GetContactRoles()
        {
            return Ok(await _armsDataRepository.GetContactRoles());
        }


        [HttpGet(Name = "GetContactNames")]
        [Route("GetContactNames")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contactnamesfordd+json" })]

        public async Task<IActionResult> GetContactNames()
        {
            return Ok(await _armsDataRepository.GetContactNames());
        }

        [HttpGet(Name = "GetDeliveryTypes")]
        [Route("GetDeliveryTypes")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.deliverytypefordd+json" })]
        public async Task<IActionResult> GetDeliveryType()
        {
            return Ok(await _armsDataRepository.GetDeliveryType());
        }

        [HttpGet(Name = "GetDeliveryType")]
        [Route("GetDeliveryType/{DeliveryTypeId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.deliverytype+json" })]
        public async Task<IActionResult> GetDeliverableType(int DeliveryTypeId)
        {
            var DeliverableTypeFromRepo = await _armsDataRepository.GetDeliveryType();

            if (DeliverableTypeFromRepo == null)
            {
                return BadRequest();
            }
            var DeliverableType = _mapper.Map<DTOs.DeliverableTypeForDD>(DeliverableTypeFromRepo);

            return Ok(DeliverableType);
        }

        [HttpGet(Name = "GetDeliveryStatus")]
        [Route("GetDeliveryStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.deliverystatusfordd+json" })]
        public async Task<IActionResult> GetDeliveryStatus()
        {
            return Ok(await _armsDataRepository.GetDeliveryStatus());
        }

        [HttpGet(Name = "GetFundingSource")]//retest
        [Route("GetFundingSource")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingsourcefordd+json" })]
        public async Task<IActionResult> GetFundingSource()
        {
            return Ok(await _armsDataRepository.GetFundingSource());
        }

        [HttpGet(Name = "GetFundingType")]//retest
        [Route("GetFundingType")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingtypefordd+json" })]
        public async Task<IActionResult> GetFundingType()
        {
            return Ok(await _armsDataRepository.GetFundingType());
        }

        [HttpGet(Name = "GetBudgetCategory")]
        [Route("GetBudgetCategory")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.budgetcategoryfordd+json" })]
        public async Task<IActionResult> GetBudgetCategory()
        {
            return Ok(await _armsDataRepository.GetBudgetCategory());
        }

        [HttpGet(Name = "GetFundingStatus")]
        [Route("GetFundingStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.fundingstatusfordd+json" })]
        public async Task<IActionResult> GetFundingStatus()
        {
            return Ok(await _armsDataRepository.GetFundingStatus());
        }

        [HttpGet(Name = "GetImplementationStatus")]
        [Route("GetImplementationStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.implementationstatusfordd+json" })]
        public async Task<IActionResult> GetImplementationStatus()
        {
            return Ok(await _armsDataRepository.GetImplementationStatus());
        }

        [HttpGet(Name = "GetMeetingTypes")]
        [Route("GetMeetingTypes")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.meetingtypesfordd+json" })]
        public async Task<IActionResult> GetMeetingTypes()
        {
            return Ok(await _armsDataRepository.GetMeetingTypes());
        }

        [HttpGet(Name = "GetModificationStatus")]
        [Route("GetModificationStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.modificationstatusfordd+json" })]
        public async Task<IActionResult> GetModificationStatus()
        {
            return Ok(await _armsDataRepository.GetModificationStatus());
        }

        [HttpGet(Name = "GetProjectClassifications")]
        [Route("GetProjectClassifications")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectclassificationfordd+json" })]
        public async Task<IActionResult> GetProjectClassifications()
        {
            return Ok(await _armsDataRepository.GetProjectClassifications());
        }

        [HttpGet(Name = "GetProjectTypes")]
        [Route("GetProjectTypes")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projecttypesfordd+json" })]
        public async Task<IActionResult> GetProjectTypes()
        {
            return Ok(await _armsDataRepository.GetProjectTypes());
        }

        [HttpGet(Name = "GetProjectStatuses")]
        [Route("GetProjectStatuses")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.projectstatusesfordd+json" })]
        public async Task<IActionResult> GetProjectStatuses()
        {
            return Ok(await _armsDataRepository.GetProjectStatuses());
        }

        [HttpGet(Name = "GetPooledFundingStatus")]
        [Route("GetPooledFundingStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.pooledfundingstatusfordd+json" })]
        public async Task<IActionResult> GetPooledFundingStatus()
        {
            return Ok(await _armsDataRepository.GetPooledFundingStatus());
        }

        [HttpGet(Name = "GetPrimaryEvents")]
        [Route("GetPrimaryEvents")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.primaryeventsfordd+json" })]
        public async Task<IActionResult> GetPrimaryEvents()
        {
            return Ok(await _armsDataRepository.GetPrimaryEvents());
        }

        [HttpGet(Name = "GetSecondaryEvents")]
        [Route("GetSecondaryEvents")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.secondaryeventsfordd+json" })]
        public async Task<IActionResult> GetSecondaryEvents()
        {
            return Ok(await _armsDataRepository.GetSecondaryEvents());
        }

        [HttpGet(Name = "GetPhaseStatus")]
        [Route("GetPhaseStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.GetPhaseStatusfordd+json" })]
        public async Task<IActionResult> GetPhaseStatus()
        {
            return Ok(await _armsDataRepository.GetPhaseStatus());
        }

        [HttpGet(Name = "GetCBCategory")]
        [Route("GetCBCategory")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.cbcategoryfordd+json" })]
        public async Task<IActionResult> GetCBCategory()
        {
            return Ok(await _armsDataRepository.GetCBCategory());
        }

        // This Fails
        [HttpGet(Name = "GetCBTypes")]
        [Route("GetCBTypes")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.cbtypesfordd+json" })]
        public async Task<IActionResult> GetCBTypes()
        {
            return Ok(await _armsDataRepository.GetCBTypes());
        }

        [HttpGet(Name = "GetCBStatus")]
        [Route("GetCBStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.cbstatusfordd+json" })]
        public async Task<IActionResult> GetCBStatus()
        {
            return Ok(await _armsDataRepository.GetCBStatus());
        }
    }
}