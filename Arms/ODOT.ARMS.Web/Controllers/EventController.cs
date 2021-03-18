using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IMapper _mapper;
        private readonly IArmsEventRepository _armsEventRepository;
        private readonly IArmsEventUploadRepository _fileUploads;

        public EventController(IMapper mapper, IArmsEventRepository armsEventRepository, IArmsEventUploadRepository fileUploads)
        {
            _mapper = mapper;
            _armsEventRepository = armsEventRepository;
            _fileUploads = fileUploads;
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.eventsforproject+json" })]
        public async Task<IActionResult> GetArmsEventListByProjectId(Guid projectId)
        {
            List<Event> returnEvents = new List<Event>();
            var resultEvent = await _armsEventRepository.GetAllArmsEventAsyncByProjectId(projectId);

            if (resultEvent == null)
            {
                return BadRequest();
            }
            returnEvents = await GetEventsAsync(projectId);

            return Ok(returnEvents);
        }
        
        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.eventsforcreate+json" })]
        public async Task<IActionResult> AddEvent([FromBody] DTOs.EventForAdd eventForCreate)
        {
            _ = new List<Event>();
            if (eventForCreate.contactIdList?.Count > 0)
            {
                foreach (var item in eventForCreate.contactIdList)
                {
                    Entities.Event evnt;
                    try
                    {
                        eventForCreate.UserId = "preicher";
                        eventForCreate.ContactId = item.ContactId;
                        evnt = _mapper.Map<Entities.Event>(eventForCreate);
                        await _armsEventRepository.AddArmsEventAsync(evnt);
                    }

                    catch (Exception ex)
                    {
                        Log.Error(ex.Message);
                        return StatusCode(500);
                    }
                }
            }
            else
            {
                Entities.Event evntOne;
                try
                {
                    eventForCreate.UserId = "preicher";
                    evntOne = _mapper.Map<Entities.Event>(eventForCreate);
                    await _armsEventRepository.AddArmsEventAsync(evntOne);
                }
                catch (Exception ex)
                {
                    Log.Error(ex.Message);
                    return StatusCode(500);
                }
            }
            List<Event> returnEvents = await GetEventsAsync(eventForCreate.ProjectId);
            return Ok(returnEvents);
        }

        [HttpPatch("{eventId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.eventsforupdate+json" })]
        public async Task<IActionResult> UpdateEvent(Guid eventId, [FromBody] DTOs.Event eventForUpdate)
        {
            var eventFromRepo = await _armsEventRepository.GetArmsEventIdAsync(eventId);

            if (eventFromRepo == null)
            {
                return BadRequest();
            }

            eventForUpdate.UserId = "preicher";
            _armsEventRepository.UpdateArmsEventType(_mapper.Map(eventForUpdate, eventFromRepo));
            var EvtCopy = _mapper.Map<DTOs.Event>(eventFromRepo);
            EvtCopy.DocCnt = await _fileUploads.GetUploadCountBySrcIdAsync(eventForUpdate.EventId ?? Guid.Empty);
            return Ok(EvtCopy);
        }
        
        private async Task<List<Event>> GetEventsAsync(Guid projectId)
        {
            List<Event> returnEvents = new List<Event>();
            var resultEvent = await _armsEventRepository.GetAllArmsEventAsyncByProjectId(projectId);

            if (resultEvent == null)
            {
                return returnEvents;
            }
            returnEvents = _mapper.Map<List<DTOs.Event>>(resultEvent);
            var fileCnts = await _armsEventRepository.GetUploadFileCountsAsync(projectId);
            foreach (var item in returnEvents)
            {
                item.DocCnt = 0;//"0 Docs";//default value
                var fileSrcCnt = fileCnts.Find(x => x.Src == item.EventId);
                if (fileSrcCnt != null)
                {
                    item.DocCnt = fileSrcCnt.FileCount;//String.Format("{0} Docs", fileSrcCnt.FileCount);
                }
            }
            return returnEvents;
        }
    }
}
