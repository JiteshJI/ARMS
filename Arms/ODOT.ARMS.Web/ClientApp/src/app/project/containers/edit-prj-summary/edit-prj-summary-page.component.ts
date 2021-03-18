import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectSummary } from '../../models/project-summary';
import * as fromProjectSummary from '../../state/reducers/project-summary.reducer';
import * as fromProjectSelectors from '../../state/selector/project-currentsummmary.selectors';
import * as fromProjectSummaryActions from '../../state/actions/project-currentsummary.actions';
import * as fromProject from '../../state/reducers';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-prj-summary-page',
  templateUrl: './edit-prj-summary-page.component.html'
})
export class EditPrjSummaryPageComponent implements OnInit {

  public selectedSummary$: Observable<ProjectSummary>;
  public currentSummary: ProjectSummary;
  //public maxChars = 500;
  public projAltId: string;
  public projectAltId$: Observable<string>;


  constructor(
    private projectSummaryStore: Store<fromProjectSummary.ProjectSummaryState>,
    public projectStore: Store<fromProject.State>,

  ) {}
  ngOnInit(): void {
    console.log('Starting the edit summary page container component');
    this.projectAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projectAltId$.pipe(take(1))
                      .subscribe((projaltId) => {
                                  this.projAltId = projaltId;
                                  console.log(this.projAltId);
                                  });
    console.log(this.projectAltId$);
    console.log(this.projAltId);

    this.selectedSummary$ = this.projectSummaryStore.pipe(select(fromProjectSelectors.selectProjCurrentSummById(this.projAltId)));
  }


  public saveCurrSummary(currentSummmary: ProjectSummary) {
    console.log(' saveCurrSummary method called');
    console.log(currentSummmary);
    this.projectSummaryStore.dispatch(fromProjectSummaryActions.UpdateProjectSummary({currentSummary: currentSummmary}) );

  }
}
