using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public class ArmsBudgetInventory
    {
        public ArmsBudgetInventory(){}
        public ArmsBudgetInventory(string UserId, ArmsBudgetInventory invDtl, Guid? budgetId)
        {
            this.InventoryNumber = invDtl.InventoryNumber;
            this.UserId = UserId;
            this.EntryDate = DateTime.Now;
            this.BudgetId = budgetId;
        }
        public string InventoryNumber { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDate { get; set; }
        public Guid? BudgetId { get; set; }
    }
}
