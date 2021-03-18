"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectActionTypes = exports.updateProject = exports.deleteProject = exports.createProject = exports.selectedProjectLoaded = exports.loadSelectedProject = exports.projectLoaded = exports.loadProjectsForSearchSuccess = exports.loadProjectsForSearch = exports.loadProject = exports.updateProjectType = exports.deleteProjectType = exports.createProjectType = exports.projectTypesLoaded = exports.loadProjectTypes = void 0;
var store_1 = require("@ngrx/store");
exports.loadProjectTypes = store_1.createAction('[ProjectType List] Load ProjectType via Service');
exports.projectTypesLoaded = store_1.createAction('[ProjectType Effect] ProjectType Loaded Successfully', store_1.props());
exports.createProjectType = store_1.createAction('[Create ProjectType Component] Create ProjectType', store_1.props());
exports.deleteProjectType = store_1.createAction('[ProjectType List Operations] Delete ProjectType', store_1.props());
exports.updateProjectType = store_1.createAction('[ProjectType List Operations] Update ProjectType', store_1.props());
//**************************Project***********************//
exports.loadProject = store_1.createAction('[Project List] Load Project via Service');
exports.loadProjectsForSearch = store_1.createAction('[Project List] Load Projects for search via Service');
exports.loadProjectsForSearchSuccess = store_1.createAction('[Project Effect] Projects for search Loaded Successfully', store_1.props());
exports.projectLoaded = store_1.createAction('[Project Effect] Project Loaded Successfully', store_1.props());
exports.loadSelectedProject = store_1.createAction('[Selected Project List] Load Selected Project via Service', store_1.props());
exports.selectedProjectLoaded = store_1.createAction('[Selected Project Effect] Selected Project Loaded Successfully', store_1.props());
exports.createProject = store_1.createAction('[Create Project Component] Create Project', store_1.props());
exports.deleteProject = store_1.createAction('[Project List Operations] Delete Project', store_1.props());
exports.updateProject = store_1.createAction('[Project List Operations] Update Project', store_1.props());
//**************************Project***********************//
exports.projectActionTypes = {
    loadProjectTypes: exports.loadProjectTypes,
    projectTypesLoaded: exports.projectTypesLoaded,
    createProjectType: exports.createProjectType,
    deleteProjectType: exports.deleteProjectType,
    updateProjectType: exports.updateProjectType,
    loadProject: exports.loadProject,
    loadProjectsForSearch: exports.loadProjectsForSearch,
    loadProjectsForSearchSuccess: exports.loadProjectsForSearchSuccess,
    projectLoaded: exports.projectLoaded,
    loadSelectedProject: exports.loadSelectedProject,
    selectedProjectLoaded: exports.selectedProjectLoaded,
    createProject: exports.createProject,
    deleteProject: exports.deleteProject,
    updateProject: exports.updateProject
};
//# sourceMappingURL=project.actions.js.map