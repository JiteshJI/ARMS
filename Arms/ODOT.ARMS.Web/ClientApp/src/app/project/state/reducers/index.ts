import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../../state/reducers';
import * as fromEditProjectPage from "./edit-project-page.reducer";
import * as fromEditProjectEventsPage from "./edit-project-events-page.reducer";
import * as fromEditProjectControllingBoardsPage from "./edit-prj-cb-page.reducer";
import * as fromProjectShellPage from "./project-shell-page.reducer";
import * as fromProjectPage from "./edit-project-page.reducer";
import * as fromProjectSearch from "./project-search.reducer";
import * as fromEditProjectPhasePage from './edit-project-phase-page.reducer';
import * as fromEditProjectAbstractPage from './edit-project-abstract-page.reducer';
//import * as fromUploadPage from '../../../shared/state/reducers/upload-file-save.reducer';
import * as fromProjectUploadsPage from './edit-project-uploads-page.reducer';
import * as fromFileUploadsPage from './file-uploads.reducer';


export interface ProjectState {
  projectSearch: fromProjectSearch.State;
  projectShellPage: fromProjectShellPage.State;
  //editProjectPage: fromEditProjectPage.State;
  editProjectPage: fromProjectPage.State;
  editProjectEventsPage: fromEditProjectEventsPage.State;
  editProjectControllingBoardsPage: fromEditProjectControllingBoardsPage.State;
  editProjectPhasePage: fromEditProjectPhasePage.State;
  editProjectUploadsPage: fromProjectUploadsPage.State;//New UPLOADS
  fileUploadsPage: fromFileUploadsPage.State;
  //uploadPage: fromUploadPage.State;
  //editProjectAbstractPage: fromEditProjectAbstractPage.State;
}

export interface State extends fromRoot.State {
  projects: ProjectState;
}


export const reducers: ActionReducerMap<ProjectState> = {
  projectSearch: fromProjectSearch.reducer,
  //editProjectPage: fromEditProjectPage.reducer,
  editProjectPage: fromProjectPage.reducer,
  editProjectEventsPage: fromEditProjectEventsPage.reducer,
  editProjectControllingBoardsPage: fromEditProjectControllingBoardsPage.CBReducer,
  editProjectPhasePage: fromEditProjectPhasePage.projectPhaseReducer,
  projectShellPage: fromProjectShellPage.reducer,
  editProjectUploadsPage: fromProjectUploadsPage.uploadsReducer,//NEW UPLOADS
  fileUploadsPage: fromFileUploadsPage.reducer
  //uploadPage: fromUploadPage.reducer 
  //editProjectAbstractPage: fromEditProjectAbstractPage.reducer
}

const getProjectState = createFeatureSelector<State, ProjectState>('projects');

//export const selectProjectId = createSelector(
//  fromRoot.getRouterInfo,
//  routerInfo => routerInfo && routerInfo.params && routerInfo.params.prjId
//);

export const projectStatusList = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.params && routerInfo.params.prjId
);

export const getProjectSearchPage = createSelector(
  getProjectState,
  (state: ProjectState) => state.projectSearch
);

export const getProjectsForSearch = createSelector(
  getProjectSearchPage,
  fromProjectSearch.getProjectsForSearch
);

//============================================ ALEX CODE =========================================================================


export const selectProjectAltId = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.params && routerInfo.params.projectAltId
);

//=========================================== PHILIPPE CODE ======================================================================

export const selectProjectTypeId = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.params && routerInfo.params.prjTypeId
);


/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

/* Project Shell Page Selectors */
export const getProjectShellPageState = createSelector(
  getProjectState,
  (state: ProjectState) => state.projectShellPage
);

export const getProjectHeader = createSelector(
  getProjectShellPageState,
  fromProjectShellPage.getProjectHeader
);

export const getProjectId = createSelector(
  getProjectShellPageState,
  fromProjectShellPage.getProjectId
);

/* Edit Project Page Selectors */
export const getEditProjectPageState = createSelector(
  getProjectState,
  (state: ProjectState) => state.editProjectPage
);

//export const getProjectHeader = createSelector(
//  getEditProjectPageState,
//  fromEditProjectPage.getProjectHeader
//);

/* Edit Project Events Page Selectors */
export const getEditProjectEventsPageState = createSelector(
  getProjectState,
  (state: ProjectState) => state.editProjectEventsPage
);

/* Get upload state */
export const getFileUploadPageState = createSelector(
  getProjectState,
  (state: ProjectState) => state.fileUploadsPage
)

/* Edit Project Events Page Selectors */
export const getEditProjectControllingBoardsPageState = createSelector(
  getProjectState,
  (state: ProjectState) => state.editProjectControllingBoardsPage
);

export const getEvents = createSelector(
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getEvents
);

export const getEventListState = createSelector(
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getEventList
);

export const getCBListState = createSelector(
  getEditProjectControllingBoardsPageState,
  fromEditProjectControllingBoardsPage.getControllingBoardList
);

export const getEditProjectUploadsListState = createSelector(//NEW UPLOADS
  getProjectState,
  (state: ProjectState) => state.editProjectUploadsPage
)

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getEventListIds,
  selectEntities: getEventListEntities,
  selectAll: getAllEvents,
  selectTotal: getTotalEventList,
} = fromEditProjectEventsPage.adapterEvent.getSelectors(getEventListState);


export const {
  selectIds: getCBListIds,
  selectEntities: getCBListEntities,
  selectAll: getAllCBs,
  selectTotal: getTotalCBList,
} = fromEditProjectControllingBoardsPage.adapterControllingBoard.getSelectors(getCBListState);


export const getUploadsListState = createSelector(//remove
  getFileUploadPageState,
  fromFileUploadsPage.getUploads   //getSelectedUploadEvent
);

export const {
  selectIds: getUploadsListIds,
  selectEntities: getUploadListEntities,
  selectAll: getAllUploads,
  //selectTotal: getTotalEventList,
} = fromFileUploadsPage.adapterUpload.getSelectors(getUploadsListState);

export const getProjectUploadsListState = createSelector(// NEW UPLOADS
  getFileUploadPageState,
  fromFileUploadsPage.getUploads   //getSelectedUploadEvent
);

export const {// NEW UPLOADS
  selectIds: getProjectUploadsListIds,
  selectEntities: getProjectUploadListEntities,
  selectAll: getAllProjectUploads,
} = fromProjectUploadsPage.adapterUpload.getSelectors(getEditProjectUploadsListState);


export const getPhaseList = createSelector(
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getPhaseList
);

export const getSelectedEvent = createSelector(
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getSelectedEvent
);

export const getSelectedUploadSrc = createSelector(//remove
  getFileUploadPageState,
  fromFileUploadsPage.getSelectedSrc   //getSelectedUploadEvent
);

export const getSelectedUploadEvent = createSelector(//remove
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getSelectedUploadEvent
);



export const getSelectedCB = createSelector(
  getEditProjectControllingBoardsPageState,
  fromEditProjectControllingBoardsPage.getSelectedCB
);

export const getSelectedUploadCB = createSelector(
  getEditProjectControllingBoardsPageState,
  fromEditProjectControllingBoardsPage.getSelectedUploadCB
);


export const getSaveCBDialogStatus = createSelector(
  getEditProjectControllingBoardsPageState,
  fromEditProjectControllingBoardsPage.getSaveCBDialogStatus
);



/* Edit Project Phase Page Selectors */
//export const getUploadPageState = createSelector(//Added
//  getProjectState,
//  (state: ProjectState) => state.uploadPage
//);

//export const getSelectedUpload = createSelector(//Added
//  getUploadPageState,
//  fromUploadPage.getSelectedUpload
//)


export const getSaveEventDialogStatus = createSelector(
  getEditProjectEventsPageState,
  fromEditProjectEventsPage.getSaveEventDialogStatus
);

export const getUploadEventDialogStatus = createSelector(//remove
  getFileUploadPageState,
  fromFileUploadsPage.getUploadDialogStatus
);

export const getUploadProjectDialogStatus = createSelector(//Added
  getEditProjectUploadsListState,
  fromProjectUploadsPage.getUploadProjectDialogStatus
);
/* Router and Tab Selectors */

export const selectActiveTab = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.data && routerInfo.data.activeTab
);

export const selectActiveProjectTab = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.data && routerInfo.data.activeProjectTab
);

export const selectIsNewProject = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.data && routerInfo.data.isNew
);

export const selectActiveFinanceTab = createSelector(
  fromRoot.getRouterInfo,
  routerInfo => routerInfo && routerInfo.data && routerInfo.data.activeFinanceTab
);
