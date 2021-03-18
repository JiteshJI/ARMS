import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell-page',
  templateUrl: './shell-page.component.html',
  styles: [`
  .information {
    margin: 0 0 20px;
    padding: 20px;
    background-color: rgba(0,0,0,.03);
    border: 1px solid rgba(0,0,0,.08);
  }
  `]
})
export class ShellPageComponent implements OnInit {
  public routeItems: any[] =
    [
      { text: 'ARMS 3.0', path: '/home' },
      // tslint:disable-next-line: max-line-length
      {
        text: 'Project',
        items: [
          {
            text: 'New', path: '', items: [
              { text: 'Standard Project', path: '/project/new/72' },
              { text: 'Researcher On Call(ROC)', path: '/project/new/73' }, 
              { text: 'ORIL Project', path: '/project/new/74' },
              { text: 'Pooled Funding Participant', path: '/project/new/75' },
              { text: 'Pooled Funding Lead', path: '/project/new/76' }
            ]
          },
          { text: 'Search', path: '/project/search' }
        ]
      },
      {
        text: 'Manage', items: [
          { text: 'Administration', path: '/manage/administration' },
          { text: 'Agency', path: '/manage/agency' },
          { text: 'Contacts', path: '/manage/contacts' }//,
         // { text: 'Notifications', path: '' }
        ]
      },
      { text: 'Reports', items: [{ text: 'Report menu', path: '', items: [{ text: 'Show Reports', path: '' }, { text: 'Manage', path: '' }] }] },
      {
        text: 'Alerts', items: [
          { text: 'Deliverables', path: '' },
          { text: 'Meetings', path: '' },
          { text: 'Project', path: '' },
          { text: 'Show All', path: '' }
        ]
      },
      //    { text: 'Users', image: 'fas fa-users', items: [{ text: 'Manage Users', path: '/maintenance/users' }] },
      // { text: 'Test Module', path: '/test' },
      { text: 'User is Logged in', image: 'fas fa-user', items: [{ text: 'Logout', path: '' }] }
    ];
  constructor() { }

  ngOnInit() {

  }
}
