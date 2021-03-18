using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsAgencyCategory
    {
        public ArmsAgencyCategory()
        {
            ArmsAgency = new HashSet<ArmsAgency>();
        }

        public int AgencyCatId { get; set; }
        public string AgencyCategoryTxt { get; set; }
        public string ControllingBoardApprvl { get; set; }
        public string ActiveInd { get; set; }

        public virtual ICollection<ArmsAgency> ArmsAgency { get; set; }
    }
}
