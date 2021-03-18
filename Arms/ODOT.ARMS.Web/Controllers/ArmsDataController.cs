using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Helpers;
using AutoMapper;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArmsDataController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;

        public ArmsDataController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }

    }
}
