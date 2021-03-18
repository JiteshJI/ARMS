"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.Projectreducer = exports.getVendorAddressTypesReducer = exports.getProjectTypesReducer = exports.getProjectStatusReducer = void 0;
var store_1 = require("@ngrx/store");
var edit_project_page_actions_1 = require("../actions/edit-project-page.actions");
var initialState = {
    loading: false,
    error: '',
    ProjectStatusModel: [],
    ProjectTypesModel: [],
    VendorAddressModel: [],
    selectVendorAddress: ''
};
var getProjectFeatureState = store_1.createFeatureSelector('projects');
exports.getProjectStatusReducer = store_1.createSelector(getProjectFeatureState, function (state) { return state.ProjectStatusModel; });
exports.getProjectTypesReducer = store_1.createSelector(getProjectFeatureState, function (state) { return state.ProjectTypesModel; });
exports.getVendorAddressTypesReducer = store_1.createSelector(getProjectFeatureState, function (state) { return state.VendorAddressModel; });
function Projectreducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case edit_project_page_actions_1.EditProjectPageActionTypes.LoadProjectToEdit:
            return __assign(__assign({}, state), { error: '' });
        case edit_project_page_actions_1.EditProjectPageActionTypes.LoadProjectStatusSuccess: {
            console.log("Load project success");
            return __assign(__assign({}, state), { ProjectStatusModel: action.payload });
        }
        case edit_project_page_actions_1.EditProjectPageActionTypes.LoadProjectTypesSuccess: {
            console.log("Load project types success");
            return __assign(__assign({}, state), { ProjectTypesModel: action.payload });
        }
        case edit_project_page_actions_1.EditProjectPageActionTypes.LoadVendorAddressLoad: {
            console.log("Load vendor Address success");
            return __assign(__assign({}, state), { selectVendorAddress: action.payload });
        }
        case edit_project_page_actions_1.EditProjectPageActionTypes.LoadVendorAddressSuccess: {
            console.log("Load vendor Address success");
            return __assign(__assign({}, state), { VendorAddressModel: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.Projectreducer = Projectreducer;
exports.reducer = store_1.createReducer(initialState);
//# sourceMappingURL=edit-project-page.reducer.js.map