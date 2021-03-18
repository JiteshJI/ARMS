"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadVendorAddressFail = exports.LoadVendorAddressSuccess = exports.LoadVendorAddressLoad = exports.LoadProjectTypesFail = exports.LoadProjectTypesSuccess = exports.LoadProjectTypes = exports.LoadProjectStatusFail = exports.LoadProjectSuccess = exports.LoadProjectStatus = exports.LoadProjectToEdit = exports.EditProjectPageActionTypes = void 0;
//import { ProjectForUpdate } from ',,/../models/project-to-update';
var EditProjectPageActionTypes;
(function (EditProjectPageActionTypes) {
    EditProjectPageActionTypes["LoadProjectToEdit"] = "[EditProjectPage] Load ProjectToEdit";
    EditProjectPageActionTypes["LoadProjectStatus"] = "[Project Status] Load Project Status";
    EditProjectPageActionTypes["LoadProjectStatusSuccess"] = "[Project Status Success] Load Project Status Success";
    EditProjectPageActionTypes["LoadProjectStatusFail"] = "[Project Status Success] Load Project Status  Fail";
    EditProjectPageActionTypes["LoadProjectTypesLoad"] = "[Project Types] Load Project Types";
    EditProjectPageActionTypes["LoadProjectTypesSuccess"] = "[Project Types Success] Load Project Types Success";
    EditProjectPageActionTypes["LoadProjectTypesFail"] = "[Project Types Success] Load Project Types  Fail";
    EditProjectPageActionTypes["LoadVendorAddressLoad"] = "[Vendor Address] Load Vendor Address";
    EditProjectPageActionTypes["LoadVendorAddressSuccess"] = "[Vendor Address Success] Load Vendor Address Success";
    EditProjectPageActionTypes["LoadVendorAddressFail"] = "[Vendor Address Success] Load Vendor Address  Fail";
})(EditProjectPageActionTypes = exports.EditProjectPageActionTypes || (exports.EditProjectPageActionTypes = {}));
var LoadProjectToEdit = /** @class */ (function () {
    function LoadProjectToEdit(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadProjectToEdit;
    }
    return LoadProjectToEdit;
}());
exports.LoadProjectToEdit = LoadProjectToEdit;
var LoadProjectStatus = /** @class */ (function () {
    function LoadProjectStatus() {
        this.type = EditProjectPageActionTypes.LoadProjectStatus;
    }
    return LoadProjectStatus;
}());
exports.LoadProjectStatus = LoadProjectStatus;
var LoadProjectSuccess = /** @class */ (function () {
    function LoadProjectSuccess(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadProjectStatusSuccess;
    }
    return LoadProjectSuccess;
}());
exports.LoadProjectSuccess = LoadProjectSuccess;
var LoadProjectStatusFail = /** @class */ (function () {
    function LoadProjectStatusFail(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadProjectStatusFail;
    }
    return LoadProjectStatusFail;
}());
exports.LoadProjectStatusFail = LoadProjectStatusFail;
var LoadProjectTypes = /** @class */ (function () {
    function LoadProjectTypes() {
        this.type = EditProjectPageActionTypes.LoadProjectTypesLoad;
    }
    return LoadProjectTypes;
}());
exports.LoadProjectTypes = LoadProjectTypes;
var LoadProjectTypesSuccess = /** @class */ (function () {
    function LoadProjectTypesSuccess(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadProjectTypesSuccess;
    }
    return LoadProjectTypesSuccess;
}());
exports.LoadProjectTypesSuccess = LoadProjectTypesSuccess;
var LoadProjectTypesFail = /** @class */ (function () {
    function LoadProjectTypesFail(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadProjectTypesFail;
    }
    return LoadProjectTypesFail;
}());
exports.LoadProjectTypesFail = LoadProjectTypesFail;
var LoadVendorAddressLoad = /** @class */ (function () {
    function LoadVendorAddressLoad(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadVendorAddressLoad;
    }
    return LoadVendorAddressLoad;
}());
exports.LoadVendorAddressLoad = LoadVendorAddressLoad;
var LoadVendorAddressSuccess = /** @class */ (function () {
    function LoadVendorAddressSuccess(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadVendorAddressSuccess;
    }
    return LoadVendorAddressSuccess;
}());
exports.LoadVendorAddressSuccess = LoadVendorAddressSuccess;
var LoadVendorAddressFail = /** @class */ (function () {
    function LoadVendorAddressFail(payload) {
        this.payload = payload;
        this.type = EditProjectPageActionTypes.LoadVendorAddressFail;
    }
    return LoadVendorAddressFail;
}());
exports.LoadVendorAddressFail = LoadVendorAddressFail;
//# sourceMappingURL=edit-project-page.actions.js.map