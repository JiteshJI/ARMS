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
import { ProjectSummary} from '../../models/project-summary';
import { Action, createReducer, on } from '@ngrx/store';
import { projectSummaryActions } from '../actions/project-currentsummary.actions';


export interface ProjectSummaryState extends EntityState<ProjectSummary> {
ProjectSummaryStateloaded: boolean;
error: string;
}


export const adapterPrjSummary: EntityAdapter<ProjectSummary> = createEntityAdapter<ProjectSummary>({
  /** overriding the default id in ngrx/entity by specifying actual id  */
    selectId: (prjSummary: ProjectSummary) => prjSummary.projectAltId,
    sortComparer: false
});

export const initialState: ProjectSummaryState = adapterPrjSummary.getInitialState({
    error : '',
    ProjectSummaryStateloaded: false
});



export const projectSummaryReducer = createReducer(
    initialState,

    on(projectSummaryActions.LoadSelectedProjectSummarysuccess, (state, { SelectedProjectSummary}) => {
       return adapterPrjSummary.setOne(SelectedProjectSummary, {...state, ProjectSummaryStateloaded: true});
    }),

    /** set additional state properties using the normal way without using the entity adapter methods for errors **/
    on(projectSummaryActions.LoadSelectedProjectSummaryFailure, (state, action) => {
        return {...state, error: action.error};
    }),

    on(projectSummaryActions.UpdateProjectSummarySuccess, (state, {currentSummary}) => {
      return adapterPrjSummary.upsertOne(currentSummary, state);
    }),

  /** set additional state properties using the normal way without using the entity adapter methods for errors **/
    on(projectSummaryActions.UpdateProjectSummaryFailure, (state, action) => {
    return {...state, error: action.error};
    })
);

export function reducer(state: ProjectSummaryState | undefined, action: Action) {
    return projectSummaryReducer(state, action);
  }


  // ***************Selectors -used for getting a slice of the state *******************//

  // Selector for getting the additional properties defined in the state-Use this when getting additional properties like errors
  export const geterror = (state: ProjectSummaryState) => state.error;
  export const getProjectSummaryStateloaded = (state: ProjectSummaryState) => state.ProjectSummaryStateloaded;


// get the selectors
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapterPrjSummary.getSelectors();


