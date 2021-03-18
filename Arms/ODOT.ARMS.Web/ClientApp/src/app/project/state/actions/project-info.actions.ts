import { createAction, props } from '@ngrx/store';
import { ProjectInfo } from '../../models/projectInfo';

/**Load Selected Projects */
export const loadSelectedProject = createAction('[project-info] Load PrjInfoComponent', props<{ projectAltID: string}>());
export const loadSelectedProjectSuccess = createAction('[project-info] Load PrjInfoComponent Success', props<{projectInfo: ProjectInfo}>());
export const loadSelectedProjectFailure = createAction('[project-info] Load PrjInfoComponent Failed', props<{error: string}>());

/**Add new Projects */
export const AddNewProject = createAction('[project-info] Add PrjInfoComponent', props<{project: ProjectInfo}>());
export const AddNewProjectSuccess = createAction('[project-info] Add PrjInfoComponent Success', props<{projectInfo: ProjectInfo}>());
export const AddNewProjectFailure = createAction('[project-info] Add PrjInfoComponent Failed', props<{error: string}>());

 /**Edit Selected Projects */
export const editSelectedProject = createAction('[project-info] Edit PrjInfoComponent', props<{project: ProjectInfo}>());
export const editSelectedProjectSuccess = createAction('[project-info] Edit PrjInfoComponent Success', props<{projectInfo: ProjectInfo}>());
export const editSelectedProjectFailure = createAction('[project-info] Edit PrjInfoComponent Failed', props<{error: string}>());

/**set the loaded status */
export const setProjectLoadedStatus = createAction('[project-info] set ProjectLoaded to False', props <{ loaded: boolean }>());
export const setProjectLoadedStatusSuccess = createAction('[project-info] set projectLoaded successfully', props<{ loaded: boolean }>());
export const setProjectLoadedStatusFailure = createAction('project-info] set projectLoaded Failed', props<{ error: string }>());


export const projectInfoActions = {
  loadSelectedProject,
  loadSelectedProjectSuccess,
  loadSelectedProjectFailure,
  AddNewProject,
  AddNewProjectSuccess,
  AddNewProjectFailure,
  editSelectedProject,
  editSelectedProjectSuccess,
  editSelectedProjectFailure,
  setProjectLoadedStatus,
  setProjectLoadedStatusSuccess,
  setProjectLoadedStatusFailure

};
