using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public partial class Funding
    {
        public Guid? EncumbranceId { get; set; }
        public Guid ProjectId { get; set; }
        public int EncubranceTypeCD { get; set; }
        public int FundingSrcCD { get; set; }
        public int FundingTypeCD { get; set; }
        public int FiscalYr { get; set; }
        public string EncubrancePONum { get; set; }
        public decimal Amount { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public string ActiveInd { get; set; }
        public string Notes { get; set; }
        public int DocCnt { get; set; }
        public int CategoryId { get; set; }
    }
}
