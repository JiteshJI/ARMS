using System;
using System.Collections.Generic;

namespace ODOT.ARMS.Web.Entities
{
    public class ArmsContacts
    {
        public ArmsContacts()
        {
            ArmsContactAgency = new HashSet<ArmsContactAgency>();
        }
        public Guid ContactID { get; set; }
        public string BusinessTitle { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public string EmailAddress { get; set; }
        public string OrilBrdMbr { get; set; }
        public string ActiveInd { get; set; }

        public string UserId { get; set; }

        public DateTime Entry_date { get; set; }

        public virtual ICollection<ArmsContactAgency> ArmsContactAgency { get; set; }

        public virtual ICollection<ArmsPersonnel> ArmsPersonnel { get; set; }
    }
}
