using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class ProjectCurrentSummary
    {
        public int ProjectAltId { get; set; }
        public string SummaryTxt { get; set; }
        public Guid ProjId { get; set; }
        public string UserId { get; set; }
    }
}