using System;
using System.Collections.Generic;
namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsDeliverables
    {
        public int DeliverableId { get; set; }
        public int? ProjAltId { get; set; }
        public string DeliverableTxt { get;set;}
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
        public string ActiveInd { get; set; }
        public string DeliverableType { get; set; }
        public Guid? DeliverableAltId {get;set;}
        public virtual ICollection< ArmsProjectDeliverables> ArmsProjectDeliverables {get; set;}
    }
}
