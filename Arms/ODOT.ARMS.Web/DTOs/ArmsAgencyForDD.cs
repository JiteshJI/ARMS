using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class ArmsAgencyForDD
    {

        public int? AgencyId { get; set; }
        public string AgencyNameTxt { get; set; }
        public int AgencyCatId { get; set; }
        public string AgencyCatText { get; set; }
        public string AgencyStatusInd { get; set; }
        public string ControlBoardApprvlInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDt { get; set; }
        public string VendorId { get; set; }

    }

    public class ArmsAgencyForCreateDD
    {

        public int? AgencyId { get; set; }
        public string AgencyNameTxt { get; set; }
        public int AgencyCatId { get; set; }

        public string AgencyCatText { get; set; }
        public string AgencyStatusInd { get; set; }
        public string ControlBoardApprvlInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }        public DateTime? EntryDt { get; set; }
        public String VendorId { get; set; }

    }

    public class ArmsAgencyForUpdateDD
    {
        public int? AgencyId { get; set; }
        public string AgencyNameTxt { get; set; }
        public int AgencyCatId { get; set; }
        public string AgencyStatusInd { get; set; }
        public string ControlBoardApprvlInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDt { get; set; }
        public String VendorId { get; set; }

    }
}
