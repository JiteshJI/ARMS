using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class GenericLookupListForDDGuid
    {
        public Guid? Value { get; set; }
        public string Text { get; set; }
        public int? PrimaryTypeId { get; set; }
    }
}
