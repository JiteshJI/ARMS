using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities.Extensions;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferenceDataController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        public ReferenceDataController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet("{specListId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.referencesfordd+json" })]
        public async Task<IActionResult> getRefById(int specListId)
        {
            
            var rsltRefLst = await _armsDataRepository.GetListByIdAsync(specListId);

            if (rsltRefLst == null)
            {
                return BadRequest();
            }


            return Ok(rsltRefLst);
        }

        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.primaryeventsfordd+json" })]
        public async Task<IActionResult> GetPrimaryEvents()
        {
            return Ok(await _armsDataRepository.GetPrimaryEvents());
        }

        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.secondaryeventsfordd+json" })]
        public async Task<IActionResult> GetSecondaryEvents()
        {
            return Ok(await _armsDataRepository.GetSecondaryEvents());
        }

        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.eventstatusesfordd+json" })]
        public IActionResult GetEventStatuses()
        {
            var values = Enum.GetValues(typeof(EventStatusEnum)).Cast<EventStatusEnum>().Select(e => new LookupItem { Value = e.GetCode(), Text = e.GetCodeDescription() }).ToList();
            return Ok(values);
        }

        [HttpGet]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.phasestatusesfordd+json" })]
        public async Task<IActionResult> GetPhaseStatuses()
        {
            return Ok(await _armsDataRepository.GetPhaseStatus());
        }

    }
}
