using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities.Attributes
{
    public class CodeDescriptionAttribute : Attribute
    {
        public CodeDescriptionAttribute(string code, string description)
        {
            this.Code = code;
            this.Description = description;
        }
        public string Code { get; private set; }
        public string Description { get; private set; }
    }
}
