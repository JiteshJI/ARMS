using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsLedgerController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IMapper _mapper;
        private readonly IArmsLedgerRepository _armsLedgerRepository;

        public ArmsLedgerController(IMapper mapper, IArmsLedgerRepository armsLedgerRepository)
        {
            _mapper = mapper;
            _armsLedgerRepository = armsLedgerRepository;
        }
        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.ledgerforproject+json" })]
        public async Task<IActionResult> GetArmsLedgerListByProjectId(Guid projectId)
        {
            var resultfunding = await _armsLedgerRepository.GetAllArmLedgerAsyncByProjectId(projectId);

            if (resultfunding == null)
            {
                return BadRequest();
            }
            return Ok(resultfunding);
        }

    }
}