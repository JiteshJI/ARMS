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
import { PooledParticipating } from '../../models/pooled-participating';
import { pooledParticipatingActions} from '../actions/pooled-participating.actions';


export interface ProjectPooledPartState extends EntityState<PooledParticipating> {
    ProjectPooledPartStateloaded: boolean;
    error: string;
    savePooledPartDialog: boolean;
    selectEditPooledPart: PooledParticipating;
}


export const adapterProjectPooledPart: EntityAdapter<PooledParticipating> = createEntityAdapter<PooledParticipating>({
    /** overriding the default id in ngrx/entity by specifying actual id  */
    selectId: (pooledParticipating: PooledParticipating) => pooledParticipating.PartId,
    sortComparer: false
});

export const initialState: ProjectPooledPartState = adapterProjectPooledPart.getInitialState({
    error: '',
    ProjectPooledPartStateloaded: false,
    savePooledPartDialog: false,
    selectEditPooledPart: null

});

export const projectPooledPartReducer = createReducer(
    initialState,

    on(pooledParticipatingActions.loadSelectedProjectPooledPartSuccess, (state, action) => {
        return adapterProjectPooledPart.setAll(action.pooledParticipating, { ...state, ProjectPooledPartStateloaded: true });
    }),

    on(pooledParticipatingActions.addProjectPooledPartSuccess, (state, action) => {
        return adapterProjectPooledPart.addOne(action.pooledParticipating, state);
    }),

    on(pooledParticipatingActions.updateProjectPooledPartSuccess, (state, action) => {
        return adapterProjectPooledPart.upsertOne(action.pooledParticipating, state);
    }),

    on(pooledParticipatingActions.setProjectPoolPartLoadedStatusSuccess, (state, action) => {
        return { ...state, ProjectPooledPartStateloaded: action.loaded };
    }),

    /** set additional state properties using the normal way without using the entity adapter methods for errors **/
    on(pooledParticipatingActions.loadProjectPooledPartFail, (state, action) => {
        return { ...state, error: action.error };
    }),

    on(pooledParticipatingActions.addProjectPooledPartFailed, (state, action) => {
        return { ...state, error: action.error };
    }),

    on(pooledParticipatingActions.updateProjectPooledPartFailed, (state, action) => {
        return { ...state, error: action.error };
    }),

    on(pooledParticipatingActions.setProjectPoolPartLoadedStatusFailed, (state, action) => {
        return { ...state, error: action.error, ProjectPooledPartStateloaded: false };
    }),

    on(pooledParticipatingActions.setEditPooledPart, (state, action) => {
        console.log('setting the editing personnel');
        return {...state, selectEditPooledPart: action.pooledParticipating, savePersonnelDialog: true};
      }),

      on(pooledParticipatingActions.setSavePooledPartDialogSuccess, (state, action) => {
        console.log('setting the SavePooledPartDialog status to :', action.Dialog);
        return { ...state, savePooledPartDialog: action.Dialog};
      }),

);

export function reducer(state: ProjectPooledPartState | undefined, action: Action) {
    return projectPooledPartReducer(state, action);
}
/***************Selectors -used for getting a slice of the state *******************/

// get the selectors
export const {
    selectAll,
  selectTotal,
  selectEntities,
  selectIds

} = adapterProjectPooledPart.getSelectors();

/** Selector for getting the additional properties defined in the state-Use this when getting additional properties like errors **/
export const geterror = (state: ProjectPooledPartState) => state.error;
export const getProjectPooledPartStateloaded = (state: ProjectPooledPartState) => state.ProjectPooledPartStateloaded;
