using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class PersonnelForDisplay:Personnel
    {
        public  string ContactName { get; set; }
        
        public  string ContactRole {get;set;}

        public string agencyName{get;set;}

        public string EmailAddress{get;set;}

        public string MobilePhone {get;set;}

    }
}
