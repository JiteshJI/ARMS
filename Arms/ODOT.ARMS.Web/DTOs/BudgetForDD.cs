using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class BudgetForDD
    {
        public BudgetForDD()
        {
            this.ArmsBudgetInventories = new List<ArmsBudgetInventory>();
        }
        public Guid? BudgetId { get; set; }
        public Guid PhaseId { get; set; }
        public Guid ProjId { get; set; }
        public int BudgetCategory { get; set; }
        public int? BcAltId { get; set; }
        //public int BudgetAltId { get; set; }
        public int BudgetAmount { get; set; }
        public string BudgetTitle { get; set; }
        public decimal? OdotFunding { get; set; }
        public decimal? OrgCostSharing { get; set; }
        public int? Qty { get; set; }
        public long? Amount { get; set; }
        public string Notes { get; set; }
        public string ActiveInd { get; set; }
        public DateTime EntryDt { get; set; }
        public string UserId { get; set; }
        public ICollection<ArmsBudgetInventory> ArmsBudgetInventories { get; set; }

    }
}
