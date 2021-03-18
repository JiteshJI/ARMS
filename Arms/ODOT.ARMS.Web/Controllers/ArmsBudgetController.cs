using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ODOT.ARMS.Web.DTOs;
using ODOT.ARMS.Web.Helpers;
using ODOT.ARMS.Web.Repositories.Interfaces;

namespace ODOT.ARMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmsBudgetController : ControllerBase
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IMapper _mapper;
        private readonly IArmsBudgetRepository _armsBudgetRepository;

        public ArmsBudgetController(IMapper mapper, IArmsBudgetRepository armsBudgetRepository)
        {
            _mapper = mapper;
            _armsBudgetRepository = armsBudgetRepository;
        }

        [HttpPost]
        [Route("AddBudget")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.budgetforcreate+json" })]
        public async Task<IActionResult> AddBudget([FromBody] BudgetForDD budgetForCreate)
        {
            List<Entities.ArmsBudgetInventory> armsBudgetInventories;

            if (budgetForCreate == null)
            {
                return BadRequest();
            }
            
            budgetForCreate.EntryDt = DateTime.UtcNow;
            budgetForCreate.UserId = "Sai";
            budgetForCreate.BudgetId = Guid.NewGuid();
            var budget = _mapper.Map<Entities.ArmsBudget>(budgetForCreate);
            var budgetEntity = await _armsBudgetRepository.AddArmsBudgetAsync(budget, budgetForCreate.BudgetAmount, budgetForCreate.BudgetCategory, budgetForCreate.ProjId);

            //invoiceDetails = invoiceForCreate.InvoiceDetails.Select(d => new Entities.InvoiceDetail(invoiceToAdd.InvoiceId, "preicher", d)).ToList();
            //invoiceDetails.ForEach(invDtl => _invoiceRepository.AddInvoiceDetail(invDtl));

            armsBudgetInventories = budgetForCreate.ArmsBudgetInventories.Select(d => new Entities.ArmsBudgetInventory("sai", d,budgetEntity.BudgetId)).ToList();
            armsBudgetInventories.ForEach(invDtl => _armsBudgetRepository.AddInventoryDetail(invDtl));

            var result = _mapper.Map<DTOs.BudgetForDD>(budgetEntity);
            result.BudgetCategory = budgetForCreate.BudgetCategory;
            result.ArmsBudgetInventories = armsBudgetInventories;
            return Ok(result);
        }

        [HttpGet("{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetcategorybyprojectid+json" })]
        public async Task<IActionResult> GetArmsBudgetCategories(Guid projectId)
        {
            var budgetCategories = await _armsBudgetRepository.GetBudgetCategoriesByProject(projectId);

            var result = _mapper.Map<IEnumerable<DTOs.BudgetCategoryForDD>>(budgetCategories);
            return Ok(result);
        }

        [HttpGet(Name = "GetArmsBudgetCategories")]
        [Route("GetArmsBudgetCategories")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetcategory+json" })]
        public async Task<IActionResult> GetArmsBudgetCategories()
        {
            var budgetCategories = await _armsBudgetRepository.GetBudgetCategories();

            var result = _mapper.Map<IEnumerable<DTOs.BudgetCategoryForDD>>(budgetCategories);
            return Ok(result);
        }

        [HttpGet("{projectId}", Name = "GetArmsBudgetByProjectId")]
        [Route("GetArmsBudgetByProjectId/{projectId}")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgetbyprojectId+json" })]
        public async Task<IActionResult> GetArmsBudgetByProjectId(Guid projectId)
        {
            var budgets = await _armsBudgetRepository.GetArmsBudgetByCategories(projectId);
         //   var result = _mapper.Map<IEnumerable<DTOs.BudgetForDD>>(budgets);
            return Ok(budgets);
        }

        [HttpGet(Name = "GetArmsBudgets")]
        [Route("GetArmsBudgets")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.armsbudgets+json" })]
        public async Task<IActionResult> GetArmsBudgets()
        {
            var budgets = await _armsBudgetRepository.GetArmsBudgets();

            var result = _mapper.Map<IEnumerable<DTOs.BudgetForDD>>(budgets);
            return Ok(result);
        }

        [HttpPatch(Name = "UpdateBudget")]
        [Route("UpdateBudget")]
        [RequestHeaderMatchesMediaType("Content-Type", new[] { "application/vnd.dot.arms.budgetupdate+json" })]
        public async Task<IActionResult> UpdateBudget([FromBody] BudgetForDD budgetUpdate)
        {
            if (budgetUpdate == null)
            {
                return BadRequest();
            }
           
                var invoiceToUpdate = _mapper.Map<Entities.ArmsBudget>(budgetUpdate);
                var inventoryDetailsForUpdate = budgetUpdate.ArmsBudgetInventories.Select(d => new Entities.ArmsBudgetInventory("preicher", d, budgetUpdate.BudgetId)).ToList();
            try
            {
                invoiceToUpdate = _armsBudgetRepository.UpdateBudget(invoiceToUpdate);

               var invDetlsFromRepo = await _armsBudgetRepository.GetInventoryDetailsByInventoryNumberIdAsync(budgetUpdate.BudgetId);

                var invDetlsToAdd = inventoryDetailsForUpdate.Where(item => !invDetlsFromRepo.Any(item2 => item2.InventoryNumber == item.InventoryNumber)).ToList();

                var invDetlsToDelete = invDetlsFromRepo.Where(item => !inventoryDetailsForUpdate.Any(item2 => item2.InventoryNumber == item.InventoryNumber)).ToList();
                var invDetlsToUpdate = (from indFromUpdate in budgetUpdate.ArmsBudgetInventories
                                        join indFromRepo in invDetlsFromRepo on
                                        indFromUpdate.InventoryNumber equals indFromRepo.InventoryNumber
                                        where indFromUpdate.InventoryNumber != indFromRepo.InventoryNumber
                                        select _mapper.Map(indFromUpdate, indFromRepo)).ToList();

                invDetlsToDelete.ForEach(invDtl => _armsBudgetRepository.DeleteInventoryDetail(invDtl));
                invDetlsToAdd.ForEach(invDtl => _armsBudgetRepository.AddInventoryDetail(invDtl));
                invDetlsToUpdate.ForEach(invDtl => _armsBudgetRepository.UpdateInventoryDetail(invDtl));

                var InvoiceToSend = _mapper.Map<DTOs.BudgetForDD>(invoiceToUpdate);
                foreach (var itm in inventoryDetailsForUpdate)
                    InvoiceToSend.ArmsBudgetInventories.Add(new Entities.ArmsBudgetInventory(itm.UserId, itm, itm.BudgetId));//(int budgetCategoryId, int? budgetId, decimal InvAmt)
                InvoiceToSend.BudgetCategory = budgetUpdate.BudgetCategory;
                InvoiceToSend.ProjId = budgetUpdate.ProjId;
                return Ok(InvoiceToSend);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
        }

    }
}
