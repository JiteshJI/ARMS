using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class BudgetCategoryForDD
    {
        public int BudgetCatId { get; set; }
        public Guid ProjId { get; set; }
        public decimal BudgetAmt { get; set; }
        public string BudgetCatText { get; set; }
        //public string UserId { get; set; }
        //public DateTime EntryDt { get; set; }
        public int BcAltId { get; set; }
    }
}
