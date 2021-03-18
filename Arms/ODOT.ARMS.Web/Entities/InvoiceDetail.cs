using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ODOT.ARMS.Web.DTOs;

namespace ODOT.ARMS.Web.Entities
{
    public class InvoiceDetail
    {
        public InvoiceDetail() { }
        public InvoiceDetail(Guid InvoiceId, string UserId, DTOs.InvoiceDetail invDtl) {
            this.invoiceDetailId = 0;
            this.InvoiceId = InvoiceId;
            this.UserId = UserId;
            this.EntryDt = DateTime.Now;
            this.InvAmt = invDtl.InvAmt;
            this.budgetId = invDtl.budgetId;
            this.budgetCategoryId = invDtl.budgetCategoryId;
        }
        public Guid InvoiceId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int invoiceDetailId { get; set; }        
        //public int BudgetCategoryCd { get; set; }
        public decimal InvAmt { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
        public int? budgetId { get; set; }
        public int budgetCategoryId { get; set; }
    }
}
