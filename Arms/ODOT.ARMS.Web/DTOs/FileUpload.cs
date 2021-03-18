using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public partial class FileUpload
    {
        public Guid EventUploadId { get; set; }
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //[Key]
        public Guid EventSrc { get; set; }
        public string DocumentName { get; set; }
        public int ProjAltId { get; set; }
        public long FileSize { get; set; }
        public string PrivateInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
        public DateTime UploadDate { get; set; }
        public string Extension { get; set; }


    }
}
