using System;
namespace ODOT.ARMS.Web.DTOs
{
    public class Deliverable
    {
        public int DeliverableId { get; set; }
        public int? ProjAltId { get; set; }
        public string DeliverableTxt { get; set; }
        public string DeliverableType { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
        public string ActiveInd { get; set; }
        public Guid DeliverableAltId {get;set; }
    }
}
