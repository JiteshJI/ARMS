using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsAdministrationCategory
    {
        public int? AdministrationCategoryID { get; set; }
        public string AdministrationCategoryText { get; set; }
        public string ControllingBoardApprvl { get; set; }
        public string ACTIVEIND { get; set; }
        public int SpecificListID { get; set; }
        public bool AdministrationCategoryActive { get; set; }
        public int? PrimaryTypeId { get; set; }
        public virtual ArmsSpecificList ArmsSpecificList { get; set; }

        public virtual ICollection<ArmsPersonnel> ArmsPersonnel { get; set; }
        public virtual ICollection<ArmsBudgetCategory> ArmsBudgetCategory { get; set; }
        public virtual ICollection<ArmsProjectType> ArmsProjectType { get; set; }

    }
}
