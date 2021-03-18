import { createAction, props } from '@ngrx/store';

import { ProjectSummary } from '../../models/project-summary';


export const LoadSelectedProjectSummary = createAction('[currentSummary] Load PrjCurrentSummary', props<{ projectAltID: string }>());
// tslint:disable-next-line: max-line-length
export const LoadSelectedProjectSummarysuccess = createAction('[currentSummary] Load PrjCurrentSummary success', props<{ SelectedProjectSummary: ProjectSummary}>());
export const LoadSelectedProjectSummaryFailure = createAction('[currentSummary] Load PrjCurrentSummary Failed', props<{ error: string }>());
export const AddProjectSummary = createAction('[currentSummary] Add new ProjectSummary', props<{ currentSummary: ProjectSummary }>());
// tslint:disable-next-line: max-line-length
export const AddProjectSummarySuccess = createAction('[currentSummary] Add new ProjectSummary Success', props<{ currentSummary: ProjectSummary }>());
export const AddProjectSummaryFailure = createAction('[currentSummary] Add new ProjectSummary Failed', props<{ error: string }>());
export const UpdateProjectSummary = createAction('[currentSummary] Update ProjectSummary', props<{ currentSummary: ProjectSummary }>());
// tslint:disable-next-line: max-line-length
export const UpdateProjectSummarySuccess = createAction('[currentSummary] Update ProjectSummary Success', props<{ currentSummary: ProjectSummary }>());
export const UpdateProjectSummaryFailure = createAction('[currentSummary] Update ProjectSummary Failed', props<{ error: string }>());


export const projectSummaryActions = {
    LoadSelectedProjectSummary,
    LoadSelectedProjectSummarysuccess,
    LoadSelectedProjectSummaryFailure,
    AddProjectSummary,
    AddProjectSummarySuccess,
    AddProjectSummaryFailure,
    UpdateProjectSummary,
    UpdateProjectSummarySuccess,
    UpdateProjectSummaryFailure
};
