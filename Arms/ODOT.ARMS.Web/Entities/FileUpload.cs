using System;

namespace ODOT.ARMS.Web.Entities
{
    public partial class FileUpload
    {
        public Guid? EventUploadId { get; set; }
        public Guid EventSrc { get; set; }

        public int ProjAltId { get; set; }
        public string DocumentName { get; set; }
        public long FileSize { get; set; }
        public string PrivateInd { get; set; }
        public string ActiveInd { get; set; }
        public string UserId { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
