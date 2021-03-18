using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public class ArmsPhase
    {
        public ArmsPhase() { }
        public ArmsPhase(Guid projId, string userId)
        {
            ActiveInd = "A";
            Amount = 0;//default
            BeginDate = null;//default
            EndDate = null;//default
            MergeInd = "I";
            MergePhaseId = Guid.NewGuid();
            PhaseId = Guid.NewGuid();
            PhaseNum = 1;
            PhaseTitle = "Phase 1";
            StatusId = (int) PhaseStatusEnum.Proposed;
            ProjId = projId;
            UserId = userId;
            EntryDate = null;
        }
        public Guid PhaseId { get; set; }
        public Guid ProjId { get; set; }
        public int PhaseNum { get; set; }
        public DateTime? BeginDate  { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Amount { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDate { get; set; }
        public string ActiveInd { get; set; }
        public string PhaseTitle  { get; set; }
        public string MergeInd { get; set; }
        public Guid? MergePhaseId { get; set; }
        public int? StatusId { get; set; }

    }

    public enum PhaseStatusEnum
    {
        //[CodeDescription("A", "Authorized")]
        Authorized = 168,
        //[CodeDescription("C", "Cancelled")]
        Cancelled = 169,
        //[CodeDescription("P", "Proposed")]
        Proposed = 167
    }
}
