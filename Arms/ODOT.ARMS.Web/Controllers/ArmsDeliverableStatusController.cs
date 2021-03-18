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
    
    public class ArmsDeliverableStatusController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;



        public ArmsDeliverableStatusController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet (Name ="GetDeliverableStatuses")]
        [Route("GetAllDeliverableStatus")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.deliverystatusfordd+json" })]
        public async Task<IActionResult> GetAllDeliverableStatuses()
        {
            var DeliverableStatusesFromRepo = await _armsDataRepository.GetAllDeliverableStatusAsync();
            var DeliverableStatuses = _mapper.Map<IEnumerable<DTOs.DeliverableStatusForDD>>(DeliverableStatusesFromRepo);
            return Ok(DeliverableStatuses);

        }

        [HttpGet (Name ="GetDeliverableStatus")]
        [Route("GetDeliverableStatus/{DeliverableStatusId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.deliverystatus+json" })]
        public async Task<IActionResult> GetDeliverableStatus(int DeliverableStatusId)
        {
            var DeliverableStatusFromRepo = await _armsDataRepository.GetDeliverableStatusIdAsync(DeliverableStatusId);
            if(DeliverableStatusFromRepo==null)
            {
                return BadRequest();
            }

            var deliverableStatus = _mapper.Map<DTOs.DeliverableStatusForDD>(DeliverableStatusFromRepo);

            return Ok(deliverableStatus);

        }
    }
}