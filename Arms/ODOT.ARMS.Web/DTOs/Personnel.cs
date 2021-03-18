using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class Personnel
    {
        public int RoleId { get; set; }
        public string IsLeadInd { get; set; }
        public string ActiveInd { get; set; }
        public Guid ProjId { get; set; }
        public Guid ContactId { get; set; }
        public Guid? PersonnelId { get; set; }
        public string UserId { get; set; }
        public DateTime? EntryDt { get; set; }
    }
}
