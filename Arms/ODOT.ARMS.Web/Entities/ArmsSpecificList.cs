using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsSpecificList
    {
        public ArmsSpecificList()
        {
            ArmsAdministrationCategories = new HashSet<ArmsAdministrationCategory>();
        }
        public int SpecificListID { get; set; }
        public string SpecificListText { get; set; }
        public bool SpecificListActive { get; set; }
        public int FundingTypeID { get; set; }
        public virtual ICollection<ArmsAdministrationCategory> ArmsAdministrationCategories { get; set; }
    }
}
