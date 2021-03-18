using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Services.Interfaces;
using ODOT.ARMS.Web.DTOs;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IArmsEventUploadRepository _fileUploads;
        private readonly IArmsProjectRepository _armsProjectRepository;
        private readonly IWarehouseRepository _warehouseRepository;

        private readonly IMapper _mapper;
        public InvoiceController(IMapper mapper, IInvoiceRepository invoiceRepository, IArmsEventUploadRepository fileUploads, IArmsProjectRepository armsProjectRepository, IWarehouseRepository armsWarehouseRepository) {
            _mapper = mapper;
            _invoiceRepository = invoiceRepository;
            _fileUploads = fileUploads;
            _armsProjectRepository = armsProjectRepository;
            _warehouseRepository = armsWarehouseRepository;
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.invoicesforproject+json" })]
        public async Task<IActionResult> GetInvoicesByProjectId(string projectId)
        {
            var projId = new Guid(projectId);
            var invs = await _invoiceRepository.GetAllInvoicesByProjectIdAsync(projId);

            if (invs == null)
            {
                return BadRequest();
            }

            var retInvoices = _mapper.Map<List<DTOs.Invoice>>(invs);
            var fileCnts = await _invoiceRepository.GetUploadFileCountsAsync(projId);
            foreach (var item in retInvoices)
            {
                var invoiceDetails = await _invoiceRepository.GetInvoiceDetailsByInvoiceIdAsync(item.InvoiceId ?? Guid.Empty);
                foreach (var itm in invoiceDetails)
                    item.InvoiceDetails.Add(new DTOs.InvoiceDetail(itm.budgetCategoryId, itm.budgetId, itm.InvAmt));
                item.DocCnt = 0;//"0 Docs";//default value
                var fileSrcCnt = fileCnts.Find(x => x.Src == item.InvoiceId);
                if (fileSrcCnt != null)
                {
                    item.DocCnt = fileSrcCnt.FileCount;//String.Format("{0} Docs", fileSrcCnt.FileCount);
                }
            }

            return Ok(retInvoices);
        }

        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.invoiceforcreate+json" })]
        public IActionResult AddInvoice([FromBody] DTOs.Invoice invoiceForCreate)
        {
            Entities.Invoice invoice;
            List<Entities.InvoiceDetail> invoiceDetails;
            try
            {
                invoice = _mapper.Map<Entities.Invoice>(invoiceForCreate);
                invoice.UserId = "preicher";


                var invoiceToAdd = _invoiceRepository.AddInvoice(invoice);
                invoiceDetails = invoiceForCreate.InvoiceDetails.Select(d => new Entities.InvoiceDetail(invoiceToAdd.InvoiceId, "preicher", d)).ToList();
                invoiceDetails.ForEach(invDtl => _invoiceRepository.AddInvoiceDetail(invDtl));

            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
            var InvoiceToSend = _mapper.Map<DTOs.Invoice>(invoice);

            foreach (var itm in invoiceDetails)
                InvoiceToSend.InvoiceDetails.Add(new DTOs.InvoiceDetail(itm.budgetCategoryId, itm.budgetId, itm.InvAmt));

            InvoiceToSend.DocCnt = 0;
            return Ok(InvoiceToSend);
        }

        [HttpPatch("{invoiceId}")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.invoiceforupdate+json" })]
        public async Task<IActionResult> UpdateInvoice(Guid invoiceId, [FromBody] DTOs.Invoice invoiceForUpdate)
        {
            var invoiceFromRepo = await _invoiceRepository.GetInvoiceByIdAsync(invoiceId);

            if (invoiceFromRepo == null)
            {
                return BadRequest();
            }

            var invoiceToUpdate = _mapper.Map(invoiceForUpdate, invoiceFromRepo);

            var invoiceDetailsForUpdate = invoiceForUpdate.InvoiceDetails.Select(d => new Entities.InvoiceDetail(invoiceId, "preicher", d)).ToList();

            try
            {
                invoiceToUpdate = _invoiceRepository.UpdateInvoice(invoiceToUpdate);

                var invDetlsFromRepo = await _invoiceRepository.GetInvoiceDetailsByInvoiceIdAsync(invoiceId);

                var invDetlsToAdd = invoiceDetailsForUpdate.Where(item => !invDetlsFromRepo.Any(item2 => item2.invoiceDetailId == item.invoiceDetailId)).ToList();

                var invDetlsToDelete = invDetlsFromRepo.Where(item => !invoiceDetailsForUpdate.Any(item2 => item2.invoiceDetailId == item.invoiceDetailId)).ToList();
                var invDetlsToUpdate = (from indFromUpdate in invoiceForUpdate.InvoiceDetails
                                        join indFromRepo in invDetlsFromRepo on
                                        indFromUpdate.invoiceDetailId equals indFromRepo.invoiceDetailId
                                        where indFromUpdate.InvAmt != indFromRepo.InvAmt
                                        select _mapper.Map(indFromUpdate, indFromRepo)).ToList();

                invDetlsToDelete.ForEach(invDtl => _invoiceRepository.DeleteInvoiceDetail(invDtl));
                invDetlsToAdd.ForEach(invDtl => _invoiceRepository.AddInvoiceDetail(invDtl));                
                invDetlsToUpdate.ForEach(invDtl => _invoiceRepository.UpdateInvoiceDetail(invDtl));

            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
            var InvoiceToSend = _mapper.Map<DTOs.Invoice>(invoiceToUpdate);
            foreach(var itm in invoiceDetailsForUpdate)
                InvoiceToSend.InvoiceDetails.Add( new DTOs.InvoiceDetail(itm.budgetCategoryId, itm.budgetId, itm.InvAmt));//(int budgetCategoryId, int? budgetId, decimal InvAmt)

            InvoiceToSend.DocCnt = await _fileUploads.GetUploadCountBySrcIdAsync(invoiceForUpdate.InvoiceId ?? Guid.Empty);
            return Ok(InvoiceToSend);
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.budgetcatsforproject+json" })]
        public async Task<IActionResult> GetBudgetCatsByProjectId(string projectId)
        {
            var projId = new Guid(projectId);
            var budgetCategoriesDD = await _invoiceRepository.GetBudgetCategoriesAsync(projId);

            if (budgetCategoriesDD == null)
            {
                return BadRequest();
            }

            var retBudgetCategoriesDD = _mapper.Map<List<DTOs.BudgetCatDD>>(budgetCategoriesDD);

            return Ok(retBudgetCategoriesDD);
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.encumbranceforinvoice+json" })]
        public async Task<IActionResult> GetEncumbranceByPid(string projectId)
        {
            var projId = new Guid(projectId);

            List<Entities.Encumbrance> encumbranceList = null;

            try
            {
                var project = _armsProjectRepository.GetArmsArmsProjectId(projId);

                encumbranceList = await _warehouseRepository.GetEncumbranceByPid(project.PidNum);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }

            if (encumbranceList == null)
            {
                return BadRequest();
            }

            var retEncumbranceList = _mapper.Map<List<DTOs.Encumbrance>>(encumbranceList);

            return Ok(retEncumbranceList);
        }


        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.balanceforproject+json" })]
        public IActionResult GetProjectBalanceByPid(string projectId)
        {
            var projId = new Guid(projectId);
            var projectBalanace = _invoiceRepository.GetProjectBalance(projId);

            if (projectBalanace == null)
            {
                return BadRequest();
            }

            var retProjectBalanace = _mapper.Map<DTOs.ProjectBalance>(projectBalanace);

            return Ok(retProjectBalanace);
        }


    }
}
