import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EnvService } from '../../core/services/env.service';

import { GenericLookupListForDD, VendorAddressForDD } from '../models/project-for-update';
import { ProjectType, IProject, ProjectForSearch, Project } from '../models/projects';
import { WarehouseData } from '../models/project-for-update';
import { ProjectHeader, ProjectTypesEnum } from '../models/project-header';
import { PhaseRaw } from '../models/phase-raw';
import { ProjectSummary } from '../models/project-summary';
import { ProjectAbstract } from '../models/project-abstract';
import { ProjectInfo, ProjectClassificationEnum, ProjectStatusEnum } from '../models/projectInfo';
import { BudgetCategory, Budget } from '../models/budget';
import { Deliverable } from '../models/custom-deliverable';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {
  public _data = new BehaviorSubject<Project>({} as Project);
  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  shareProjectSelected(loadedProject: Project) {
    this._data.next(loadedProject);
  }
  // ******************************************ProjectForDD***************************************//
  getProjectStatus(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetProjectStatuses`,
        { headers: { 'Accept': 'application/vnd.dot.arms.projectstatusesfordd+json' } });
  }

  getCBStatus(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetCBStatus`,
        { headers: { 'Accept': 'application/vnd.dot.arms.cbstatusfordd+json' } });
  }

  getProjectTypes(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetProjectTypes`,
        { headers: { 'Accept': 'application/vnd.dot.arms.projecttypesfordd+json' } });
  }
  getPrimaryEvents(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetPrimaryEvents`,
        { headers: { 'Accept': 'application/vnd.dot.arms.primaryeventsfordd+json' } });
  }
  getSecondaryEvents(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetSecondaryEvents`,
        { headers: { 'Accept': 'application/vnd.dot.arms.secondaryeventsfordd+json' } });
  }

  getPhaseStatus(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetPhaseStatus`,
        { headers: { 'Accept': 'application/vnd.dot.arms.GetPhaseStatusfordd+json' } });
  }

  getVendorAddress(vendorId: string): Observable<VendorAddressForDD[]> {
    return this.http
      .get<VendorAddressForDD[]>(`${this.apiUrl}/ArmsVendorAddress/GetArmsVendorAddress/${vendorId}`,
        { headers: { 'Accept': 'application/vnd.dot.arms.armsvendoraddressfordd+json' } });
  }

  getCBType(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetCBTypes`,
        { headers: { 'Accept': 'application/vnd.dot.arms.cbtypesfordd+json' } });
  }
  getCBCategory(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetCBCategory`,
        { headers: { 'Accept': 'application/vnd.dot.arms.GetCBCategoryfordd+json' } });
  }

  // ******************************************Project Type***************************************//
  getAllProjectType(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(`${this.apiUrl}/ArmsProject/GetArmsProjectTypeList`,
      { headers: { 'Accept': 'application/vnd.dot.arms.projectTypeListfordd+json' } });
  }

  createProjectType(projectType: ProjectType): Observable<ProjectType> {
    return this.http.post<ProjectType>(`${this.apiUrl}/ArmsProject/AddArmsProjectType`, projectType, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.projectTypeforcreate+json'
      }
    });
  }

  deleteProjectType(projectId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ArmsProject/DeleteAllArmsProjectType`, projectId, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.projectTypefordelete+json'
      }
    });
  }

  updateProjectType(projectTypeId: string | number, changes: Partial<ProjectType>): Observable<any> {
    return this.http.put('/api/project/' + projectTypeId, changes);
  }


  // ******************************************Project***************************************//
  getAllProject(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiUrl}/ArmsProject/GetArmsProjectList`,
      { headers: { 'Accept': 'application/vnd.dot.arms.projectListfordd+json' } });
  }

  getProjectsForSearch(): Observable<ProjectForSearch[]> {
    return this.http.get<ProjectForSearch[]>(`${this.apiUrl}/Project/`,
      { headers: { 'Accept': 'application/vnd.dot.arms.projectsearch+json' } });
  }

  getSelectedProjectById(prjId: string): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiUrl}/ArmsProject/GetArmsProjectById/${prjId}`, {
      headers: {
        'Accept': 'application/vnd.dot.arms.projectByIdfordd+json'
      }
    });
  }

  getSelectedProjectByAltId(prjAltId: string): Observable<IProject> {
    return this.http.get<IProject>(`${this.apiUrl}/ArmsProject/GetArmsProjectById/${prjAltId}`, {
      headers: {
        'Accept': 'application/vnd.dot.arms.projectByIdfordd+json'
      }
    });
  }


  createProject(projectType: IProject): Observable<IProject> {
    return this.http.post<IProject>(`${this.apiUrl}/ArmsProject/AddArmsProject`, projectType, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.projectforcreate+json'
      }
    });
  }


  updateProject(projId: string | number, projectModel: Partial<IProject>): Observable<IProject> {
    if (projectModel != null && projectModel.projId != null) {
      return this.http
        .patch<IProject>(`${this.apiUrl}/ArmsProject/UpdateArmsProject`, projectModel, {
          headers: {
            'Content-Type': 'application/vnd.dot.arms.projectforupdate+json'
          }
        });
    }
  }


  // ******************************************Project***************************************//
  getWarehouseDetailsById(pid: number): Observable<WarehouseData> {
    return this.http
      .get<WarehouseData>(`${this.apiUrl}/Project/${pid}`,
        { headers: { 'Accept': 'application/vnd.dot.arms.getWarehousDetailById+json' } });
  }

  getContactRoles(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetContactRoles`,
        { headers: { 'Accept': 'application/vnd.dot.arms.contactrolesfordd+json' } });
  }

  getContactNames(): Observable<GenericLookupListForDD[]> {
    return this.http
      .get<GenericLookupListForDD[]>(`${this.apiUrl}/ArmsGenericLookupList/GetContactNames`,
        { headers: { 'Accept': 'application/vnd.dot.arms.contactnamesfordd+json' } });

  }
  getSelectedProjectByProjectAltId(projectAltId: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/ArmsProject/GetArmsProjectByProjAltId?projAltId=${projectAltId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.projectByIdfordd+json' } });
  }

  // ================================================= ALEX CODE ====================================================================================
  getProjectHeaderById(prjAltId: string): Observable<ProjectHeader> {
    return this.http.get<ProjectHeader>(`${this.apiUrl}/Project/${prjAltId}`,
      {
        headers: {
          'Accept': 'application/vnd.dot.arms.projectheaderbyaltid+json'
        }
      });
  }

  // =============================================== PHILIPPE! CODE ===================================================================================
  // Create a dummy Header
  // with a populated Header type
  //
  getNewProjectHeader(prjTypeId: string): Observable<ProjectHeader> {
    const prjHeader = new ProjectHeader();
    prjHeader.projectType = ProjectTypesEnum[+prjTypeId];
    return of(prjHeader);
  }

  // ================================== ALEX CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getPhaseList(prjId: string): Observable<PhaseRaw[]> {
    return this.http
      .get<PhaseRaw[]>(`${this.apiUrl}/Project/${prjId}`,
        { headers: { 'Accept': 'application/vnd.dot.arms.projectphaselistbyid+json' } });
  }

  // ******************************************Project Current Summary***************************************//

  getProjectSummaryByProjectAltId(projectAltId: string): Observable<ProjectSummary> {
    return this.http.get<ProjectSummary>(
      `${this.apiUrl}/Project/${projectAltId}`,
      { headers: { Accept: 'application/vnd.dot.arms.projectsummarybyaltid+json' } }
    );
  }

  addNewProjectSummary(currentSummary: ProjectSummary): Observable<ProjectSummary> {
    return this.http.post<ProjectSummary>(`${this.apiUrl}/Project`, currentSummary, {
      headers: { 'Content-Type': 'application/vnd.dot.arms.projectsummaryforcreate+json' }
    });
  }

  updateProjectSummary(currentSummary: ProjectSummary): Observable<ProjectSummary> {
    console.log(currentSummary);
    return this.http.patch<ProjectSummary>(`${this.apiUrl}/Project`, currentSummary, {
      headers: { 'Content-Type': 'application/vnd.dot.arms.projectsummaryforupdate+json' }
    });
  }

  // ******************************************Project Abstract**********************************************//

  getProjectAbstractByProjectAltId(projectAltId: string): Observable<ProjectAbstract> {
    console.log('project abstract - in service', projectAltId);
    return this.http.get<ProjectAbstract>(`${this.apiUrl}/Project/${projectAltId}`, {
      headers: { Accept: 'application/vnd.dot.arms.projectabstractbyaltid+json' }
    });
  }

  updateProjectAbstract(projectAbstract: ProjectAbstract): Observable<ProjectAbstract> {
    console.log('update abstract service', projectAbstract);
    return this.http.patch<ProjectAbstract>(`${this.apiUrl}/Project`, projectAbstract, {
      headers: { 'Content-Type': 'application/vnd.dot.arms.projectabstractforupdate+json' }
    });
  }

  // ******************************************Project Info *************************************************/

  updateProjectInfo(project: ProjectInfo): Observable<ProjectInfo> {
    return this.http.patch<ProjectInfo>(`${this.apiUrl}/Project`, project, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.projectforupdate+json'
      }
    });
  }

  createProjectInfo(project: ProjectInfo): Observable<ProjectInfo> {
    return this.http.post<ProjectInfo>(`${this.apiUrl}/Project`, project, {
      headers: {
        'Content-Type': 'application/vnd.dot.arms.projectforcreate+json'
      }
    });
  }

  getProjectInfoByProjectAltID(projectAltId: string): Observable<ProjectInfo> {
    return this.http.get<ProjectInfo>(`${this.apiUrl}/Project/${projectAltId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.projectInfoByAltId+json' } });
  }

  getAllDeliverablesByProject(projectAltId: string): Observable<Deliverable[]> {
    return this.http.get<Deliverable[]>(`${this.apiUrl}/CustomDeliverables/${projectAltId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.alldeliverablesByproject+json' } });
  }

  getParam(Param$: Observable<string>): string {
    let param: string;
    Param$.pipe(take(1)).subscribe(Parameter => param = Parameter);
    return param;
  }

  getParamBool(Param$: Observable<boolean>): boolean {
    let param: boolean;
    Param$.pipe(take(1)).subscribe(Parameter => param = Parameter);
    return param;
  }

  getProjectTypeName(projectClassification: string) {
    for (const projectClassify of projectClassification) {
      switch (+projectClassify) {
        case ProjectClassificationEnum.STANDARD:
          return 'STANDARD';
        case ProjectClassificationEnum.ROC:
          return 'ROC';
        case ProjectClassificationEnum.ORIL:
          return 'ORIL';
        case ProjectClassificationEnum.POOLED:
          return 'POOLED';
        default:
          return 'N/A';
      }
    }
  }

  public isValid(str) {
    return !/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._ ~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }

  public monthDiff(dateFrom: Date, dateTo: Date): number {
    console.log('In the monthDiff function');
    console.log(dateFrom, dateTo);
    if (!dateFrom && !dateTo) {
      return null;
    }

    const calculateValue = dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    console.log(calculateValue);
    return calculateValue;
  }

  validateValues(validationField: string, value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/Project/${validationField}/${value}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.validateValues' } });
  }

  public disableImplStatus(statusId: any) {
    let disabledStatus = true;
    if (statusId && statusId === ProjectStatusEnum.Completed) {
      disabledStatus = false;
    }
    return disabledStatus;
  }

  public disableStdDeliverableStatus(statusId: any) {
    let disabledStatus = true;
    if (statusId && statusId === ProjectStatusEnum.Active) {
      disabledStatus = false;
    }
    return disabledStatus;
  }


// ******************************************Project Budget**********************************************//

// getBudgetCategoriesByProject(projectId: string): Observable<BudgetCategory[]> {
//  return this.http
//    .get<BudgetCategory[]>(`${this.apiUrl}/ArmsBudget/${projectId}`,
//      { headers: { 'Accept': 'application/vnd.dot.arms.armsbudgetcategorybyprojectid+json' } });
// }
getBudgetByProjectId(projectId: string): Observable < Budget[] > {
  return this.http
    .get<Budget[]>(`${this.apiUrl}/ArmsBudget/GetArmsBudgetByProjectId/${projectId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.armsbudgetbyprojectId+json' } });
}

  // ******************************************Project Budget**********************************************//
}
