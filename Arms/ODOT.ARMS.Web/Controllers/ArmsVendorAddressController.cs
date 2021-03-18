using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;


namespace ODOT.ARMS.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArmsVendorAddressController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IARMSDataRepository _armsDataRepository;

        public ArmsVendorAddressController(IMapper mapper, IARMSDataRepository armsDataRepository)
        {
            _mapper = mapper;
            _armsDataRepository = armsDataRepository;
        }
        [HttpGet(Name = "GetArmsVendorAddress")]
        [Route("GetArmsVendorAddress/{vendorId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsvendoraddressfordd+json" })]
        
        /*
        public async Task<IActionResult> GetArmsVendorAddress(string vendorId)
        {           
            var vendorAddressFromRepo = await _armsDataRepository.GetAllArmsVendorAsync(vendorId);
            var allAgency = _mapper.Map<IEnumerable<DTOs.ArmVendorAddressForDD>>(vendorAddressFromRepo).Where(e=>e.OAKSVENDORNO==vendorId);
            return Ok(allAgency.OrderByDescending(l => l.ADDRESSSEQNO));
        }
       */
        
        public async Task<IActionResult> GetArmsVendorAddress(string vendorId)
        {
            vendorId=vendorId.PadLeft(10,'0');
            var vendorAddressFromRepo = await _armsDataRepository.GetAllArmsVendorAsync(vendorId);
            var vendorAddressCodes = _mapper.Map<IEnumerable<DTOs.ArmVendorAddressForDD>>(vendorAddressFromRepo);
            return Ok(vendorAddressCodes.OrderByDescending(l => l.addressSeqNo));
        }
    }
}