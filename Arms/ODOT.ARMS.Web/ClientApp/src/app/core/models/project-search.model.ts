export interface IProjectSearchModel {
    user: string,
    projectAltId: number,
    pm?: string,
    pi?: string,
    rfpNum: string,
    pidNum: string,
    agencyTxt: string,
    prjType: string,
    projectTitleTxt: string,
    status: string,
    projectStatusId: number
}

export class ProjectSearchModel implements IProjectSearchModel {
    user: string;
    projectAltId: number;
    pm?: string;
    pi?: string;
    rfpNum: string;
    pidNum: string;
    agencyTxt: string;
    prjType: string;
    projectTitleTxt: string;
    status: string;
    projectStatusId: number;

}