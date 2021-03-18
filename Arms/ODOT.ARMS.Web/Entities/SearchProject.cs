﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ODOT.ARMS.Web.Entities
{
    public partial class SearchProject
    {
        public int? ProjectClassificationId { get; set; }
        public string ProjectType { get; set; }
        public int? ProjectStatusId { get; set; }
        public string ProjectStatusTxt { get; set; }
        public string ProjectTitleTxt { get; set; }
        public string RfpNum { get; set; }
        public string PidNum { get; set; }
        public string AgencyName { get; set; }
        public Guid ProjId { get; set; }
        public string UserId { get; set; }
        public int ProjectAltId { get; set; }
        public string Pi { get; set; }//Primary Investigator
        public string Pm { get; set; }//PMO for the research Project
    }
}
