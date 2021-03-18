import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { Personnel } from '../../models/personnel';
import {createFeatureSelector, createSelector, createReducer, Action, on} from '@ngrx/store';
import { personnelActions } from '../actions/personnel.actions';

export interface PersonnelState extends EntityState<Personnel> {
  loaded: boolean;
  error: string;
  selectEditPersonnel: Personnel;
  savePersonnelDialog: boolean;

}
export const adapterPersonnel: EntityAdapter<Personnel> = createEntityAdapter<Personnel>({
  selectId: (personnel: Personnel) => personnel.personnelId,
  sortComparer: false,
});

/*Creating an initial state */
export const initialState: PersonnelState = adapterPersonnel.getInitialState({
  loaded: false,
  error: '',
  selectEditPersonnel: null,
  savePersonnelDialog: false
});

export const personnelReducer = createReducer(
  initialState,
  on(
    personnelActions.LoadSelectedPersonnelSuccess, (state, {SelectedPersonnel}) => {
      console.log(SelectedPersonnel);
      return adapterPersonnel.setAll(SelectedPersonnel, {
        ...state,
        loaded: true
      });
    }
  ),

  on(personnelActions.LoadSelectedPersonnelFailure, (state, action) => {
    return {...state, error: action.Error};
  }),

  on(personnelActions.AddPersonnelSuccess, (state, action) => {
    return adapterPersonnel.addOne(action.Personnel, state);
  }),

  on(personnelActions.AddPersonnelFailure, (state, action) => {
    return {...state, error: action.Error};
  }),

  on(personnelActions.UpdatePersonnelSuccess, (state, action) => {
    return adapterPersonnel.upsertOne(action.Personnel, state);
  }),

  on(personnelActions.UpdatePersonnelFailure, (state, action) => {
    return {...state, error: action.Error};
  }),

  on(personnelActions.setPersonnelLoadedStatusSuccess, (state, action) => {
    console.log('setting the loaded status to false');
    return {...state, loaded: action.loaded};
  }),

  on(personnelActions.setEditPersonnel, (state, action) => {
    console.log('setting the editing personnel');
    return {...state, selectEditPersonnel: action.Personnel, savePersonnelDialog: true};
  }),

  on(personnelActions.setSavePersonnelDialogSuccess, (state, action) => {
    console.log('setting the SavePersonnelDialog status to :', action.Dialog);
    return { ...state, savePersonnelDialog: action.Dialog};
  }),

);

export function reducer(state: PersonnelState | undefined, action: Action) {
  return personnelReducer(state, action);
}

export const {
  selectAll,
  selectIds,
  selectEntities,
  selectTotal
} = adapterPersonnel.getSelectors();


