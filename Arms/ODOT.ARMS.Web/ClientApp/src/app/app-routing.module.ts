import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellPageComponent } from './core/containers/shell-page/shell-page.component';
import { PageNotFoundPageComponent } from './core/containers/page-not-found-page/page-not-found-page.component';
import { HomePageComponent } from './core/containers/home-page/home-page.component';
import { ProjectNavigationComponent } from './core/containers/project-navigation/project-navigation.component';//
import { ProjectSearchComponent } from './core/containers/project-search/project-search.component';
import { LoginPageComponent } from './core/containers/login-page/login-page.component';


const routes: Routes = [
  {
    path: '', component: ShellPageComponent,
    children: [
      {
        path: '',
        children: [
          //{ path: 'home', component: HomePageComponent },
          {
            path: 'home', component: HomePageComponent
          },

          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
      
      { path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
 //     { path: 'agency/agencies', loadChildren: () => import('./agency/agency.module').then(m => m.AgenciesModule) },
      { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
     // { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
      //{ path: 'project/roc/new', data: { PrjType: 'ROC' }, loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
      //{ path: 'project/standard/new', data: { PrjType: 'STANDARD' }, loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
      //{ path: 'project/pooled/new', data: { PrjType: 'POOLED' }, loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
      //{ path: 'project/oril/new', data: { PrjType: 'ORIL' }, loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },  
      //{ path: 'manage', component: ListAdministrationComponent },
      { path: 'manage/agency', loadChildren: () => import('./agency/agency.module').then(m => m.AgenciesModule) },
      { path: 'manage/contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
      { path: 'project/search', component: ProjectSearchComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: '**', component: PageNotFoundPageComponent }   
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
