import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modifications-base',
  templateUrl: './modifications-base.component.html',
  styles: [
  ],
})
export class ModificationsBaseComponent implements OnInit {

  @Input() frmId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
