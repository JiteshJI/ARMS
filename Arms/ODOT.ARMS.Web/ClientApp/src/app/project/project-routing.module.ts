import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrjComponent } from './component/prj/prj.component';
import { EditPrjAbstractComponent } from './containers/edit-prj-abstract/edit-prj-abstract.component';
// import { PrjAbstractComponent } from './component/prj-abstract/prj-abstract.component';
import { PrjInfoPageComponent } from './containers/prj-info/prj-info-page.component';
import { PrjHeaderComponent } from './component/prj-header/prj-header.component';
import { FinancialHeaderComponent } from './component/financial-header/financial-header.component';
import { FinancialOverviewComponent } from './component/fin-overview/fin-overview.component';
// import { FinancialInvoicesComponent } from './component/financial-invoices/financial-invoices.component';
import { EditFinInvoicePageComponent } from './containers/edit-fin-invoice-page/edit-fin-invoice-page.component';
import { DialogEntryComponent } from './component/financial-invoices/invoice-dialog/invoice-dialog.component';
import { FinancialDeductionsComponent } from './component/financial-deductions/financial-deductions.component';
import { ModificationsHeaderComponent } from './component/modifications-header/modifications-header.component';
// import { PrjUploadsComponent } from './component/prj-uploads/prj-uploads.component';
import { EditPrjUploadsPageComponent } from './containers/edit-prj-uploads-page/edit-prj-uploads-page.component';
// import { PrjCbComponent } from './component/prj-cb/prj-cb.component';
import { EditPrjCbPageComponent } from './containers/edit-prj-cb-page/edit-prj-cb-page.component';
// import { PrjPhaseComponent } from './component/prj-phase/prj-phase.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate.guard';
// import { PrjEventsComponent } from './component/prj-events/prj-events.component';
// import { EditPrjEventsComponent } from './containers/edit-prj-events/edit-prj-events.component';
import { PrjPersonnelComponent } from './component/prj-personnel/prj-personnel.component';
import { FinancialLedgerComponent } from './component/financial-ledger/financial-ledger.component';
// import { FinancialFundingComponent } from './component/financial-funding/financial-funding.component';
import { ModificationsComponent } from './component/modifications/modifications.component';
import { EditPrjSummaryPageComponent } from './containers/edit-prj-summary/edit-prj-summary-page.component';
import { ProjectCurrentSummaryResolver } from './services/project-summary.resolver.service';
// import { ModificationsBudgetComponent } from './component/modifications-budget/modifications-budget.component';
// import { ModificationsPersonnelComponent } from './component/modifications-personnel/modifications-personnel.component';
// import { PrjPersonnelComponent } from './component/prj-personnel/prj-personnel.component';
// ======================================== ALEX CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { EditFinInvoiceResolverService } from './services/edit-fin-invoice-resolver.service';
import { ProjectShellResolverService } from './services/project-shell-page-resolver.service';
import { NewProjectShellResolverServiceService } from './services/new-project-shell-resolver-service.service';
import { EditProjectEventsResolverService } from './services/edit-project-events-resolver.service';
import { EditProjectFundingResolverService } from './services/edit-fin-funding-resolver.service';
import { EditPrjCbResolverService } from './services/edit-prj-cb-resolver.service';
import { EditPrjEventsPageComponent } from './containers/edit-prj-events-page/edit-prj-events-page.component';
import { EditPrjPhasePageComponent } from './containers/edit-prj-phase/edit-prj-phase-page.component';
import { EditProjectPhaseResolverService } from './services/edit-project-phase-resolver.service';
import { EditProjectAbstractResolverService } from './services/edit-project-abstract-resolver.service';
import {ProjectInfoResolver} from './services/project-info.resolver.service';
import { EditPrjBudgetPageComponent } from './containers/edit-prj-budget-page/edit-prj-budget-page.component';
import { EditFinFundingPageComponent } from './containers/edit-fin-funding-page/edit-fin-funding-page.component';
import { EditProjectBudgetResolverService } from './services/edit-project-budgetCategory-resolver.service';
import { EditProjectUploadsResolverService } from './services/edit-project-uploads-resolver.service';
import {PersonnelResolverService} from './services/personnel.resolver';
import { PrjPersonnelPageComponent } from './containers/prj-personel/prj-personnel-page.component';
import { FinLedgerResolverService } from './services/get-fin-ledger-resolver.service';
import { GetFinLedgerPageComponent } from './containers/get-fin-ledger-page/get-fin-ledger-page.component';
import { FinOverviewResolverService } from './services/get-fin-overview-resolver.service';
import { GetFinOverviewPageComponent } from './containers/get-fin-overview-page/get-fin-overview-page.component';
import { GetFinPooledParticipatingPageComponent } from './containers/get-fin-pooled-participating-page/get-fin-pooled-participating-page.component';

const routes: Routes = [
  {
    path: 'edit',
    children: [
      {
        path: ':projectAltId', component: PrjHeaderComponent, resolve: { data: ProjectShellResolverService},
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'prj' },
          {
            path: 'prj', component: PrjComponent, data: { activeTab: 'Project', isNew: false },
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'info' },
              { path: 'currentSummary', component: EditPrjSummaryPageComponent, data: { activeProjectTab: 'Current Summary' }, resolve: { data: ProjectCurrentSummaryResolver } },
              { path: 'abstract', component: EditPrjAbstractComponent, data: { activeProjectTab: 'Abstract' }, resolve: { data: EditProjectAbstractResolverService } },
              // { path: 'abstract', component: EditPrjAbstractComponent, data: { activeProjectTab: 'Abstract' }, canDeactivate: [CanDeactivateGuard] },
              { path: 'info', component: PrjInfoPageComponent, data: { activeProjectTab: 'Information' }, resolve: { data: ProjectInfoResolver } },
              // { path: 'cb', component: PrjCbComponent, canDeactivate: [CanDeactivateGuard] },
              // { path: 'phase', component: PrjPhaseComponent, data: { activeProjectTab: 'Phase' }, canDeactivate: [CanDeactivateGuard] },
              { path: 'phase', component: EditPrjPhasePageComponent, data: { activeProjectTab: 'Phase' }, resolve: { data: EditProjectPhaseResolverService } },
              // { path: 'events', component: PrjEventsComponent, canDeactivate: [CanDeactivateGuard] },EditPrjEventsPageComponent
              // { path: 'events', component: EditPrjEventsComponent, resolve: { data: EditProjectEventsResolverService }, canDeactivate: [CanDeactivateGuard] },
              { path: 'events', component: EditPrjEventsPageComponent, data: { activeProjectTab: 'Events' }, resolve: { data: EditProjectEventsResolverService } }, // This probably does nor need a guard
              { path: 'personnel', component: PrjPersonnelPageComponent, data: { activeProjectTab: 'Personnel' }, resolve: { data: PersonnelResolverService } },
              { path: 'uploads', component: EditPrjUploadsPageComponent, data: { activeProjectTab: 'Uploads' }, resolve: { data: EditProjectUploadsResolverService} }
            ]
          },
          {
            path: 'finance', component: FinancialHeaderComponent, data: { activeTab: 'Finance', isNew: false },
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'fin-overview' },
              { path: 'fin-overview', component: GetFinOverviewPageComponent, data: { activeFinanceTab: 'Overview' }, resolve: { data: FinOverviewResolverService } },
              // { path: 'fin-budget', component: FinancialBudgetComponent, data: { activeFinanceTab: 'Budget' } },
              { path: 'fin-budget', component: EditPrjBudgetPageComponent, data: { activeFinanceTab: 'Budget' }, resolve: { data: EditProjectBudgetResolverService} },
              { path: 'fin-funding', component: EditFinFundingPageComponent, data: { activeFinanceTab: 'Funding' }, resolve: { data: EditProjectFundingResolverService} },
              {
                path: 'fin-invoices', component: EditFinInvoicePageComponent, data: { activeFinanceTab: 'Invoices' }, resolve: { data: EditFinInvoiceResolverService} },
              { path: 'fin-ledger', component: GetFinLedgerPageComponent, data: { activeFinanceTab: 'Ledger' }, resolve: { data: FinLedgerResolverService } },
              { path: 'fin-cb', component: EditPrjCbPageComponent, data: { activeFinanceTab: 'ControllingBoard' }, resolve: { data: EditPrjCbResolverService } },
              { path: 'fin-pooled-participating', component: GetFinPooledParticipatingPageComponent, data: { activeFinanceTab: 'ParticipatingAmounts'}}
            ]
          },
          {
            path: 'modifications', component: ModificationsHeaderComponent, data: { activeTab: 'Modifications', isNew: false },
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'mod-funding' },
              { path: 'mod-funding', component: ModificationsComponent }// , children:[
              //    { path: '', pathMatch: 'full', redirectTo: 'mod-budget' },
              //    { path: 'mod-budget', component: ModificationsBudgetComponent },
              //    { path: 'mod-personnel', component: ModificationsPersonnelComponent }
              //  ]


            ]
          }
        ]
      }
    ]
  },
  {
    path: 'new',
    children: [
      {
        path: ':prjTypeId', component: PrjHeaderComponent, resolve: { data: NewProjectShellResolverServiceService },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'prj' },
          {
            path: 'prj', component: PrjComponent, data: { activeTab: 'Project', isNew: true },
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'info' },
              { path: 'info', component: PrjInfoPageComponent}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
