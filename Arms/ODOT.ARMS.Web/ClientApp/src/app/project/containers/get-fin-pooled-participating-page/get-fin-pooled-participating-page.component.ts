import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PooledParticipating } from '../../models/pooled-participating';
import * as fromPooledParticipating from '../../state/reducers/pooled-participating.reducer';
import * as fromPooledPartActions from '../../state/actions/pooled-participating.actions';
import * as fromPooledPartSelectors from '../../state/selector/pooled-pariticipating.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-get-fin-pooled-participating-page',
  templateUrl: './get-fin-pooled-participating-page.component.html'
})
export class GetFinPooledParticipatingPageComponent implements OnInit {
  public saveDialogStatus$: Observable<boolean>;
  public pooledPart$: Observable<PooledParticipating[]>;

  constructor(
    private pooledParticipatingStore: Store<fromPooledParticipating.ProjectPooledPartState>
  ) {}

  ngOnInit(): void {
    this.saveDialogStatus$ = this.pooledParticipatingStore.select(fromPooledPartSelectors.getSaveDialogStatus);
    this.pooledPart$ = this.pooledParticipatingStore.select(fromPooledPartSelectors.getAllPooledPart);
  }

  onSavePooledParticipating(pooledPart: PooledParticipating) {
    console.log(pooledPart);
    this.pooledParticipatingStore.dispatch(fromPooledPartActions.addProjectPooledPart({pooledParticipating: pooledPart}));
    this.pooledParticipatingStore.dispatch(fromPooledPartActions.setSavePooledPartDialog({showDialog: false}));

  }
  savePooledPart(dialogStatus: boolean) {
    this.pooledParticipatingStore.dispatch(fromPooledPartActions.setSavePooledPartDialog({showDialog: dialogStatus}));
  }
}
