using System;

namespace ODOT.ARMS.Web.Entities
{
    public class ArmsContactAgency
    {
        public int ContactAgencyId { get; set; }
        public int AgencyID { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string ZipExtCd { get; set; }
        public string BusinessPhone { get; set; }

        public string BusinessPhoneExt { get; set; }
        public string MobilePhone { get; set; }
        public string ActiveInd { get; set; }
        public Guid  ContactId { get; set; }
        public string UserId { get; set; }
        public DateTime Entry_Date { get; set; }

        public virtual ArmsAgency Agency { get; set; }
        public virtual ArmsContacts Contact { get; set; }
        public virtual ArmsUsStates StateCdNavigation { get; set; }


    }
}
