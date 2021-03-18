using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsPersonnel
    {
        public Guid PersonnelId { get; set; }
        public int RoleId { get; set; }
        public string IsLeadInd { get; set; }
        public string ActiveInd { get; set; }
        public Guid ProjId { get; set; }
        public Guid ContactId { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDt { get; set; }

        public virtual ArmsContacts Contact { get; set; }
        public virtual ArmsProject Proj { get; set; }
        public virtual ArmsAdministrationCategory Role { get; set; }
    }
}
