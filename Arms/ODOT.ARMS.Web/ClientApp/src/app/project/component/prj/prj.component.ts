import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProject from "../../state/reducers";


@Component({
  selector: 'app-prj',
  templateUrl: './prj.component.html',
  styleUrls: ['./prj.component.scss']
})

export class PrjComponent implements OnInit {
  public activeProjectTab$: Observable<string>;
  public isNewProject$: Observable<boolean>;

  constructor( public projectStore: Store<fromProject.State>)
  {

  }

  ngOnInit() {
    this.activeProjectTab$ = this.projectStore.select(fromProject.selectActiveProjectTab);
    this.isNewProject$ = this.projectStore.select(fromProject.selectIsNewProject); 
  }

}
