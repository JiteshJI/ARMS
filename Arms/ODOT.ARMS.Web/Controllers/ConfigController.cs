using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IMapper _mapper;
        private readonly IConfigRepository _configRepo;
        private readonly string _env;

        public ConfigController(IMapper mapper, IConfigRepository configRepo)
        {
            _mapper = mapper;
            _configRepo = configRepo;
            var env = _configRepo.GetConfigByKey("ENV");//get environmeent (maybe this should be its own thing and be global
            _env = env.Value;
        }

        [HttpGet("{keyNme}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.configforproject+json" })]
        public IActionResult getConfigValByKey(string keyNme)
        {
            if (string.IsNullOrWhiteSpace(keyNme))
                return BadRequest();

            var cnfg = _configRepo.GetConfigByKey(keyNme.ToUpper() + "_" + _env);//
            if (cnfg == null)
                return BadRequest();

            cnfg.KeyNme = cnfg.KeyNme.Replace("_" + _env, "").ToLower();
            var configForTransport = _mapper.Map<DTOs.ConfigItem>(cnfg);

            return Ok(configForTransport);
        }

        [HttpPatch]
        [Route("UpdateConfig")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.configforupdate+json" })]
        public IActionResult UpdateCB([FromBody] DTOs.ConfigItem configForUpdate)
        {
            configForUpdate.KeyNme = configForUpdate.KeyNme.ToUpper() + "_" + _env;

            var configFromRepo = _configRepo.GetConfigByKey(configForUpdate.KeyNme);//

            if (configFromRepo == null)
                return BadRequest();

            _configRepo.UpdateConfigItem(_mapper.Map(configForUpdate, configFromRepo));
            return Ok(_mapper.Map<DTOs.ConfigItem>(configFromRepo));
        }

    }
}
