/// <reference path="../../models/administration-categories.ts" />
import { Action } from '@ngrx/store';
import { AdministrationCategory } from '../../models/administration-categories';

export enum AdministrationCategoryListActionTypes {
  Search = '[Administration Category] Search',
  SearchComplete = '[Administration Category] Search Complete',
  SearchError = '[Administration Category] Search Error',
  Load = '[Administration Category] Load',
  Select = '[Administration Category] Select',
  LoadSuccess = '[Administration Category] Load Success',
  LoadFail = '[Administration Category] Load Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = AdministrationCategoryListActionTypes.Search;

  constructor(public payload: string) { }
}

export class SearchComplete implements Action {
  readonly type = AdministrationCategoryListActionTypes.SearchComplete;

  constructor(public payload: AdministrationCategory[]) { }
}

export class SearchError implements Action {
  readonly type = AdministrationCategoryListActionTypes.SearchError;

  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = AdministrationCategoryListActionTypes.Load;
}

export class Select implements Action {
  readonly type = AdministrationCategoryListActionTypes.Select;

  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = AdministrationCategoryListActionTypes.LoadSuccess;

  constructor(public payload: AdministrationCategory[]) { }
}

export class LoadFail implements Action {
  readonly type = AdministrationCategoryListActionTypes.LoadFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AdministrationCategoryActions = Search | SearchComplete | SearchError | Select | Load | LoadSuccess | LoadFail;
