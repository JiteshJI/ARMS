using System;
using System.Collections.Generic;

namespace ODOT.ARMS.Web.DTOs
{
    public class EventForAdd
    {
        public Guid EventSrc { get; set; }
        public int PrimaryTypeId { get; set; }
        public int? SecondaryTypeId { get; set; }
        public string InvoiceNumber { get; set; }
        public string PublicCommentTxt { get; set; }
        public string PrivateCommentTxt { get; set; }
        public string UserId { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ActiveInd { get; set; }
        public string ActiveTxt { get; set; }
        public Guid? EventId { get; set; }
        public Guid ProjectId { get; set; }
        //public string Document { get; set; }
        public int DocCnt { get; set; }
        public Guid? ContactId { get; set; }
        public ICollection<contactIdList> contactIdList { get; set; }
    }
    public class contactIdList
    {
        public Guid ContactId { get; set; }
    }
}
