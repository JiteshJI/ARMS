using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ODOT.ARMS.Web.DTOs
{
    public partial class Event
    {
        public Event() { }
        public Event(EventForAdd eventForAdd)
        {
            EventSrc = eventForAdd.EventSrc;
            PrimaryTypeId = eventForAdd.PrimaryTypeId;
            SecondaryTypeId = eventForAdd.SecondaryTypeId;
            InvoiceNumber = eventForAdd.InvoiceNumber;
            PublicCommentTxt = eventForAdd.PublicCommentTxt;
            PrivateCommentTxt = eventForAdd.PrivateCommentTxt;
            UserId = eventForAdd.UserId;
            BeginDate = eventForAdd.BeginDate;
            EndDate = eventForAdd.EndDate;
            ActiveInd = eventForAdd.ActiveInd;
            ActiveTxt = eventForAdd.ActiveTxt;
            EventId = eventForAdd.EventId;
            ProjectId = eventForAdd.ProjectId;
            DocCnt = 0;
            ContactId = eventForAdd.ContactId;
        }
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
    }


}
