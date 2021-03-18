using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public class ArmsContribution
    {
            public Guid ContributionId { get; set; }
            public Guid ProjectId { get; set; }
            public string FiscalYear { get; set; }
            public decimal CommittedAmt { get; set; }
            public decimal TransferredAmt { get; set; }
            public DateTime TransferReceiveDate { get; set; }          
            public string Comment { get; set; }
            public string UserId { get; set; }
            public DateTime EntryDate { get; set; }
            public string USStateCode { get; set; }
            }
        }



