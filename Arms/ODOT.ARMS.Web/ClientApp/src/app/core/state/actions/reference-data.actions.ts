import { createAction, props } from '@ngrx/store';
//import { GenericLookupListForDD } from 'src/app/project/models/project-for-update';
import { LookupItem } from '../../../shared/models/lookup-item';
import { ProjectEventsReferenceData } from '../../models/project-events-reference-data';
import { ProjectPhaseReferenceData } from '../../models/project-phase-reference-data';
import { ProjectCBReferenceData } from '../../models/project-cb-reference-data';
import { FundingReferenceData } from '../../models/funding-reference-data';
import { InvoiceReferenceData } from '../../models/fin-invoice-reference-data';

export const loadProjectCBReferenceData = createAction(
  '[ReferenceData] Load ProjectCBReferenceData'
);

export const loadProjectCBReferenceDataSuccess = createAction(
  '[ReferenceData] Load ProjectCBReferenceData Success',
  props<{ data: ProjectCBReferenceData }>()
);

export const loadProjectCBReferenceDataFailure = createAction(
  '[ReferenceData] Load ProjectCBReferenceData Failure',
  props<{ error: any }>()
);

export const loadProjectEventsReferenceData = createAction(
  '[ReferenceData] Load loadProjectEventsReferenceData'
);

export const loadProjectEventsReferenceDataSuccess = createAction(
  '[ReferenceData] Load loadProjectEventsReferenceData Success',
  props<{ data: ProjectEventsReferenceData }>()
);

export const loadProjectEventsReferenceDataFailure = createAction(
  '[ReferenceData] Load ProjectEventsReferenceData Failure',
  props<{ error: any }>()
);

export const loadProjectPhaseReferenceData = createAction(
  '[ReferenceData] Load ProjectPhaseReferenceData'
)

export const loadProjectPhaseReferenceDataSuccess = createAction(
  '[ReferenceData] Load ProjectPhaseReferenceData Success',
  props<{ data: ProjectPhaseReferenceData }>()
)

export const loadProjectPhaseReferenceDataFailure = createAction(
  '[ReferenceData] Load ProjectPhaseReferenceData Failure',
  props<{ error: any }>()
)

export const loadProjectBudgetReferenceData = createAction(
  '[ReferenceData] Load Budget categories'
)

export const loadProjectBudgetReferenceDataSuccess = createAction(
  '[ReferenceData] Load Budget categories Success',
  props<{ budgetCategories: LookupItem[] }>()
)

export const loadProjectBudgetReferenceDataFailure = createAction(
  '[ReferenceData] Load Budget categories Failure',
  props<{ error: string }>()
)


export const loadFundingReferenceData = createAction(
  '[ReferenceData] Load FundingReferenceData'
);

export const loadFundingReferenceDataSuccess = createAction(
  '[ReferenceData] Load FundingReferenceData Success',
  props<{ data: FundingReferenceData }>()
);

export const loadFundingReferenceDataFailure = createAction(
  '[ReferenceData] Load FundingReferenceData Failure',
  props<{ error: any }>()
);

export const loadInvoiceReferenceData = createAction(
  '[ReferenceData] Load InvoiceReferenceData'
);

export const loadInvoiceReferenceDataSuccess = createAction(
  '[ReferenceData] Load InvoiceReferenceData Success',
  props<{ data: InvoiceReferenceData }>()
);

export const loadInvoiceReferenceDataFailure = createAction(
  '[ReferenceData] Load InvoiceReferenceData Failure',
  props<{ error: string }>()
);


export const referenceDataActionTypes = {
  loadProjectEventsReferenceData,
  loadProjectEventsReferenceDataSuccess,
  loadProjectEventsReferenceDataFailure,
  loadProjectPhaseReferenceData,
  loadProjectPhaseReferenceDataSuccess,
  loadProjectPhaseReferenceDataFailure,
  loadProjectBudgetReferenceData,
  loadProjectBudgetReferenceDataSuccess,
  loadProjectBudgetReferenceDataFailure,
  loadProjectCBReferenceData,
  loadProjectCBReferenceDataSuccess,
  loadProjectCBReferenceDataFailure,
  loadFundingReferenceData,
  loadFundingReferenceDataSuccess,
  loadFundingReferenceDataFailure,
  loadInvoiceReferenceData,
  loadInvoiceReferenceDataSuccess,
  loadInvoiceReferenceDataFailure
};
