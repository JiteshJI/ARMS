import { AdministrationCategoryRaw } from '../../manage/models';
import { IGenericLookupListForDD } from './project-for-update';



export interface Item {
  text: string;
  value: string;
}

export interface PrjID {
  text: string;
}

/*
export interface ContactInfo {
  contactName: string;
  RoleInfo: string;
}
*/

export interface IProjectType {
  projectTypeId: number;
  projectId: string;
  userId: string;
  entryDate: Date;
}

export class ProjectType implements IProjectType {
  public projectTypeId: number;
  public projectId: string;
  public userId: string;
  public entryDate: Date;
}


export class PassProjectData {
  projectAltId: number;
  rfpNumber: string;
  projectTypeId: string;
  projectType: string;
  prjId: string;
}

// **********************Project**************************************///

export interface IProject {
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
  propFiscalYr: string;
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
  summaryTxt: string;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  projectTypeList: Array<IGenericLookupListForDD>;
}
export class Project implements IProject {
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
  propFiscalYr: string;
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
  summaryTxt: string;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  projectTypeList: Array<IGenericLookupListForDD>;
}


export class ProjectForSearch {
  projectAltId: number;
  projectClassificationId: number;
  projectType: string;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  pidNum: string;
  agencyName: string;
  projId: string;
  userId: string;
}


// **********************Project**************************************///
