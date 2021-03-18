import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProject from '../../state/reducers';
import { ProjectHeader } from '../../models/project-header';

@Component({
  selector: 'app-prj-header',
  templateUrl: './prj-header.component.html',
  styles: []
})

export class PrjHeaderComponent implements OnInit {
  public activeTab$: Observable<string>;
  public project$: Observable<ProjectHeader>;
  public isNewProject$: Observable<boolean>;

  constructor(public projectStore: Store<fromProject.State>) {

  }

  ngOnInit() {
    this.activeTab$ = this.projectStore.select(fromProject.selectActiveTab);
    this.project$ = this.projectStore.select(fromProject.getProjectHeader);
    this.isNewProject$ = this.projectStore.select(fromProject.selectIsNewProject);
  }

}
