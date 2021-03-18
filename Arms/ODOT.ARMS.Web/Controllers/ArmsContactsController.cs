
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArmsContactsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IContactsRepository _contactsRepository;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ArmsContactsController(IMapper mapper, IContactsRepository contactsRepository)
        {
            _mapper = mapper;
            _contactsRepository = contactsRepository;
        }

        [HttpGet(Name = "GetArmsContacts")]
        [Route("GetArmsContacts")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contactsfordd+json" })]
        public async Task<IActionResult> GetArmsContacts()
        {
            log.Info("GetArmsContacts");
            var ContactsFromRepo = await _contactsRepository.GetAllContactsAsync();
            var allContacts = _mapper.Map<IEnumerable<DTOs.ContactsForDD>>(ContactsFromRepo);
            return Ok(allContacts);
        }

        [HttpGet]
        [Route("GetContactById")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contacts+json" })]
        public async Task<IActionResult> GetContactById(string ContactId)
        {
             Console.Write("retrieving contact");
            log.Info("GetContactById");
            var guidContactId = Guid.Parse(ContactId);
            var ContactByIdFromRepo = await _contactsRepository.GetContactsIdAsync(guidContactId);
            if (ContactByIdFromRepo == null)
            {
                return BadRequest();
            }

            var contactIdDetails = _mapper.Map<DTOs.ContactsForDD>(ContactByIdFromRepo);

            return Ok(contactIdDetails);
        }


        [HttpPost]
        [Route("AddNewContact")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.contactsforcreate+json" })]
        public async Task<IActionResult> AddNewContact([FromBody] DTOs.ContactsForDD contactsForCreate)
        {
            log.Info("AddNewContact");
            if (contactsForCreate == null)
            {
                return BadRequest();
            }

            contactsForCreate.UserId = "Manoj";
            contactsForCreate.OrilBrdMbr = (contactsForCreate.OrilBrdMbr == "false") ? "N" : "Y";

            Entities.ArmsContacts contact = _mapper.Map<Entities.ArmsContacts>(contactsForCreate);

            await _contactsRepository.AddContactAsync(contact);

            return Ok(contactsForCreate);
        }

        [HttpPatch]
        [Route("UpdateContact")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.contactsforupdate+json" })]
        public async Task<IActionResult> UpdateContact([FromBody] DTOs.ContactsForUpdate contactsForUpdate)
        {

            var guidContactId = Guid.Parse(contactsForUpdate.ContactID);
            log.Info("UpdateContact");
            if (contactsForUpdate == null)
            {
                return BadRequest();
            }

            var ContactFromRepo = await _contactsRepository.GetContactsIdAsync(guidContactId);

            if (ContactFromRepo == null)
            {
                return BadRequest();
            }

            contactsForUpdate.UserId = "Manoj";
            if (contactsForUpdate.OrilBrdMbr != "N" || contactsForUpdate.OrilBrdMbr != "Y")
            {
                contactsForUpdate.OrilBrdMbr = (contactsForUpdate.OrilBrdMbr == "false") ? "N" : "Y";
            }

            /* work on getting the update done */
            Entities.ArmsContacts contactToUpdate = _mapper.Map(contactsForUpdate, ContactFromRepo);
            /* Update the contact information for the contact */

            _contactsRepository.UpdateContact(contactToUpdate);

            return Ok(_mapper.Map<DTOs.ContactsForDD>(contactToUpdate));
        }

    }
}

