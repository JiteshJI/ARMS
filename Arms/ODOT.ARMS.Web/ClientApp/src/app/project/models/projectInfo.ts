import { Deliverable } from './custom-deliverable';


export interface IProjectInfo {
  projectAltId: number;
  projectClassificationId: number;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  ideaNum: string;
  fedAuthNum: string;
  stateJobNum: string;
  agreementNum: string;
  pidNum: string;
  propFiscalYr: number;
  tpfNum: string;
  contractStartDt: Date;
  contractEndDt: Date;
  agencyId: number;
  agencyName: string;
  vendorIdTxt: string;
  addressCd: string;
  impStatusInd: string;
  standardDeliverableInd: string;
  projectDuration: number;
  currentEndDt: Date;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  withholdingAmount: number;
  projectTypeList: ProjectTypeList[];
  projectDeliverableList: ProjectDeliverableList[];

}
export class ProjectInfo implements IProjectInfo {
  projectAltId: number;
  projectClassificationId: number;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  ideaNum: string;
  fedAuthNum: string;
  stateJobNum: string;
  agreementNum: string;
  pidNum: string;
  propFiscalYr: number;
  tpfNum: string;
  contractStartDt: Date;
  contractEndDt: Date;
  agencyId: number;
  agencyName: string;
  vendorIdTxt: string;
  addressCd: string;
  impStatusInd: string;
  standardDeliverableInd: string;
  projectDuration: number;
  currentEndDt: Date;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  withholdingAmount: number;
  projectTypeList: ProjectTypeList[];
  projectDeliverableList: ProjectDeliverableList[];
}

export class ProjectTypeList {
  projectTypeId: string;

  constructor(typeId: string) {
    this.projectTypeId = typeId;
  }

}

export class ProjectDeliverableList {
  deliverableId: number;
  deliverableTxt: string;
  projAltId: number;
  projectDeliverableId: number;
  projectId: string;

   addDeliverable = (deliverable: Deliverable): ProjectDeliverableList => {
    const projectDeliverable: ProjectDeliverableList = null;
    projectDeliverable.deliverableId = null;
    projectDeliverable.deliverableTxt = deliverable.deliverableTxt;
    projectDeliverable.projAltId = deliverable.projAltId;
    projectDeliverable.projectDeliverableId = null;
    projectDeliverable.projectId = deliverable.projectId;
    return projectDeliverable;
  }
}

export class Addresscode {
  OaksVendorNo: string;
  addressseqno: string;
}

export enum ProjectClassificationEnum {
  STANDARD = 72,
  ROC = 73,
  ORIL = 74,
  POOLED = 75
}

export enum ProjectStatusEnum {
  Proposed = 108,
  Active = 109,
  Completed = 110,
  Cancelled = 111,
  Terminated = 112,
  Hold = 113,
  AwaitingFinalInvoice = 114
}

const addDeliverable = (deliverable: Deliverable): ProjectDeliverableList => {
  const projectDeliverable: ProjectDeliverableList = null;
  projectDeliverable.deliverableId = null;
  projectDeliverable.deliverableTxt = deliverable.deliverableTxt;
  projectDeliverable.projAltId = deliverable.projAltId;
  projectDeliverable.projectDeliverableId = null;
  projectDeliverable.projectId = deliverable.projectId;
  return projectDeliverable;
};

