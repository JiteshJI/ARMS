using System;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsProjectType
    {
        public int ProjectTypeId { get; set; }
        public Guid ProjectId { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDate { get; set; }
        public virtual ArmsProject Project { get; set; }
        public virtual ArmsAdministrationCategory AdminCategory { get; set; }
    }
}
