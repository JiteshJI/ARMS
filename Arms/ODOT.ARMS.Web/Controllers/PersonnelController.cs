using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonnelController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IArmsPersonnelRepository _personnelRepository;
        private readonly IContactAgencyRepository _contactAgencyRepository;
        private readonly IContactsRepository _contactsRepository;
        private readonly IARMSDataRepository _armsDataRepository;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public PersonnelController(IMapper mapper, IArmsPersonnelRepository personnelRepository, IContactAgencyRepository contactAgencyRepository, IContactsRepository contactsRepository, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _personnelRepository = personnelRepository;
            _contactAgencyRepository = contactAgencyRepository;
            _contactsRepository = contactsRepository;
            _armsDataRepository = armsDataRepository;
        }

        [HttpGet]
        [Route("GetPersonnel")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.personnelfordd+json" })]
        public async Task<IActionResult> GetPersonnel()
        {
            log.Info("GetPersonnel");
            var PersonnelfromRepo = await _personnelRepository.GetAllPersonnelAsync();
            var allPersonnel = _mapper.Map<IEnumerable<DTOs.Personnel>>(PersonnelfromRepo);
            return Ok(allPersonnel);
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.personnelById+json" })]
        public async Task<IActionResult> GetPersonnelbyProjectId(string projectId)
        {
            Console.Write("retrieving personnel by projectID");
            var guidPrjId = Guid.Parse(projectId);
            var PersonnelByIDFromRepo = await _personnelRepository.GetPersonnelByProjIdAsync(guidPrjId);
            if (PersonnelByIDFromRepo == null)
            {
                return BadRequest();
            }
            var personnelIdDetails = _mapper.Map<IEnumerable<DTOs.PersonnelForDisplay>>(PersonnelByIDFromRepo);


            /* *****refactored the below code to use LinQ Select instead of foreach loop *** 
            
            var displayPersonnel = new List<DTOs.Personnel>();
            foreach(var personnelDetail in personnelIdDetails)
            {
                displayPersonnel.Add(GetArmsPersonnelDisplayValues(personnelDetail).Result);
            }
            Console.Write(displayPersonnel);
            */

            var displayPersonnnelDetails = personnelIdDetails.Select(personnel => GetArmsPersonnelDisplayValues(personnel).Result);
            return Ok(displayPersonnnelDetails);
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.personnelforcreate+json" })]
        public async Task<IActionResult> AddNewPersonnel([FromBody] DTOs.PersonnelForDisplay personnelforCreate)
        {
            log.Info("AddNewPersonnel");
            if (personnelforCreate == null)
            {
                return BadRequest();
            }
            personnelforCreate.UserId = "Manoj";
            var personnelNew = _mapper.Map<ArmsPersonnel>(personnelforCreate);
            var personnel = await _personnelRepository.AddPersonnelAsync(personnelNew);
            var PersonnelByIDFromRepo = await _personnelRepository.GetPersonnelByIdAsync(personnel.PersonnelId);
            var personnelIdDetails = _mapper.Map<DTOs.PersonnelForDisplay>(PersonnelByIDFromRepo);
            return Ok(GetArmsPersonnelDisplayValues(personnelIdDetails).Result);

        }

        [HttpPatch]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.personnelforupdate+json" })]
        public async Task<IActionResult> UpdatePersonnel([FromBody] DTOs.PersonnelForDisplay personnelForUpdate)
        {
            log.Info("UpdatePersonnel");
            var guidPersonnelID = Guid.Parse(personnelForUpdate.PersonnelId.ToString());
            var PersonnelFromRepo = await _personnelRepository.GetPersonnelByIdAsync(guidPersonnelID);
            if (PersonnelFromRepo == null)
            {
                return BadRequest();
            }
            personnelForUpdate.UserId = "Manoj";
            ArmsPersonnel personnelToUpdate = _mapper.Map(personnelForUpdate, PersonnelFromRepo);
            _personnelRepository.UpdatePersonnel(personnelToUpdate);
            var PersonnelByIDFromRepo = await _personnelRepository.GetPersonnelByIdAsync(personnelToUpdate.PersonnelId);
            var personnelIdDetails = _mapper.Map<DTOs.PersonnelForDisplay>(PersonnelByIDFromRepo);
            return Ok(GetArmsPersonnelDisplayValues(personnelIdDetails).Result);
        }
        public async Task<DTOs.PersonnelForDisplay> GetArmsPersonnelDisplayValues(DTOs.PersonnelForDisplay personnelIdDetails)
        {
            var ContactByIdFromRepo = await _contactsRepository.GetContactsIdAsync(personnelIdDetails.ContactId);
            personnelIdDetails.ContactName = ContactByIdFromRepo.FirstName + " " + ContactByIdFromRepo.LastName;
            personnelIdDetails.EmailAddress = ContactByIdFromRepo.EmailAddress;

            var agencyCategoryFromRepo = await _armsDataRepository.GetAdministrationCategoryTypeIdAsync(personnelIdDetails.RoleId);
            personnelIdDetails.ContactRole = agencyCategoryFromRepo.AdministrationCategoryText;

            var ContactAgencyByContactIdFromRepo = await _contactAgencyRepository.GetContactAgencyByContactAsync(personnelIdDetails.ContactId);
            foreach (var item in ContactAgencyByContactIdFromRepo)
            {
                personnelIdDetails.agencyName = _contactAgencyRepository.getAgencyName((item.AgencyID));
                personnelIdDetails.MobilePhone = item.MobilePhone;
            }
            return personnelIdDetails;
        }
    }
}
