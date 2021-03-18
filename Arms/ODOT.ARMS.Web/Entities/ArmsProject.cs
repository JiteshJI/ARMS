using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ODOT.ARMS.Web.Entities
{
    public partial class ArmsProject
    {
        public int? ProjectClassificationId { get; set; }
        public int? ProjectStatusId { get; set; }
        public string ProjectTitleTxt { get; set; }
        public string RfpNum { get; set; }
        public string IdeaNum { get; set; }
        public string FedAuthNum { get; set; }
        public string StateJobNum { get; set; }
        public string AgreementNum { get; set; }
        public string PidNum { get; set; }
        public string PropFiscalYr { get; set; }
        public string TpfNum { get; set; }
        public DateTime? ContractStartDt { get; set; }
        public DateTime? ContractEndDt { get; set; }
        public int? AgencyId { get; set; }
        public string VendorIdTxt { get; set; }
        public string AddressCd { get; set; }
        public string ImpStatusInd { get; set; }
        public string StandardDeliverableInd { get; set; }
        public int? ProjectDuration { get; set; }
        public DateTime? CurrentEndDt { get; set; }
        public string SummaryTxt { get; set; }
        public string GoalsTxt { get; set; }
        public string ActiveInd { get; set; }
        public Guid ProjId { get; set; }
        public string UserId { get; set; }
        public DateTime EntryDt { get; set; }
        public string ObjectiveTxt { get; set; }
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int ProjectAltId { get; set; }

        public Int64? WithholdingAmount { get; set; }

        public virtual ArmsAgency Agency { get; set; }
        public virtual ArmsAdministrationCategory ProjectClassification { get; set; }
        public virtual ArmsAdministrationCategory ProjectStatus { get; set; }

        public virtual ICollection<ArmsPersonnel> ArmsPersonnel { get; set; }
        public virtual ICollection<ArmsProjectType> ArmsProjectType { get; set; }
    }
}
