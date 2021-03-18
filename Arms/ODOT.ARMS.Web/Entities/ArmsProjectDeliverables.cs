using System;
namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsProjectDeliverables
    {
        public Guid? ProjectDeliverableId { get; set; }
        public Guid ProjId { get; set; }
        public int DeliverableId{ get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
        public virtual ArmsDeliverables armsDeliverables { get; set; }
    }
}
