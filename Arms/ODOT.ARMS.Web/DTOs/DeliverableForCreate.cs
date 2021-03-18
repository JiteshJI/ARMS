using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class DeliverableForCreate
    {
        public int DeliverableId { get; set; }
        public int? ProjectAltId { get; set; }
        public string Deliverable_txt { get; set; }
        public string ActiveInd { get; set; }

    }
}
