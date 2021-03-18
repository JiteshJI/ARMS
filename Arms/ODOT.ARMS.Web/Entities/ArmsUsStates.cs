using System;
using System.Collections.Generic;


namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsUsStates
    {
        public ArmsUsStates()
        {
            ArmsContactAgency = new HashSet<ArmsContactAgency>();
        }

        public int UsStatesId { get; set; }
        public string UsStateCd { get; set; }
        public string UsStateNme { get; set; }

        public virtual ICollection<ArmsContactAgency> ArmsContactAgency { get; set; }
    }
}
