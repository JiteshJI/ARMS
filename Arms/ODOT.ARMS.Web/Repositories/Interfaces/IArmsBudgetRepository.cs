using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IArmsBudgetRepository
    {
        Task<ArmsBudget> AddArmsBudgetAsync(ArmsBudget armsBudget, int amount, int budgetCatgeoryId, System.Guid projId);
        Task<List<ArmsBudgetCategory>> GetBudgetCategories();
        Task<List<ArmsBudgetCategory>> GetBudgetCategoriesByProject(Guid projectId);
        Task<List<DTOs.BudgetForDD>> GetArmsBudgetByCategories(Guid projectId);
        Task<List<ArmsBudget>> GetArmsBudgets();
        ArmsBudget UpdateBudget(ArmsBudget budget);

        Task<IEnumerable<ArmsBudgetInventory>> GetInventoryDetailsByInventoryNumberIdAsync(Guid? budgetId);
        void AddInventoryDetail(ArmsBudgetInventory invD);
        void UpdateInventoryDetail(ArmsBudgetInventory invD);
        void DeleteInventoryDetail(ArmsBudgetInventory invD);

    }
}
