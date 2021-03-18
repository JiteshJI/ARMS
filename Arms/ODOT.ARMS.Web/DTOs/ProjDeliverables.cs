using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class ProjDeliverables
    {
        public Guid? ProjectDeliverableId { get; set; }
        public int? ProjAltId { get; set; }
        public Guid? ProjectId { get; set; }
        public int? DeliverableId { get; set; }
        public string DeliverableTxt { get; set; }
        public string DeliverableType { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
    }

    public class ProjectDeliverablesdDTO
    {
        public ProjDeliverables[] projectDeliverablesList { get; set; }
    }

}



