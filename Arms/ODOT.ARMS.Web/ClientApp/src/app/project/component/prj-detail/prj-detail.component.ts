import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prj-detail',
  templateUrl: './prj-detail.component.html',
  styles: []
})
export class PrjDetailComponent implements OnInit {
  public activeTab$: Observable<string>;
  //public project$: Observable<Project>;

  constructor() { }

  ngOnInit() {
  }

}
