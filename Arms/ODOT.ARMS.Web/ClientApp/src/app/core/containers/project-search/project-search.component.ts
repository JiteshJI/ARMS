import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import * as fromProject from "../../../project/state/reducers/";
import * as  fromProjectAction from '../../../project/state/actions/project.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GenericLookupListForDD } from 'src/app/project/models/project-for-update';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProjectForSearch } from '../../../project/models/projects';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class ProjectSearchComponent implements OnInit, OnDestroy {
  private componentDestroyed$: Subject<void> = new Subject();
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public searchValue: string;
  projects: ProjectForSearch[];
  user: string = null;
  data: ProjectForSearch[] = [];
  public projectStatusList: Array<GenericLookupListForDD>;
  public selectedSearchParam: { text: string, value: string } = { text: 'Search By', value: null };
  public searchParams = [
    { text: 'RFP', value: 'rfpNum', type: 'string' },
    { text: 'PID', value: 'pidNum', type: 'string' },
    { text: 'Title', value: 'projectTitleTxt', type: 'string' },
    { text: 'Project Type', value: 'prjType', type: 'string' },
    { text: 'Project AltID', value: 'projectAltId', type: 'number' },
    { text: 'Agency', value: 'agencyTxt', type: 'string' }
  ];

  public model = {
    prjSearch: 'M',
    prjState: 'AP'
  };

  public StatusId: { activeId?: number, proposedId?: number } = { activeId: null, proposedId: null };

  public searchModel: { searchBy?: string, type?: string, projectStatus?: string, projectVisibility?: string } = {
    projectVisibility: 'M',
    projectStatus: 'AP'
  };





  constructor(public projectStore: Store<fromProject.State>,
    public router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects() {

    this.projectStore.dispatch(fromProjectAction.loadProjectsForSearch());
    this.projectStore.select(fromProject.getProjectsForSearch)
    .pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(projects => {
        if (projects && projects.length > 0) {
          this.data = [];
          this.projects = projects;
          this.doSearch();
        }
      })
  }

  public onFilter(evt: string) {
    this.searchValue = evt.trim().toLowerCase();
  }

  public onClear() {
    this.searchValue = '';
    this.selectedSearchParam = { text: 'Search By', value: null };
    //clear search parameters and keep only radio filter on
    var byUser = this.filterProjectsByUser(this.projects);
    this.data = this.filterProjectsByStatus(byUser);
  }

  public radioStatusClick(radioevent) {
    this.model.prjState = radioevent.target.value;
    this.doSearch();
  }

  public radioByUserClick(radioevent) {
    this.model.prjSearch = radioevent.target.value;
    this.doSearch();
  }

  private filterProjectsByUser(projects: ProjectForSearch[]) {

    if (this.searchModel.projectVisibility == 'M') {
      return projects.filter(e => e.userId.toLowerCase() == this.user?.toLowerCase() || this.user == null).slice();
    }
    return projects;
  }

  public onPrint() { }

  private filterProjectsByStatus(projects: ProjectForSearch[]) {

    //filter dataset logic based on status
    if (this.searchModel.projectStatus == 'AP') {
      return projects.filter(e => e.projectStatusTxt?.toLowerCase() == 'Active'.toLowerCase() || e.projectStatusTxt?.toLowerCase() == 'Proposed'.toLowerCase()).slice();
    }
    return projects;
  }

  public doSearch() {
    var filteredProjects = this.projects.slice();
    this.searchModel = { ...this.searchModel, projectStatus: this.model.prjState, projectVisibility: this.model.prjSearch };
    filteredProjects = this.filterProjectsByUser(filteredProjects);
    filteredProjects = this.filterProjectsByStatus(filteredProjects);

    switch (typeof (this.searchModel?.type)) {
      case 'string':
        if (this.searchModel.searchBy != null && this.searchValue != undefined) {
          filteredProjects = filteredProjects.filter(e => JSON.stringify(e[this.searchModel.searchBy])?.toLowerCase().includes(this.searchValue)).slice();
        }
        break;
      case 'number':
        filteredProjects = filteredProjects.filter(e => this.searchValue == e[this.searchModel.searchBy]).slice();
        break;
      default:
        break;
    }
    this.data = filteredProjects;
  }

  public handleSearchBy(event) {
    this.searchModel = { searchBy: event.value, type: event.type };
  }

  public onItemSelect(dataItem) {
    this.router.navigate(['/project', 'edit', dataItem.projectAltId, 'prj', 'info']);
  }

  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if ((element.nodeName === 'TD' || element.nodeName === 'TH')
      && element.offsetWidth < element.scrollWidth) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
