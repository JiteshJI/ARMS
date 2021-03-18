using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class Phase
    {
        public Guid? PhaseId { get; set; }
        public Guid ProjId { get; set; }
        public int PhaseNum { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Amount { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public string ActiveInd { get; set; }
        public string PhaseTitle { get; set; }
        public string MergeInd { get; set; }
        public Guid? MergePhaseId { get; set; }
        public int? StatusId { get; set; }
    }
}
