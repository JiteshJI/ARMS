import { Component, OnInit, NgModule, ViewChild, Output, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProjectAbstract } from '../../models/project-abstract';
import { Observable } from 'rxjs';
import * as fromProject from "../../state/reducers";
import { take } from 'rxjs/operators';
import * as fromProjectAbstract from '../../state/reducers/edit-project-abstract-page.reducer';
import * as fromProjectAbstractSelectors from '../../state/selector/project-abstract.selectors';
import * as fromProjectAbstractActions from '../../state/actions/edit-project-abstract-page.actions';

@Component({
  selector: 'edit-prj-abstract',
  templateUrl: './edit-prj-abstract.component.html',
  styles: [
  ],
})
export class EditPrjAbstractComponent implements OnInit {
  public projectAltId: string;
  public projectAbstract$: Observable<ProjectAbstract>;
  public projectAltId$: Observable<string>;

  constructor(public projectStore: Store<fromProject.State>,
    public projectAbstractStore: Store<fromProjectAbstract.State>) { }

  ngOnInit() {
    this.projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projectAltId$.pipe(take(1))
      .subscribe((projectAltId) => {
        this.projectAltId = projectAltId;
      })
    this.projectAbstract$ = this.projectAbstractStore.pipe(select(fromProjectAbstractSelectors.selectProjectAbstractById(this.projectAltId)));
  }

  public saveAbstract(abstract: ProjectAbstract) {
    this.projectAbstractStore.dispatch(fromProjectAbstractActions.updateProjectAbstract({ newAbstract: abstract }));
  }
}
