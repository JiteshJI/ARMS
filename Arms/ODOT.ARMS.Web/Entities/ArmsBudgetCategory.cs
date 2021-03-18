using System;
using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsBudgetCategory
    {
        public int BudgetCatId { get; set; }
        public Guid ProjId { get; set; }
        public decimal BudgetAmt { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDt { get; set; }
        public int BcAltId { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public string BudgetCatText { get; set; }

        public virtual ArmsAdministrationCategory BudgetCat { get; set; }
    }
}
