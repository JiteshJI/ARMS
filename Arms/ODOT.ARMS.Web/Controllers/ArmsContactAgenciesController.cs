using System;
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

    public class ArmsContactAgenciesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IContactAgencyRepository _contactAgencyRepository;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ArmsContactAgenciesController(IMapper mapper, IContactAgencyRepository contactAgencyRepository)
        {
            _mapper = mapper;
            _contactAgencyRepository = contactAgencyRepository;
        }


        // GET: api/ArmsContactAgencies/GetArmsContactAgencybyContactId/5
        [HttpGet]
        [Route("GetArmsContactAgencybyContactId")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contactagencyfordd+json" })]
        public async Task<IActionResult> GetArmsContactAgencybyContactId(string ContactId)
        {
            Console.Write("retrieving contacts");
            var guidContactId = Guid.Parse(ContactId);
            var ContactAgencyByContactIdFromRepo = await _contactAgencyRepository.GetContactAgencyByContactAsync(guidContactId);

            if (ContactAgencyByContactIdFromRepo == null)
            {
                return NotFound();
            }

            var ContactAgencyDetails = _mapper.Map<IEnumerable<DTOs.ContactAgencyForDD>>(ContactAgencyByContactIdFromRepo);

            foreach (var item in ContactAgencyDetails)
            {
                item.AgencyName = GetAgencyName(item.AgencyID);
            }

            return Ok(ContactAgencyDetails);
        }

        [HttpPatch]
        [Route("UpdateContactAgency")]
        [RequestHeaderMatchesMediaType ("Content-Type", new[] {"application/vnd.dot.arms.contactagencyforupdate+json"})]

        public async Task<IActionResult>UpdateContactAgency([FromBody] DTOs.ContactAgencyForUpdate contactAgencyForUpdate)
        {          
            log.Info("UpdateContactAgency");
            if(contactAgencyForUpdate==null)
            {
                return BadRequest();
            }

            var ContactAgencyFromRepo = await _contactAgencyRepository.GetContactAgencyIdByIdAsync(contactAgencyForUpdate.ContactAgencyId);

            if(ContactAgencyFromRepo==null)
            {
                return BadRequest();
            }

            contactAgencyForUpdate.UserId = "Manoj";

            /* work on getting the update done */
            Entities.ArmsContactAgency contactAgencytoUpdate = _mapper.Map(contactAgencyForUpdate, ContactAgencyFromRepo);

            /* Update the contact Agency information for the contact */
            _contactAgencyRepository.UpdateContactAgency(contactAgencytoUpdate);

            var ContactAgency = _mapper.Map<DTOs.ContactAgencyForDD>(contactAgencyForUpdate);

            ContactAgency.AgencyName= GetAgencyName(ContactAgency.AgencyID);    
            
            return Ok(ContactAgency);
        }

        [HttpPost]
        [Route("AddNewContactAgency")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.contactagencyforcreate+json" })]

        public async Task<IActionResult> AddNewContactAgency([FromBody] DTOs.ContactAgencyForCreate contactAgencyForCreate)
        {
            log.Info("Create ContactAgency");
            if (contactAgencyForCreate == null)
            {
                return BadRequest();
            }
            contactAgencyForCreate.UserId = "Manoj";

            /* work on getting the insert done */
            Entities.ArmsContactAgency contactAgencytoCreate = _mapper.Map<Entities.ArmsContactAgency>(contactAgencyForCreate);

            /* insert the contact Agency information for the contact */
            await _contactAgencyRepository.AddContactAgencyAsync(contactAgencytoCreate);

            var ContactAgency = _mapper.Map<DTOs.ContactAgencyForDD>(contactAgencyForCreate);

            ContactAgency.AgencyName = GetAgencyName(ContactAgency.AgencyID);

            return Ok(contactAgencyForCreate);
        }


        [HttpPatch]
        [Route("InactivateContactAgency")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.contactagencyforupdate+json" })]

        public async Task<IActionResult> InactivateContactAgency([FromBody] DTOs.ContactAgencyForUpdate contactAgencyForUpdate)
        {
            log.Info("InactivateContactAgency");
            if (contactAgencyForUpdate == null)
            {
                return BadRequest();
            }

            var ContactAgencyFromRepo = await _contactAgencyRepository.GetContactAgencyIdByIdAsync(contactAgencyForUpdate.ContactAgencyId);

            if (ContactAgencyFromRepo == null)
            {
                return BadRequest();
            }

            contactAgencyForUpdate.UserId = "Manoj";

            /* work on getting the update done */
            Entities.ArmsContactAgency contactAgencytoUpdate = _mapper.Map(contactAgencyForUpdate, ContactAgencyFromRepo);

            /* Update the contact Agency information for the contact */
            _contactAgencyRepository.UpdateContactAgency(contactAgencytoUpdate);

            var ContactAgency = _mapper.Map<DTOs.ContactAgencyForDD>(contactAgencyForUpdate);

            ContactAgency.AgencyName = GetAgencyName(ContactAgency.AgencyID);

            return Ok(ContactAgency);
        }


        private string GetAgencyName(int AgencyId)
        {
            return _contactAgencyRepository.getAgencyName(AgencyId);
        }
    }
}
