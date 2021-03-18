using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class InvoiceDetail
    {
        public InvoiceDetail() { }
        public InvoiceDetail(int budgetCategoryId, int? budgetId, decimal InvAmt) {
            this.budgetCategoryId = budgetCategoryId;
            this.budgetId = budgetId;
            this.InvAmt = InvAmt;
        }
        //public int BudgetCategoryCd { get; set; }
        public int invoiceDetailId { get; set; }
        public decimal InvAmt { get; set; }
        public int? budgetId { get; set; }
        public int budgetCategoryId { get; set; }
        public string invDtlKey
        {
            get {
                var retval = budgetCategoryId.ToString();
                if (!(budgetId is null))
                    retval += "-" + budgetId.ToString();
                return retval;
            }
        }

    }
}
