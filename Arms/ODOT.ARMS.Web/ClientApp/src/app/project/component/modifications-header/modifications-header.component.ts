import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modifications-header',
  templateUrl: './modifications-header.component.html',
  styles: [
  ],
})
export class ModificationsHeaderComponent implements OnInit {
  public activeTab$: Observable<string>;
  public activeTabText: string = "modifications";
  constructor() { }

  ngOnInit(): void {
  }

}
