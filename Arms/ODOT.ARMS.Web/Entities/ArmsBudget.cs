using System;
using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsBudget
    {
        public Guid BudgetId { get; set; }
        public Guid PhaseId { get; set; }
        public int BcAltId { get; set; }
        //public int BudgetAltId { get; set; }
        public string BudgetTitle { get; set; }
        public decimal OdotFunding { get; set; }
        public decimal OrgCostSharing { get; set; }
        public int? Qty { get; set; }
        public long? Amount { get; set; }
        public string Notes { get; set; }
        public string ActiveInd { get; set; }
        public DateTime EntryDt { get; set; }
        public string UserId { get; set; }
    }
}
