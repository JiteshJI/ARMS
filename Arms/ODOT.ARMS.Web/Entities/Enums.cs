using ODOT.ARMS.Web.Entities.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;


public enum ProjectTypeEnum
{
    [Description("STANDARD")]
    Standard = 72,
    [Description("ROC")]
    Roc = 73,
    [Description("ORIL")]
    Oril = 74,
    [Description("POOLED-PARTICIPANT")]
    PooledParticipant = 75,
    [Description("POOLED-LEAD")]
    PooledLead = 76
}

public enum EventStatusEnum
{
    [CodeDescription("A", "Active")]
    Active,
    [CodeDescription("C", "Completed")]
    Completed,
    [CodeDescription("I", "Inactive")]
    Inactive
}

public enum PhaseStatusEnum
{
    [CodeDescription("A", "Authorized")]
    Authorized,
    [CodeDescription("C", "Cancelled")]
    Cancelled,
    [CodeDescription("P", "Proposed")]
    Proposed
}
