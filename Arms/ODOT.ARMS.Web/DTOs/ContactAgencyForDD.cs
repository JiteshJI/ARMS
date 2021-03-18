using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class ContactAgencyForDD
    {
        public int ContactAgencyId { get; set; }
        public int AgencyID { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string AgencyName { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string ZipExtCd { get; set; }
        public string BusinessPhone { get; set; }
        public string BusinessPhoneExt { get; set; }
        public string MobilePhone { get; set; }
        public string ActiveInd { get; set; }
        public Guid ContactId { get; set; }
        public string UserId { get; set; }
        public DateTime? Entry_Date { get; set; }

    }

}
