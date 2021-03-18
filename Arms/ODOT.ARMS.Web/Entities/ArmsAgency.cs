using System;
using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsAgency
    {

        public ArmsAgency()
        {
            ArmsContactAgency = new HashSet<ArmsContactAgency>();
        }
        public int? AgencyId { get; set; }
        public string AgencyNameTxt { get; set; }
        public int AgencyCatId { get; set; }
        public string AgencyStatusInd { get; set; }
        public string ControlBoardApprvlInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }

        public string VendorId { get; set; }

        public virtual ArmsAgencyCategory AgencyCat { get; set; }

        public virtual ICollection<ArmsContactAgency> ArmsContactAgency { get; set; }

        public virtual ICollection<ArmsProject> ArmsProject { get; set; }
    }
}