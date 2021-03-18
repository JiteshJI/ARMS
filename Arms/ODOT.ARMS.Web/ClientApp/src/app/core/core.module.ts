import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SharedModule } from '../shared/shared.module';
import { ShellPageComponent } from '../core/containers/shell-page/shell-page.component';
import { PageNotFoundPageComponent } from '../core/containers/page-not-found-page/page-not-found-page.component';
import { HomePageComponent } from '../core/containers/home-page/home-page.component';
import { HomeComponent } from './components/home/home.component';
// @ts-ignore
import { } from 'automapper-ts';
import { ProjectNavigationComponent } from './containers/project-navigation/project-navigation.component';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from '../project/state/reducers/project.reducer';
import { reducers as projectsReducer } from '../project/state/reducers/';
import { reducers } from './state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProjectTypeEffects } from '../project/state/effects/projects.effects';
import { ProjectSearchComponent } from './containers/project-search/project-search.component';
import { Agencyreducer } from '../agency/state/reducers/agencies.reducer';
import { AgencyEffects } from '../agency/state/effects/agency.effects';
//import { ProjectForDDreducer } from '../project/state/reducers/projectForDD.reducer';
import { ProjectForDDEffects } from '../project/state/effects/projectForDD.effects';
import { ProjectForDDreducer } from '../project/state/reducers/projectForDD.reducer';
import { CoreEffects } from './state/effects/core.effects';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';



@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('project', projectReducer),
    StoreModule.forFeature('projects', projectsReducer),
    StoreModule.forFeature('agency', Agencyreducer),
    StoreModule.forFeature('projectForDD', ProjectForDDreducer),
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([ProjectTypeEffects, AgencyEffects, ProjectForDDEffects, CoreEffects])
  ],
  declarations: [
    NavComponent,
    SpinnerComponent,
    ShellPageComponent,
    PageNotFoundPageComponent,
    HomePageComponent,
    HomeComponent,
    ProjectNavigationComponent,
    ProjectSearchComponent,
    LoginComponent,
    LoginPageComponent
  ],
  exports: [
    NavComponent,
    SpinnerComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
