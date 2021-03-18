using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsVendorAddress
    {
        public string oaksVendorNo { get; set; }
        public string vendorName { get; set; }
        public string addressSeqNo { get; set; }
        public string vendorAddress { get; set; }
    }
}
