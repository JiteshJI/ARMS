using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public partial class Invoice
    {

        //public Invoice() {
        //    InvoiceDetails = new HashSet<InvoiceDetail>();
        //}

        public Guid InvoiceId { get; set; }
        public Guid PhaseId { get; set; }
        public Guid ProjId { get; set; }//This field makes the grid load easy
        public DateTime? InvRcvdDt { get; set; }
        public DateTime? InvDt { get; set; }
        public DateTime? StartDt { get; set; }
        public DateTime? EndDt { get; set; }
        public DateTime? InvToFinancePaidDt { get; set; }
        public DateTime? ProperInvDt { get; set; }
        public string FinalNoticeInd { get; set; }
        public string InvNum{ get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
        public int FundingStatusCd { get; set; }
        public string PublicCommentTxt { get; set; }
        public string PrivateCommentTxt { get; set; }

        //public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }

    }
}
