using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class ProjectTypeCreate
    {
        public int ProjectTypeId { get; set; }
        public Guid ProjectId { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDate { get; set; }

    }
}
