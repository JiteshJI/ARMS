using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class ProjectAbstract
    {
        public int ProjectAltId { get; set; }
        public string AbstractTxt { get; set; }
        public Guid ProjId { get; set; }
        public string UserId { get; set; }
    }
}
