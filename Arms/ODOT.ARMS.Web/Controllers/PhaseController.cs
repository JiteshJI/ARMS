using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhaseController : ControllerBase
    {

        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IMapper _mapper;
        private readonly IArmsPhase _armsPhase;

        public PhaseController(IMapper mapper, IArmsPhase armsPhaseRepository)
        {
            _mapper = mapper;
            _armsPhase = armsPhaseRepository;
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.phaseforcreate+json" })]
        public async Task<IActionResult> AddPhase([FromBody] DTOs.Phase phaseForCreate)
        {
            DTOs.Phase result;
            try
            {
                phaseForCreate.UserId = "sai";
                phaseForCreate.ActiveInd = "A";
                phaseForCreate.MergeInd = "I";  //default to "I".  Null is tougher to check 
                phaseForCreate.EntryDate = DateTime.Now;
                var phase = _mapper.Map<Entities.ArmsPhase>(phaseForCreate);
                result = _mapper.Map<DTOs.Phase>(await _armsPhase.AddArmsPhase(phase));
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }

            return Ok(result);
        }

        [HttpPatch("{phaseId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.phaseforupdate+json" })]

        public IActionResult UpdatePhase(Guid phaseId, [FromBody] DTOs.Phase phaseForUpdate)
        {
            var phaseFromRepo = _armsPhase.GetArmsArmsPhaseIdAsync(phaseId);

            if (phaseFromRepo == null)
            {
                return BadRequest();
            }

            phaseForUpdate.UserId = "sai";
            _armsPhase.UpdateArmsPhase(_mapper.Map(phaseForUpdate, phaseFromRepo));
            return Ok(_mapper.Map<DTOs.Phase>(phaseFromRepo));
        }

        [HttpPatch("{projectId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.mergephases+json" })]
        public IActionResult MergePhases(Guid projectId, [FromBody] List<Phase> phases)
        {
            var mergeId = _armsPhase.GetAllArmsPhaseAsync(projectId).Where(y => y.MergePhaseId != null && y.PhaseNum == 1)
                .Select(x => x.MergePhaseId).FirstOrDefault();

            if (!mergeId.HasValue) {
                //=========================================================================================================
                //
                // This block is to handle the old data
                // 
                // I expect to go bye bye
                //
                //=========================================================================================================
                mergeId = _armsPhase.GetAllArmsPhaseAsync(projectId).Where(y => y.MergePhaseId != null && y.MergeInd == "M")
                    .Select(x => x.MergePhaseId).FirstOrDefault();
                if (!mergeId.HasValue)
                    mergeId = Guid.NewGuid();
            }

            foreach (var phase in phases)
            {
                phase.MergePhaseId = mergeId;
                phase.MergeInd = "M";
            }

            var result = _armsPhase.UpdateArmsPhases(_mapper.Map<List<ArmsPhase>>(phases));

            return Ok(_mapper.Map<List<Phase>>(result));
        }

    }
}
