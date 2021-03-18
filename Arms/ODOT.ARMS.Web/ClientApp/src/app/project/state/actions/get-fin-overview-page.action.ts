import { createAction, props } from '@ngrx/store';
import { OverviewRaw } from '../../models/Overview-raw';


export const loadOverviewByProjectId = createAction(
  '[ProjectOverview] Load overview by Project Id',
  props<{ projId: string }>()
);

export const loadoverviewByProjectIdSuccess = createAction(
  '[ProjectOverview] Load overview by Project Id Success',
  props<{ Overview: OverviewRaw[] }>()
);

export const loadoverviewByProjectIdFail = createAction(
  '[ProjectOverview] Load overview by Project Id Failure',
  props<{ error: string }>()
);

export const getFinOverviewPageActionType = {
  loadOverviewByProjectId,
  loadoverviewByProjectIdSuccess,
  loadoverviewByProjectIdFail
};
