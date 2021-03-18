using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ODOT.ARMS.Web.DTOs
{
    public class ProjectHeader
    {
        public string ProjectTitleTxt { get; set; }
        public string RfpNum { get; set; }
        public string AgreementNum { get; set; }
        public string PidNum { get; set; }
        public Guid ProjId { get; set; }
        public int ProjectAltId { get; set; }
        public string ProjectType { get; set; }
    }
}
