using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public class ControllingBoard
    {
        public Guid ControllingBoardId { get; set; }
        public Guid ProjectId { get; set; }
        public string ControllingBoardNumber { get; set; }
        public int ControllingBoardType { get; set; }
        public int ControllingBoardStatus { get; set; }
        public string PublicCommentText { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public string ActiveInd { get; set; }
        public DateTime ControllingBoardDate { get; set; }
        public DateTime SubmissionDate { get; set; }
        public int ControllingBoardCategory { get; set; }
    }
}
