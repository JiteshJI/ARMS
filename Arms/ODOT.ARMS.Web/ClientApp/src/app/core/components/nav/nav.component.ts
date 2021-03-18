import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  // Turning off encapsulation so that we can apply css styles to the menu items
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  @Input() routeItems: any[];

  constructor() { }

  ngOnInit() {
  }

}
