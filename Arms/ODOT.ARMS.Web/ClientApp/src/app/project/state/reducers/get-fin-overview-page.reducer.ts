import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { OverviewRaw } from '../../models/Overview-raw';
import { getFinOverviewPageActionType } from '../actions/get-fin-overview-page.action';

//**************************************Overviews***********************************************************************//

export interface OverviewState extends EntityState<OverviewRaw> {
  isLoading: false;
  error: null;
  SelectedOverviews: OverviewRaw;
}

export const adapterOverview: EntityAdapter<OverviewRaw> = createEntityAdapter<OverviewRaw>({
  selectId: (event: OverviewRaw) => event.title,
  sortComparer: false,
});

export const initialState: OverviewState = adapterOverview.getInitialState({
  isLoading: false,
  error: null,
  SelectedOverviews: null,
});

export const OverviewReducer = createReducer(
  initialState,

  on(getFinOverviewPageActionType.loadoverviewByProjectIdSuccess, (state, action) => {
    //return adapterOverview.addAll(
    return adapterOverview.setAll(
      action.Overview,    //.SelectedOverviews,
      { ...state, projectLoaded: false }
    );
  }),
);
export const { selectAll, selectIds } = adapterOverview.getSelectors();

export const courseFeatureSelector = createFeatureSelector<OverviewState>('Overviews');

export const getAllOverviews = createSelector(
  courseFeatureSelector,
  selectAll
);

//**************************************Overviews***********************************************************************//
