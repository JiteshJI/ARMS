using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.DTOs;
using AutoMapper;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArmsAgencyController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;

        public ArmsAgencyController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet(Name = "GetArmsAgency")]
        [Route("GetArmsAgency")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsagencyfordd+json" })]
        public async Task<IActionResult> GetArmsAgency()
        {
            var agencyFromRepo = await _armsDataRepository.GetAllAgencyAsync();
            var allAgency = _mapper.Map<IEnumerable<DTOs.ArmsAgencyForDD>>(agencyFromRepo);
            foreach(var item in allAgency)
            {
                item.AgencyCatText = _armsDataRepository.getAgencyName(item.AgencyCatId);
            }
            
            return Ok(allAgency.OrderByDescending(l => l.AgencyId));
        }


        [HttpGet("{AgencyId}", Name = "GetAgencyById")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.agencyById+json" })]
        public async Task<IActionResult> GetAgencyById(int AgencyId)
        {
            var agencyByIdFromRepo = await _armsDataRepository.GetAgencyByIdAsync(AgencyId);
            if (agencyByIdFromRepo == null)
            {
                return BadRequest();
            }

            var agencyIdDetails = _mapper.Map<DTOs.ArmsAgencyForDD>(agencyByIdFromRepo);

            return Ok(agencyIdDetails);
        }

        [HttpPatch]
        [Route("UpdateAgency")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.agencyforupdate+json" })]
        public async Task<IActionResult> UpdateContact([FromBody] ArmsAgencyForUpdateDD agencyforupdate)
        {
            if (agencyforupdate == null)
            {
                return BadRequest();
            }

            var agencyByIdFromRepo = await _armsDataRepository.GetAgencyByIdAsync(agencyforupdate.AgencyId.Value);
            if (agencyByIdFromRepo == null)
            {
                return BadRequest();
            }

            agencyforupdate.ActiveInd = agencyforupdate.ActiveInd != "" && agencyforupdate.ActiveInd != null ? agencyforupdate.ActiveInd : "A";
            agencyforupdate.UserId = agencyforupdate.UserId != "" && agencyforupdate.UserId != null ? agencyforupdate.UserId : "1";
            agencyforupdate.EntryDt = DateTime.Now;

            var agencyToUpdate = _mapper.Map(agencyforupdate, agencyByIdFromRepo);
            var result = await _armsDataRepository.UpdateAgency(agencyToUpdate);

            //var agencyFromRepo = await _armsDataRepository.GetAllAgencyAsync();
            // var allAgency = _mapper.Map<IEnumerable<DTOs.ArmsAgencyForDD>>(agencyFromRepo);
            // Ok(allAgency.OrderByDescending(l => l.AgencyId));


            return Ok(_mapper.Map<DTOs.ArmsAgencyForDD>(agencyToUpdate));
        }

        [HttpPost]
        [Route("AddNewAgency")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.agencyforcreate+json" })]
        public IActionResult AddNewAgency([FromBody] ArmsAgencyForCreateDD agencyforcreate)
        {
            //log.Info("AddNewAgency");
            if (agencyforcreate == null)
            {
                return BadRequest();
            }
            agencyforcreate.EntryDt = DateTime.UtcNow;
            agencyforcreate.UserId = "Sai";
            var agency = _mapper.Map<Entities.ArmsAgency>(agencyforcreate);
            var result = _armsDataRepository.AddAgencyAsync(agency);

            var agencyByIdFromRepo = _armsDataRepository.GetAgencyById(result.Value);

            return Ok(_mapper.Map<Entities.ArmsAgency>(agencyByIdFromRepo));
        }

        [HttpPost]
        [Route("DeleteAgency")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.agencyfordelete+json" })]
        public string DeleteAgency([FromBody] ArmsAgencyForUpdateDD agencyforupdate)
        {
            var agency = _armsDataRepository.GetAgencyByIdAsync(agencyforupdate.AgencyId.Value);
            if (agency != null && agency.Result != null)
                _armsDataRepository.DeleteAgency(agency.Result);
            return "Record deleted successfully";
        }

    }
}