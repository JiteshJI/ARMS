namespace ODOT.ARMS.Web.DTOs
{
    public class ArmsAdministrationCategoryForDD
    {
        public int? AdministrationCategoryID { get; set; }
        public string AdministrationCategoryText { get; set; }
        public string ControllingBoardApprvl { get; set; }
        public string ACTIVEIND { get; set; }
        public int SpecificListID { get; set; }
        public bool AdministrationCategoryActive { get; set; }

        public int? PrimaryTypeId { get; set; }
       // public virtual ArmsSpecificList ArmsSpecificList { get; set; }
    }
}
