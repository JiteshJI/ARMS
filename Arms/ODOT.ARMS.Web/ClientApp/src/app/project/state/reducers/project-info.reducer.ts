 /* ********************************************************************************************************** */
 /* EntityState Interface

interface EntityState<V> {
  ids: string[] | number[];
  entities: { [id: string | id: number]: V };
}

ids: An array of all the primary ids in the collection
entities: A dictionary of entities in the collection indexed by the primary id *

Extend this interface to provide any additional properties for the entity state. */
/* ********************************************************************************************************** */


import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ProjectInfo } from '../../models/ProjectInfo';
import { projectInfoActions } from '../actions/project-info.actions';


export interface ProjectInfoState extends EntityState<ProjectInfo> {
ProjectStateloaded: boolean;
error: string;
}


export const adapterProjectInfo: EntityAdapter<ProjectInfo> = createEntityAdapter<ProjectInfo>({
  /** overriding the default id in ngrx/entity by specifying actual id  */
    selectId: (project: ProjectInfo) => project.projectAltId,
    sortComparer: false
});

export const initialState: ProjectInfoState = adapterProjectInfo.getInitialState({
    error : '',
    ProjectStateloaded: false
});



export const projectInfoReducer = createReducer(
    initialState,

    on(projectInfoActions.loadSelectedProjectSuccess, (state, action) => {
       return adapterProjectInfo.setOne(action.projectInfo, {...state, ProjectStateloaded: true});
    }),

    on(projectInfoActions.editSelectedProjectSuccess , (state, action) => {
        return adapterProjectInfo.upsertOne(action.projectInfo, state);
    }),

    on(projectInfoActions.AddNewProjectSuccess , (state, action) => {
        return adapterProjectInfo.upsertOne(action.projectInfo, state);
    }),

    on(projectInfoActions.setProjectLoadedStatusSuccess, (state, action) => {
        return {...state, ProjectStateloaded: action.loaded };
    }),



    /** set additional state properties using the normal way without using the entity adapter methods for errors **/
    on(projectInfoActions.loadSelectedProjectFailure, (state, action) => {
        return {...state, error: action.error};
    }),

    on(projectInfoActions.AddNewProjectFailure, (state, action) => {
      return {...state, error: action.error};
    }),

    on(projectInfoActions.editSelectedProjectFailure, (state, action) => {
    return {...state, error: action.error};
    }),

    on(projectInfoActions.setProjectLoadedStatusFailure, (state, action) => {
      return { ...state, error: action.error, ProjectStateloaded: false};
    })

);


export function reducer(state: ProjectInfoState | undefined, action: Action) {
    return projectInfoReducer(state, action);
  }


/***************Selectors -used for getting a slice of the state *******************/

// get the selectors
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
  } = adapterProjectInfo.getSelectors();

/** Selector for getting the additional properties defined in the state-Use this when getting additional properties like errors **/
export const geterror = (state: ProjectInfoState) => state.error;
export const getProjectInfoStateloaded = (state: ProjectInfoState) => state.ProjectStateloaded;
