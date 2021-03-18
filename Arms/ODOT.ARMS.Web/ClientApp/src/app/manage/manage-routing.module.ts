import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationViewComponent } from './component/adminstartion-view/administration-view.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { EditNotificationPageComponent } from './containers/edit-notification-page/edit-notification-page.component'
import { ConfigResolverService } from './services/config-resolver.service';


const routes: Routes = [
  
  //{ path: '', component: AdministrationViewComponent }
  {
    path: 'administration', component: AdminHeaderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-view' },
      {
        path: 'admin-view', data: { activeAdminTab: 'Administration' }, component: AdministrationViewComponent
      },
      {
        path: 'admin-notification', data: { activeAdminTab: 'Notification' }, component: EditNotificationPageComponent, resolve: { data: ConfigResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
