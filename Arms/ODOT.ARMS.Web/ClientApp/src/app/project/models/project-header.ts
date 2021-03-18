export class ProjectHeader {
  projId: string;
  projectAltId: number;
  projectTitleTxt: string;
  projectType: string;
  rfpNum: string;
  agreementNum: string;
  pidNum: string;
}


export enum ProjectTypesEnum {
  STANDARD = 72,
  ROC = 73,
  ORIL = 74,
  'POOLED-PARTICIPANT' = 75,
  'POOLED-LEAD'=76
}
