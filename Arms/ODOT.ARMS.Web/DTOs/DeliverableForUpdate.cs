using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class DeliverableForUpdate
    {
        int ProjectAltId { get; set; }
        int Deliverable_ID { get; set; }
        int Project_Deliverable_ID { get; set; }
        string ActiveInd { get; set; }
        string Deliverable_Txt { get; set; }
    }
}
