using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Caching.Memory;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories
{
    public class ArmsBudgetRepository : IArmsBudgetRepository
    {
        private IMemoryCache _cache;
        private ARMSContext _context { get; set; }
        public ArmsBudgetRepository(ARMSContext context, IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            _context = context;
        }
        public async Task<ArmsBudget> AddArmsBudgetAsync(ArmsBudget armsBudget, int amount, int budgetCatgeoryId, Guid projId)
        {
            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    List<ArmsBudgetInventory> armsBudgetInventories = new List<ArmsBudgetInventory>();

                    ArmsBudgetCategory armsBudgetCatgeory = new ArmsBudgetCategory
                    {
                        ProjId = projId,
                        BudgetAmt = amount,
                        BudgetCatId = budgetCatgeoryId,
                        BcAltId = 0,
                        EntryDt = armsBudget.EntryDt,
                        UserId = armsBudget.UserId
                
                    };
                    //insert into budget category only if absent
                    var budgetCategoryForProjectExists = _context.ArmsBudgetCategory.Find(budgetCatgeoryId, projId);
                    if (budgetCategoryForProjectExists == null)
                    {
                        var budgetCategroy = await _context.ArmsBudgetCategory.AddAsync(armsBudgetCatgeory);
                        _context.SaveChanges();
                        armsBudget.BcAltId = budgetCategroy.Entity.BcAltId;
                    }
                    else
                    {
                        armsBudget.BcAltId = budgetCategoryForProjectExists.BcAltId;
                    }
                    armsBudget.ActiveInd = "A";
                    
                    await _context.ArmsBudget.AddAsync(armsBudget);

                    _context.Attach(armsBudget);
                    _context.Entry(armsBudget).State = Microsoft.EntityFrameworkCore.EntityState.Added;
                    _context.SaveChanges();


                    transaction.Commit();
                    return armsBudget;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }

        }

        public async Task<List<ArmsBudgetCategory>> GetBudgetCategories()
        {
            return await _context.ArmsBudgetCategory.Select(x => new ArmsBudgetCategory
            {
                BcAltId = x.BcAltId,
                BudgetCatId = x.BudgetCatId,
                BudgetAmt = x.BudgetAmt,
                BudgetCatText = x.BudgetCat.AdministrationCategoryText
            }).ToListAsync();
        }

        public async Task<List<ArmsBudgetCategory>> GetBudgetCategoriesByProject(Guid projectId)
        {
            return await _context.ArmsBudgetCategory.Where(y => y.ProjId == projectId).Select(x => new ArmsBudgetCategory
            {
                BcAltId = x.BcAltId,
                BudgetCatId = x.BudgetCatId,
                BudgetAmt = x.BudgetAmt,
                BudgetCatText = x.BudgetCat.AdministrationCategoryText,
                ProjId = x.ProjId
            }).ToListAsync();
        }

        public async Task<List<DTOs.BudgetForDD>> GetArmsBudgetByCategories(Guid projectId)
        {
            //return await _currentContext.ArmsBudget.ToListAsync();
            var result =  await _context.ArmsBudget
        .Join(
            _context.ArmsBudgetCategory,
            B => B.BcAltId,
            BC => BC.BcAltId,
            (B, BC) => new DTOs.BudgetForDD
            {
                ActiveInd = B.ActiveInd,
                Amount = B.Amount,
                BcAltId = B.BcAltId,
                BudgetAmount = (int)BC.BudgetAmt,
                BudgetCategory = BC.BudgetCatId,
                BudgetId = B.BudgetId,
                BudgetTitle = B.BudgetTitle,
                EntryDt = B.EntryDt,
                Notes = B.Notes,
                OdotFunding = B.OdotFunding,
                OrgCostSharing = B.OrgCostSharing,
                PhaseId = B.PhaseId,
                ProjId = BC.ProjId,
                Qty = B.Qty,
                UserId = B.UserId
            }
        ).Where(e=>e.ProjId==projectId).ToListAsync();
            
            foreach (var item in result)
            {
                try
                {
                    var obj = _context.ArmsBudgetInventory.Where(e => e.BudgetId == item.BudgetId).ToList();
                    item.ArmsBudgetInventories = obj;
                }
                catch (Exception )
                {

                    throw;
                }
               
            }
            return result;
        }

        public async Task<List<ArmsBudget>> GetArmsBudgets()
        {
            return await _context.ArmsBudget.ToListAsync();
        }

        public ArmsBudget UpdateBudget(ArmsBudget budget)
        {
            _context.ArmsBudget.Update(budget);
            _context.Attach(budget);
            _context.Entry(budget).State = EntityState.Modified;
            _context.SaveChanges();
            return budget;
        }

        public void AddInventoryDetail(ArmsBudgetInventory invD)
        {
            _context.ArmsBudgetInventory.Add(invD);
            //_context.Attach(invD);
            _context.Entry(invD).State = EntityState.Added;
            _cache.Remove("InventoryDetail");
            _context.SaveChanges();

        }
        public async Task<IEnumerable<ArmsBudgetInventory>> GetInventoryDetailsByInventoryNumberIdAsync(Guid? budgetId)
        {
            var result = await GetAllInvoiceDetailsAsync();
            return result.Where(a => a.BudgetId == budgetId);
        }

        public async Task<List<ArmsBudgetInventory>> GetAllInvoiceDetailsAsync()
        {
            //return await _cache.GetOrCreateAsync("InvoiceDetail", entry =>
            //{
                return await _context.ArmsBudgetInventory.ToListAsync();
            //});
        }
        public void UpdateInventoryDetail(ArmsBudgetInventory invD)
        {
            _context.ArmsBudgetInventory.Update(invD);
            _context.Attach(invD);
            _context.Entry(invD).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _cache.Remove("InvoiceDetail");
            _context.SaveChanges();
        }

        public void DeleteInventoryDetail(ArmsBudgetInventory invD)
        {
            var result = _context.ArmsBudgetInventory.Where(x => x.InventoryNumber == invD.InventoryNumber);
            foreach (var invDtl in result)
                _context.ArmsBudgetInventory.Remove(invDtl);
            _cache.Remove("InventoryDetail");
            _context.SaveChanges();
        }
    }
}
