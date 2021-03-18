using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsFinOverviewController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IMapper _mapper;
        private readonly IArmsFinOverviewRepository _armsFinOverviewRepository;
        public ArmsFinOverviewController(IMapper mapper, IArmsFinOverviewRepository armsFinOverviewRepository)
        {
            _mapper = mapper;
            _armsFinOverviewRepository = armsFinOverviewRepository;
        }
        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.finOverviewforproject+json" })]
        public async Task<IActionResult> GetArmsoverviewListByProjectId(Guid projectId)
        {
            var resultfunding = await _armsFinOverviewRepository.GetAllArmsOverviewAsyncByProjectId(projectId);

            if (resultfunding == null)
            {
                return BadRequest();
            }
            return Ok(resultfunding);
        }
    }
}
