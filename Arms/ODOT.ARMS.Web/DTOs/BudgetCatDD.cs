using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class BudgetCatDD
    {
        public Guid PhaseId { get; set; }
        public int BudgetCatId { get; set; }
        public int? BudgetId { get; set; }
        public string LookupTitle { get; set; }
        public string LookupKey { get; set; }
        public decimal BudgetAmt { get; set; }
    }
}
