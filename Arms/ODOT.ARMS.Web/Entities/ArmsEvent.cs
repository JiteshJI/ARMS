using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public partial class Event 
    {
        public Guid EventSrc { get; set; }
        public int PrimaryTypeId { get; set; }
        public int? SecondaryTypeId { get; set; }
        public string InvoiceNumber { get; set; }
        public string PublicCommentTxt{ get; set; }
        public string PrivateCommentTxt { get; set; }
        public string UserId { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ActiveInd { get; set; }

        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Key]
        public Guid EventId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid? ContactId { get; set; }
        //public ArmsEvent() {
        //    EventId = Guid.NewGuid();
        //}
    }
}
