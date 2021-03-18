"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectActiveFinanceTab = exports.selectIsNewProject = exports.selectActiveProjectTab = exports.selectActiveTab = exports.getUploadProjectDialogStatus = exports.getUploadEventDialogStatus = exports.getSaveEventDialogStatus = exports.getSaveCBDialogStatus = exports.getSelectedUploadCB = exports.getSelectedCB = exports.getSelectedUploadEvent = exports.getSelectedUploadSrc = exports.getSelectedEvent = exports.getPhaseList = exports.getAllProjectUploads = exports.getProjectUploadListEntities = exports.getProjectUploadsListIds = exports.getProjectUploadsListState = exports.getAllUploads = exports.getUploadListEntities = exports.getUploadsListIds = exports.getUploadsListState = exports.getTotalCBList = exports.getAllCBs = exports.getCBListEntities = exports.getCBListIds = exports.getTotalEventList = exports.getAllEvents = exports.getEventListEntities = exports.getEventListIds = exports.getEditProjectUploadsListState = exports.getCBListState = exports.getEventListState = exports.getEvents = exports.getEditProjectControllingBoardsPageState = exports.getFileUploadPageState = exports.getEditProjectEventsPageState = exports.getEditProjectPageState = exports.getProjectId = exports.getProjectHeader = exports.getProjectShellPageState = exports.selectProjectTypeId = exports.selectProjectAltId = exports.getProjectsForSearch = exports.getProjectSearchPage = exports.projectStatusList = exports.reducers = void 0;
var store_1 = require("@ngrx/store");
var fromRoot = require("../../../state/reducers");
var fromEditProjectEventsPage = require("./edit-project-events-page.reducer");
var fromEditProjectControllingBoardsPage = require("./edit-prj-cb-page.reducer");
var fromProjectShellPage = require("./project-shell-page.reducer");
var fromProjectPage = require("./edit-project-page.reducer");
var fromProjectSearch = require("./project-search.reducer");
var fromEditProjectPhasePage = require("./edit-project-phase-page.reducer");
//import * as fromUploadPage from '../../../shared/state/reducers/upload-file-save.reducer';
var fromProjectUploadsPage = require("./edit-project-uploads-page.reducer");
var fromFileUploadsPage = require("./file-uploads.reducer");
exports.reducers = {
    projectSearch: fromProjectSearch.reducer,
    //editProjectPage: fromEditProjectPage.reducer,
    editProjectPage: fromProjectPage.reducer,
    editProjectEventsPage: fromEditProjectEventsPage.reducer,
    editProjectControllingBoardsPage: fromEditProjectControllingBoardsPage.CBReducer,
    editProjectPhasePage: fromEditProjectPhasePage.projectPhaseReducer,
    projectShellPage: fromProjectShellPage.reducer,
    editProjectUploadsPage: fromProjectUploadsPage.uploadsReducer,
    fileUploadsPage: fromFileUploadsPage.reducer
    //uploadPage: fromUploadPage.reducer 
    //editProjectAbstractPage: fromEditProjectAbstractPage.reducer
};
var getProjectState = store_1.createFeatureSelector('projects');
//export const selectProjectId = createSelector(
//  fromRoot.getRouterInfo,
//  routerInfo => routerInfo && routerInfo.params && routerInfo.params.prjId
//);
exports.projectStatusList = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.params && routerInfo.params.prjId; });
exports.getProjectSearchPage = store_1.createSelector(getProjectState, function (state) { return state.projectSearch; });
exports.getProjectsForSearch = store_1.createSelector(exports.getProjectSearchPage, fromProjectSearch.getProjectsForSearch);
//============================================ ALEX CODE =========================================================================
exports.selectProjectAltId = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.params && routerInfo.params.projectAltId; });
//=========================================== PHILIPPE CODE ======================================================================
exports.selectProjectTypeId = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.params && routerInfo.params.prjTypeId; });
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
exports.getProjectShellPageState = store_1.createSelector(getProjectState, function (state) { return state.projectShellPage; });
exports.getProjectHeader = store_1.createSelector(exports.getProjectShellPageState, fromProjectShellPage.getProjectHeader);
exports.getProjectId = store_1.createSelector(exports.getProjectShellPageState, fromProjectShellPage.getProjectId);
/* Edit Project Page Selectors */
exports.getEditProjectPageState = store_1.createSelector(getProjectState, function (state) { return state.editProjectPage; });
//export const getProjectHeader = createSelector(
//  getEditProjectPageState,
//  fromEditProjectPage.getProjectHeader
//);
/* Edit Project Events Page Selectors */
exports.getEditProjectEventsPageState = store_1.createSelector(getProjectState, function (state) { return state.editProjectEventsPage; });
/* Get upload state */
exports.getFileUploadPageState = store_1.createSelector(getProjectState, function (state) { return state.fileUploadsPage; });
/* Edit Project Events Page Selectors */
exports.getEditProjectControllingBoardsPageState = store_1.createSelector(getProjectState, function (state) { return state.editProjectControllingBoardsPage; });
exports.getEvents = store_1.createSelector(exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getEvents);
exports.getEventListState = store_1.createSelector(exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getEventList);
exports.getCBListState = store_1.createSelector(exports.getEditProjectControllingBoardsPageState, fromEditProjectControllingBoardsPage.getControllingBoardList);
exports.getEditProjectUploadsListState = store_1.createSelector(//NEW UPLOADS
getProjectState, function (state) { return state.editProjectUploadsPage; });
/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
exports.getEventListIds = (_a = fromEditProjectEventsPage.adapterEvent.getSelectors(exports.getEventListState), _a.selectIds), exports.getEventListEntities = _a.selectEntities, exports.getAllEvents = _a.selectAll, exports.getTotalEventList = _a.selectTotal;
exports.getCBListIds = (_b = fromEditProjectControllingBoardsPage.adapterControllingBoard.getSelectors(exports.getCBListState), _b.selectIds), exports.getCBListEntities = _b.selectEntities, exports.getAllCBs = _b.selectAll, exports.getTotalCBList = _b.selectTotal;
exports.getUploadsListState = store_1.createSelector(//remove
exports.getFileUploadPageState, fromFileUploadsPage.getUploads //getSelectedUploadEvent
);
exports.getUploadsListIds = (_c = fromFileUploadsPage.adapterUpload.getSelectors(exports.getUploadsListState), _c.selectIds), exports.getUploadListEntities = _c.selectEntities, exports.getAllUploads = _c.selectAll;
exports.getProjectUploadsListState = store_1.createSelector(// NEW UPLOADS
exports.getFileUploadPageState, fromFileUploadsPage.getUploads //getSelectedUploadEvent
);
exports.getProjectUploadsListIds = (_d = fromProjectUploadsPage.adapterUpload.getSelectors(exports.getEditProjectUploadsListState), _d.selectIds), exports.getProjectUploadListEntities = _d.selectEntities, exports.getAllProjectUploads = _d.selectAll;
exports.getPhaseList = store_1.createSelector(exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getPhaseList);
exports.getSelectedEvent = store_1.createSelector(exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getSelectedEvent);
exports.getSelectedUploadSrc = store_1.createSelector(//remove
exports.getFileUploadPageState, fromFileUploadsPage.getSelectedSrc //getSelectedUploadEvent
);
exports.getSelectedUploadEvent = store_1.createSelector(//remove
exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getSelectedUploadEvent);
exports.getSelectedCB = store_1.createSelector(exports.getEditProjectControllingBoardsPageState, fromEditProjectControllingBoardsPage.getSelectedCB);
exports.getSelectedUploadCB = store_1.createSelector(exports.getEditProjectControllingBoardsPageState, fromEditProjectControllingBoardsPage.getSelectedUploadCB);
exports.getSaveCBDialogStatus = store_1.createSelector(exports.getEditProjectControllingBoardsPageState, fromEditProjectControllingBoardsPage.getSaveCBDialogStatus);
/* Edit Project Phase Page Selectors */
//export const getUploadPageState = createSelector(//Added
//  getProjectState,
//  (state: ProjectState) => state.uploadPage
//);
//export const getSelectedUpload = createSelector(//Added
//  getUploadPageState,
//  fromUploadPage.getSelectedUpload
//)
exports.getSaveEventDialogStatus = store_1.createSelector(exports.getEditProjectEventsPageState, fromEditProjectEventsPage.getSaveEventDialogStatus);
exports.getUploadEventDialogStatus = store_1.createSelector(//remove
exports.getFileUploadPageState, fromFileUploadsPage.getUploadDialogStatus);
exports.getUploadProjectDialogStatus = store_1.createSelector(//Added
exports.getEditProjectUploadsListState, fromProjectUploadsPage.getUploadProjectDialogStatus);
/* Router and Tab Selectors */
exports.selectActiveTab = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.data && routerInfo.data.activeTab; });
exports.selectActiveProjectTab = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.data && routerInfo.data.activeProjectTab; });
exports.selectIsNewProject = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.data && routerInfo.data.isNew; });
exports.selectActiveFinanceTab = store_1.createSelector(fromRoot.getRouterInfo, function (routerInfo) { return routerInfo && routerInfo.data && routerInfo.data.activeFinanceTab; });
//# sourceMappingURL=index.js.map