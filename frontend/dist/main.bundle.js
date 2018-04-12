webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/amuser-settings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAmuserSettingForm;
/* harmony export (immutable) */ __webpack_exports__["b"] = createDefaultAmuserSettingForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_validation__ = __webpack_require__("./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_validation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_validation__);


function createAmuserSettingForm(settings, fb) {
    var disable_temp = true;
    if (settings.temperature_option == 'manual') {
        disable_temp = false;
    }
    var fg = fb.group({
        temperature_option: [settings.temperature_option, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required],
        melting_temperature: [{ value: settings.melting_temperature, disabled: disable_temp }, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([40, 72])],
        primer_concentration: [settings.primer_concentration, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([0.05, 5])],
        sodium_concentration: [settings.sodium_concentration, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([10, 150])],
        circular_output: [settings.circular_output, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required]
    });
    return fg;
}
function createDefaultAmuserSettingForm(fb) {
    var fg = fb.group({
        temperature_option: ['manual', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required],
        melting_temperature: [{ value: 50, disabled: false }, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([40, 72])],
        primer_concentration: [0.05, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([0.05, 5])],
        sodium_concentration: [50, __WEBPACK_IMPORTED_MODULE_1_ng2_validation__["CustomValidators"].range([10, 150])],
        circular_output: [false, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required]
    });
    return fg;
}


/***/ }),

/***/ "./src/app/amuser-settings/amuser-settings.component.css":
/***/ (function(module, exports) {

module.exports = ".material-icons {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    vertical-align: middle;\n    cursor: help;\n}\n"

/***/ }),

/***/ "./src/app/amuser-settings/amuser-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- TODO: Move settings to card -->\n<form [formGroup]=\"settings\">\n  <label>Target temperature</label><br>\n  <mat-radio-group (change)=\"toggle($event)\" formControlName=\"temperature_option\">\n    <mat-radio-button value=\"none\">\n      None\n    </mat-radio-button>\n    <mat-icon\n      matTooltip=\"Do not optimise towards a target temperature\"\n      class=\"material-icons\"\n      >\n      info\n    </mat-icon>\n    <br>\n    <mat-radio-button value=\"eq\">\n      Shared\n    </mat-radio-button>\n    <mat-icon \n      matTooltip=\"Try to find similar melting temperature for all primers\"\n      class=\"material-icons\">\n      info\n    </mat-icon>\n    <br>\n    <mat-radio-button value=\"manual\">\n      Manually\n    </mat-radio-button>\n    <mat-icon \n      matTooltip=\"Manually set the target melting temperature\"\n      class=\"material-icons\">\n      info\n    </mat-icon>\n    <br><br>\n  </mat-radio-group>\n  <mat-form-field>\n    <input matInput\n      formControlName=\"melting_temperature\"\n      type=\"number\"\n      placeholder=\"Melting Temperature\"\n      >\n    <mat-hint\n      align=\"start\"\n      [ngStyle]=\"{'color': 'red'}\"\n      *ngIf=\"settings.controls.melting_temperature.errors\">\n      Value has to in range 40 to 72 degrees\n    </mat-hint>\n  </mat-form-field>\n  <br><br>\n  <mat-form-field>\n    <input matInput\n      formControlName=\"primer_concentration\"\n      type=\"number\"\n      placeholder=\"Primer Concentration (μM)\"\n      >\n      <mat-hint\n      align=\"start\"\n      [ngStyle]=\"{'color': 'red'}\"\n      *ngIf=\"settings.controls.primer_concentration.errors\">\n      Value has to in range 0.05 to 5 μM\n    </mat-hint>\n  </mat-form-field>\n  <br><br>\n  <mat-form-field>\n    <input matInput\n      formControlName=\"sodium_concentration\"\n      type=\"number\"\n      placeholder=\"Sodium Concentration (mM)\"\n      >\n    <mat-hint\n      align=\"start\"\n      [ngStyle]=\"{'color': 'red'}\"\n      *ngIf=\"settings.controls.sodium_concentration.errors\">\n      Value has to in range 10 to 150 mM\n    </mat-hint>\n  </mat-form-field>\n  <br><br>\n  <mat-checkbox\n      formControlName=\"circular_output\"\n      type=\"checkbox\"\n      >Circular output\n  </mat-checkbox>\n</form>"

/***/ }),

/***/ "./src/app/amuser-settings/amuser-settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmuserSettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AmuserSettingsComponent = /** @class */ (function () {
    function AmuserSettingsComponent() {
        this.settingsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AmuserSettingsComponent.prototype.ngOnInit = function () {
    };
    AmuserSettingsComponent.prototype.toggle = function ($ev) {
        var control = this.settings.get('melting_temperature');
        if (control.disabled && $ev.value === 'manual') {
            control.enable();
        }
        else if (!control.disabled && !($ev.value === 'manual')) {
            control.disable();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"])
    ], AmuserSettingsComponent.prototype, "settings", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AmuserSettingsComponent.prototype, "settingsChange", void 0);
    AmuserSettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-amuser-settings',
            template: __webpack_require__("./src/app/amuser-settings/amuser-settings.component.html"),
            styles: [__webpack_require__("./src/app/amuser-settings/amuser-settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AmuserSettingsComponent);
    return AmuserSettingsComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "/*html, body, material-app, mat-sidenav-container, .sidenav-content {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n}\n\nmat-sidenav {\n  width: 200px;\n}*/\n\n.spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container fullscreen>\n  <mat-sidenav #sidenav class=\"sidenav\" opened=\"false\">\n    <mat-toolbar color=\"primary\">\n      Where to?\n    </mat-toolbar>\n    <mat-nav-list>\n      <a mat-list-item (click)=\"sidenav.close()\" routerLink=\"/\">Frontpage</a>\n      <a mat-list-item (click)=\"sidenav.close()\" routerLink=\"/browse\">Browse existing</a>\n      <a mat-list-item (click)=\"sidenav.close()\" routerLink=\"/new_project\">Create single new</a>\n      <a mat-list-item (click)=\"sidenav.close()\" routerLink=\"/combinatorial\">Create several new</a>\n    </mat-nav-list>\n  </mat-sidenav>\n  <div class=\"sidenav-content\">\n    <mat-toolbar color=\"primary\">\n      <button mat-icon-button (click)=\"sidenav.open()\">\n        <mat-icon>menu</mat-icon>\n      </button>\n\n      <span>Primer Suggestion</span>\n\n      <span class=\"spacer\"></span>\n\n      <div *ngIf='loggedIn(); else notLoggedInBlock'>\n        <button mat-button (click)=\"logout()\">Log out</button>\n      </div>\n      <ng-template #notLoggedInBlock>\n        <button mat-button (click)=\"openLoginDialog()\">Log in</button>\n      </ng-template>\n      <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n        <mat-icon>more_vert</mat-icon>\n      </button>\n\n      <!-- TODO: add the menu options for dark/high contrast -->\n      <mat-menu #menu=\"matMenu\">\n      <button mat-menu-item routerLink=\"/user_settings\">\n        <mat-icon>dialpad</mat-icon>\n        <span>User Settings</span>\n      </button>\n      <button mat-menu-item disabled>\n        <mat-icon>voicemail</mat-icon>\n        <span>Option 2</span>\n      </button>\n      <button mat-menu-item>\n        <mat-icon>notifications_off</mat-icon>\n        <span>Option 3</span>\n      </button>\n      </mat-menu>\n    </mat-toolbar>\n    <br>\n    <div fxLayout='row'>\n      <div fxFlex='100'>\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n  </div>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jwt_authentication_service__ = __webpack_require__("./src/app/jwt-authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(dialog, _authService) {
        this.dialog = dialog;
        this._authService = _authService;
        this.title = 'Primer Suggestion';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])()) {
            this._authService.scheduleRefresh();
        }
        else {
            setTimeout(function () { return _this.openLoginDialog(); }, 200);
        }
    };
    AppComponent.prototype.openLoginDialog = function () {
        var config = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDialogConfig */]();
        config.disableClose = true;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */], config);
    };
    AppComponent.prototype.loggedIn = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])();
    };
    AppComponent.prototype.logout = function () {
        // TODO: This should be handled by the auth service
        localStorage.removeItem('token');
        this.openLoginDialog();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_4__jwt_authentication_service__["a" /* JwtAuthenticationService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */],
            __WEBPACK_IMPORTED_MODULE_4__jwt_authentication_service__["a" /* JwtAuthenticationService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__ = __webpack_require__("./node_modules/ng2-dragula/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__covalent_core__ = __webpack_require__("./node_modules/@covalent/core/esm5/covalent-core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__ = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routing__ = __webpack_require__("./src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__rxjs_extensions__ = __webpack_require__("./src/app/rxjs-extensions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_hammerjs__ = __webpack_require__("./node_modules/hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__seq_record_service__ = __webpack_require__("./src/app/seq-record.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__project_service__ = __webpack_require__("./src/app/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__part_service__ = __webpack_require__("./src/app/part.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__combinatorial_service__ = __webpack_require__("./src/app/combinatorial.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__auth_auth_module__ = __webpack_require__("./src/app/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__seq_record_list_seq_record_list_component__ = __webpack_require__("./src/app/seq-record-list/seq-record-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__seq_record_search_seq_record_search_component__ = __webpack_require__("./src/app/seq-record-search/seq-record-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__project_list_project_list_component__ = __webpack_require__("./src/app/project-list/project-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__project_detail_project_detail_component__ = __webpack_require__("./src/app/project-detail/project-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__report_detail_report_detail_component__ = __webpack_require__("./src/app/report-detail/report-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__project_search_project_search_component__ = __webpack_require__("./src/app/project-search/project-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__sequence_selector_sequence_selector_component__ = __webpack_require__("./src/app/sequence-selector/sequence-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__part_search_part_search_component__ = __webpack_require__("./src/app/part-search/part-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__part_uploader_part_uploader_component__ = __webpack_require__("./src/app/part-uploader/part-uploader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__project_bundle_project_bundle_component__ = __webpack_require__("./src/app/project-bundle/project-bundle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__amuser_settings_amuser_settings_component__ = __webpack_require__("./src/app/amuser-settings/amuser-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__new_project_new_project_component__ = __webpack_require__("./src/app/new-project/new-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__part_selector_part_selector_component__ = __webpack_require__("./src/app/part-selector/part-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__project_card_project_card_component__ = __webpack_require__("./src/app/project-card/project-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__project_bundle_cards_project_bundle_cards_component__ = __webpack_require__("./src/app/project-bundle-cards/project-bundle-cards.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__welcome_text_welcome_text_component__ = __webpack_require__("./src/app/welcome-text/welcome-text.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__project_visualizer_project_visualizer_component__ = __webpack_require__("./src/app/project-visualizer/project-visualizer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__primer_detail_primer_detail_component__ = __webpack_require__("./src/app/primer-detail/primer-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__project_create_project_create_component__ = __webpack_require__("./src/app/project-create/project-create.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__project_csv_downloader_project_csv_downloader_component__ = __webpack_require__("./src/app/project-csv-downloader/project-csv-downloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__project_table_project_table_component__ = __webpack_require__("./src/app/project-table/project-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__combinatorial_detail_combinatorial_detail_component__ = __webpack_require__("./src/app/combinatorial-detail/combinatorial-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__combinatorial_table_combinatorial_table_component__ = __webpack_require__("./src/app/combinatorial-table/combinatorial-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__part_multi_selector_part_multi_selector_component__ = __webpack_require__("./src/app/part-multi-selector/part-multi-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ice_login_setter_ice_login_setter_component__ = __webpack_require__("./src/app/ice-login-setter/ice-login-setter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__not_found_not_found_component__ = __webpack_require__("./src/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__part_error_dialog_part_error_dialog_component__ = __webpack_require__("./src/app/part-error-dialog/part-error-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__project_error_dialog_project_error_dialog_component__ = __webpack_require__("./src/app/project-error-dialog/project-error-dialog.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpClientXsrfModule */].withOptions({
                    cookieName: '_xsrf',
                    headerName: 'X-CSRFToken'
                }),
                __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__["DragulaModule"],
                __WEBPACK_IMPORTED_MODULE_18__auth_auth_module__["a" /* AuthModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["a" /* CovalentDataTableModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["c" /* CovalentLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["b" /* CovalentExpansionPanelModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["d" /* CovalentPagingModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["e" /* CovalentSearchModule */],
                __WEBPACK_IMPORTED_MODULE_6__covalent_core__["f" /* CovalentStepsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_10__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["c" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["q" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["w" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["u" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["t" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["l" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["v" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["m" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["r" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["p" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["k" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["n" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["j" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["o" /* MatOptionModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["b" /* MatAutocompleteModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_19__seq_record_list_seq_record_list_component__["a" /* SeqRecordListComponent */],
                __WEBPACK_IMPORTED_MODULE_21__project_list_project_list_component__["a" /* ProjectListComponent */],
                __WEBPACK_IMPORTED_MODULE_22__project_detail_project_detail_component__["a" /* ProjectDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_20__seq_record_search_seq_record_search_component__["a" /* SeqRecordSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_23__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_24__report_detail_report_detail_component__["a" /* ReportDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_25__project_search_project_search_component__["a" /* ProjectSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_26__sequence_selector_sequence_selector_component__["a" /* SequenceSelectorComponent */],
                __WEBPACK_IMPORTED_MODULE_27__part_search_part_search_component__["a" /* PartSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_28__part_uploader_part_uploader_component__["a" /* PartUploaderComponent */],
                __WEBPACK_IMPORTED_MODULE_29__project_bundle_project_bundle_component__["a" /* ProjectBundleComponent */],
                __WEBPACK_IMPORTED_MODULE_30__amuser_settings_amuser_settings_component__["a" /* AmuserSettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_31__new_project_new_project_component__["a" /* NewProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_32__part_selector_part_selector_component__["a" /* PartSelectorComponent */],
                __WEBPACK_IMPORTED_MODULE_33__project_card_project_card_component__["a" /* ProjectCardComponent */],
                __WEBPACK_IMPORTED_MODULE_34__project_bundle_cards_project_bundle_cards_component__["a" /* ProjectBundleCardsComponent */],
                __WEBPACK_IMPORTED_MODULE_35__welcome_text_welcome_text_component__["a" /* WelcomeTextComponent */],
                __WEBPACK_IMPORTED_MODULE_36__project_visualizer_project_visualizer_component__["a" /* ProjectVisualizerComponent */],
                __WEBPACK_IMPORTED_MODULE_36__project_visualizer_project_visualizer_component__["b" /* SafePipe */],
                __WEBPACK_IMPORTED_MODULE_37__primer_detail_primer_detail_component__["a" /* PrimerDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_38__project_create_project_create_component__["a" /* ProjectCreateComponent */],
                __WEBPACK_IMPORTED_MODULE_39__project_csv_downloader_project_csv_downloader_component__["a" /* ProjectCsvDownloaderComponent */],
                __WEBPACK_IMPORTED_MODULE_40__project_table_project_table_component__["a" /* ProjectTableComponent */],
                __WEBPACK_IMPORTED_MODULE_41__combinatorial_detail_combinatorial_detail_component__["a" /* CombinatorialDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_42__combinatorial_table_combinatorial_table_component__["a" /* CombinatorialTableComponent */],
                __WEBPACK_IMPORTED_MODULE_43__part_multi_selector_part_multi_selector_component__["a" /* PartMultiSelectorComponent */],
                __WEBPACK_IMPORTED_MODULE_44__ice_login_setter_ice_login_setter_component__["a" /* IceLoginSetterComponent */],
                __WEBPACK_IMPORTED_MODULE_45__not_found_not_found_component__["a" /* NotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_46__part_error_dialog_part_error_dialog_component__["a" /* PartErrorDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_47__project_error_dialog_project_error_dialog_component__["a" /* ProjectErrorDialogComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__seq_record_service__["a" /* SeqRecordService */],
                __WEBPACK_IMPORTED_MODULE_15__project_service__["a" /* ProjectService */],
                __WEBPACK_IMPORTED_MODULE_16__part_service__["b" /* PartService */],
                __WEBPACK_IMPORTED_MODULE_16__part_service__["a" /* IcePartService */],
                __WEBPACK_IMPORTED_MODULE_17__combinatorial_service__["a" /* CombinatorialService */],
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_23__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_46__part_error_dialog_part_error_dialog_component__["a" /* PartErrorDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_47__project_error_dialog_project_error_dialog_component__["a" /* ProjectErrorDialogComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_list_project_list_component__ = __webpack_require__("./src/app/project-list/project-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_detail_project_detail_component__ = __webpack_require__("./src/app/project-detail/project-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_bundle_project_bundle_component__ = __webpack_require__("./src/app/project-bundle/project-bundle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__combinatorial_detail_combinatorial_detail_component__ = __webpack_require__("./src/app/combinatorial-detail/combinatorial-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__new_project_new_project_component__ = __webpack_require__("./src/app/new-project/new-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__project_create_project_create_component__ = __webpack_require__("./src/app/project-create/project-create.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_csv_downloader_project_csv_downloader_component__ = __webpack_require__("./src/app/project-csv-downloader/project-csv-downloader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__not_found_not_found_component__ = __webpack_require__("./src/app/not-found/not-found.component.ts");









var appRoutes = [
    {
        path: '',
        redirectTo: '/projects',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: __WEBPACK_IMPORTED_MODULE_1__project_list_project_list_component__["a" /* ProjectListComponent */]
    },
    {
        path: 'projects/:id',
        component: __WEBPACK_IMPORTED_MODULE_2__project_detail_project_detail_component__["a" /* ProjectDetailComponent */]
    },
    {
        path: 'combinatorial',
        component: __WEBPACK_IMPORTED_MODULE_3__project_bundle_project_bundle_component__["a" /* ProjectBundleComponent */]
    },
    {
        path: 'combinatorial/:id',
        component: __WEBPACK_IMPORTED_MODULE_4__combinatorial_detail_combinatorial_detail_component__["a" /* CombinatorialDetailComponent */]
    },
    {
        path: 'new_project',
        component: __WEBPACK_IMPORTED_MODULE_5__new_project_new_project_component__["a" /* NewProjectComponent */]
    },
    {
        path: 'create_projects',
        component: __WEBPACK_IMPORTED_MODULE_6__project_create_project_create_component__["a" /* ProjectCreateComponent */]
    },
    {
        path: 'browse',
        component: __WEBPACK_IMPORTED_MODULE_7__project_csv_downloader_project_csv_downloader_component__["a" /* ProjectCsvDownloaderComponent */]
    },
    {
        path: '404',
        component: __WEBPACK_IMPORTED_MODULE_8__not_found_not_found_component__["a" /* NotFoundComponent */]
    },
    {
        path: '**',
        redirectTo: '404'
    },
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthConfig"](), http, options);
}
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
                    useFactory: authHttpServiceFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]]
                }
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/base-api.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseAPI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");




var BaseAPI = /** @class */ (function () {
    function BaseAPI(_authHttp, _router, extendedUrl) {
        this._authHttp = _authHttp;
        this._router = _router;
        this.extendedUrl = extendedUrl;
        /*
         * Base methods for interaction with backend
         */
        this.baseUrl = '/rest/api/';
        this.fullUrl = this.baseUrl + extendedUrl + '/';
    }
    BaseAPI.prototype.composeHeader = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    };
    BaseAPI.prototype.getAll = function () {
        var records$ = this._authHttp
            .get(this.getFullUrl(), { headers: this.composeHeader() })
            .map(this.mapRecords).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(error.json().error || 'Server error'); });
        return records$;
    };
    BaseAPI.prototype.get = function (id) {
        var self = this;
        var record$ = this._authHttp
            .get(this.getFullUrl() + id + '/', { headers: this.composeHeader() })
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            self._router.navigate(['/404']);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(error.json().error || 'Server error');
        });
        return record$;
    };
    BaseAPI.prototype.search = function (q) {
        var record$ = this._authHttp
            .get(this.getFullUrl() + ("?search=" + q), { headers: this.composeHeader() })
            .map(this.mapRecords)
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].throw(error || 'Server error'); });
        return record$;
    };
    BaseAPI.prototype.getFullUrl = function () {
        return this.fullUrl;
    };
    BaseAPI.prototype.mapRecords = function (response) {
        return response.json()
            .results
            .map(function (r) { return r; });
    };
    return BaseAPI;
}());



/***/ }),

/***/ "./src/app/combinatorial-detail/combinatorial-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-around stretch\" *ngIf=\"combinatorial\">\n      <mat-card fxFlex=\"50\">\n        <mat-toolbar color=\"primary\">\n          <span>Settings</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <app-amuser-settings\n            [(settings)]=\"newCombinatorialForm.controls.amusercloning\">\n          </app-amuser-settings>\n        </mat-card-content>\n      </mat-card>\n\n      <mat-card fxFlex=\"50\">\n        <mat-toolbar color=\"primary\">\n          <span>Parts</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <app-part-multi-selector\n            [(partArrs)]='newCombinatorialForm.controls.parts'>\n          </app-part-multi-selector>\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-raised-button\n            color=\"primary\"\n            (click)=\"partSelector.addPart()\">\n            Add part\n          </button>\n        </mat-card-actions>\n      </mat-card>\n    </div>\n    <br>\n    <!-- TODO: Add loader when changing project -->\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-around stretch\" *ngIf=\"combinatorial\">\n      <mat-card fxFlex=\"100\">\n        <mat-toolbar color=\"primary\">\n          <span>Results</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <mat-tab-group [selectedIndex]=\"activeTab\">            \n            <mat-tab label=\"Projects\">\n              <app-project-table\n                [(projectObservable)]=\"projectObservable\">\n              </app-project-table>\n            </mat-tab>\n\n            <mat-tab \n              label=\"Files\">\n              <button mat-button\n                (click)='downloadCsv()'>\n                Download Csv\n              </button>\n              <button mat-button\n                (click)='downloadGenbank()'>\n                Download Genbank\n              </button>\n            </mat-tab>\n          </mat-tab-group>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/combinatorial-detail/combinatorial-detail.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/combinatorial-detail/combinatorial-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CombinatorialDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__amuser_settings__ = __webpack_require__("./src/app/amuser-settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__combinatorial_service__ = __webpack_require__("./src/app/combinatorial.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CombinatorialDetailComponent = /** @class */ (function () {
    function CombinatorialDetailComponent(_combinatorialService, fb, route) {
        this._combinatorialService = _combinatorialService;
        this.fb = fb;
        this.route = route;
    }
    CombinatorialDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this._combinatorialObservable = _this._combinatorialService.get(id);
            _this.updateProjectObservables();
            _this._combinatorialObservable
                .subscribe(function (res) {
                _this.combinatorial = res;
                _this.initForm();
                _this.updateProjectObservables();
            });
        });
    };
    CombinatorialDetailComponent.prototype.updateProjectObservables = function () {
        this.projectObservable = this._combinatorialObservable.map(function (res) { return res.projects; })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of([]);
        });
    };
    CombinatorialDetailComponent.prototype.initForm = function () {
        var _this = this;
        var partFormArray = this.initPartFormArray(this.combinatorial.parts);
        this.newCombinatorialForm = this.fb.group({
            name: [this.combinatorial.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            description: [this.combinatorial.description],
            parts: this.fb.array(partFormArray, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2)),
            amusercloning: Object(__WEBPACK_IMPORTED_MODULE_5__amuser_settings__["a" /* createAmuserSettingForm */])(this.combinatorial.amusercloning, this.fb)
        });
        this.newCombinatorialForm.valueChanges
            .debounceTime(500)
            .subscribe(function (data) {
            _this.save();
        });
    };
    CombinatorialDetailComponent.prototype.initPartFormArray = function (partArray) {
        var _this = this;
        var partFormArray = partArray.map(function (part) {
            return _this.initColumn(part);
        });
        return partFormArray;
    };
    CombinatorialDetailComponent.prototype.initColumn = function (parts) {
        var _this = this;
        var PartFormArray = parts.map(function (part) {
            return _this.initPartForm(part);
        });
        return this.fb.group({
            parts: this.fb.array(PartFormArray, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(1), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required])),
        });
    };
    CombinatorialDetailComponent.prototype.initPartForm = function (part) {
        var fg = this.fb.group({
            id: [part.id],
            name: [part.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            order: [part.order, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_name: [part.ice_name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_id: [part.ice_id, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            errors: [part.errors, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(0)]
        });
        return fg;
    };
    CombinatorialDetailComponent.prototype.downloadCsv = function () {
        var _this = this;
        this._combinatorialService.getCsv(this.combinatorial)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_4_file_saver__["saveAs"])(blob, _this.combinatorial.name + '.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () { });
    };
    CombinatorialDetailComponent.prototype.downloadGenbank = function () {
        var _this = this;
        this._combinatorialService.getGenbank(this.combinatorial)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'application/x-zip-compressed' });
            Object(__WEBPACK_IMPORTED_MODULE_4_file_saver__["saveAs"])(blob, _this.combinatorial.name + '.zip');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () { });
    };
    CombinatorialDetailComponent.prototype.save = function () {
        var _this = this;
        if (this.newCombinatorialForm.valid) {
            var combinatorial = this.newCombinatorialForm.value;
            combinatorial.parts = this.combinatorial.parts.map(function (res) {
                return res;
            });
            combinatorial.id = this.combinatorial.id;
            this._combinatorialService.update(combinatorial)
                .subscribe(function (res) {
                _this.combinatorial = res;
                _this.updateProjectObservables();
            }, function (err) {
                console.log(err);
            });
        }
    };
    CombinatorialDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-combinatorial-detail',
            template: __webpack_require__("./src/app/combinatorial-detail/combinatorial-detail.component.html"),
            styles: [__webpack_require__("./src/app/combinatorial-detail/combinatorial-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__combinatorial_service__["a" /* CombinatorialService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]])
    ], CombinatorialDetailComponent);
    return CombinatorialDetailComponent;
}());



/***/ }),

/***/ "./src/app/combinatorial-table/combinatorial-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mat-table-container\" title>\n  <table td-data-table>\n    <th td-data-table-column class=\"mat-checkbox-column\">\n      <mat-checkbox\n        #checkBoxAll\n        [disabled]=\"!hasData\"\n        [indeterminate]=\"isAnySelected() && !isAllSelected()\"\n        [checked]=\"isAllSelected() && hasData\"\n        (keyup.enter)=\"selectAll(checkBoxAll.checked)\"\n        (keyup.space)=\"selectAll(checkBoxAll.checked)\"\n        (keydown.space)=\"blockEvent($event)\"\n        (click)=\"selectAll(checkBoxAll.checked)\">\n      </mat-checkbox>\n    </th>\n    <th td-data-table-column\n      *ngFor=\"let column of columns\"\n      [name]=\"column.name\">\n      <span [matTooltip]=\"column.tooltip\">{{column.label}}</span>\n    </th>\n    <tr \n      td-data-table-row\n      *ngFor='let combinatorial of combinatorialObservable | async'>\n      <td td-data-table-cell class=\"mat-checkbox-cell\">\n        <mat-pseudo-checkbox\n          [state]='isCombinatorialSelected(combinatorial) ? \"checked\" : \"unchecked\"'\n          (click)='select(combinatorial)'>\n        </mat-pseudo-checkbox>\n      </td>\n      <td td-data-table-cell>\n        {{combinatorial.name}}\n      </td>\n      <td td-data-table-cell>\n        <div *ngIf='combinatorial.description; else ElseBlock'>\n          <span>\n            {{combinatorial.description}}\n          </span>\n        </div>\n        <ng-template #ElseBlock>\n          <span class=\"md-body-1\">\n            No description\n          </span>\n        </ng-template>\n      </td>\n      <td td-data-table-cell>\n        <span text-align='left'>\n          {{combinatorial.projects.length}}\n        </span>\n      </td>\n      <td td-data-table-cell>\n        <span>\n          <button mat-button\n            [routerLink]=\"['/combinatorial/'+combinatorial.id]\">\n            <mat-icon>\n              mode_edit\n            </mat-icon>\n          </button>\n          <button mat-button\n            (click)='downloadCsv(combinatorial)'>\n            <mat-icon>\n              file_download\n            </mat-icon>\n          </button>\n        </span>\n      </td>\n    </tr>\n  </table>\n</div>"

/***/ }),

/***/ "./src/app/combinatorial-table/combinatorial-table.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/combinatorial-table/combinatorial-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CombinatorialTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__combinatorial_service__ = __webpack_require__("./src/app/combinatorial.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CombinatorialTableComponent = /** @class */ (function () {
    function CombinatorialTableComponent(_combinatorialService) {
        this._combinatorialService = _combinatorialService;
        this.combinatorialObservableChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.combinatorialList = [];
        this.selectedCombinatorials = [];
        this.columns = [
            { name: 'name', label: 'Combinatorial name' },
            { name: 'description', label: 'Description' },
            { name: 'parts', label: 'Number of projects' },
            { name: 'actions', label: 'Actions' },
        ];
        this.hasData = false;
    }
    CombinatorialTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.combinatorialSubscription = this.combinatorialObservable.subscribe(function (res) {
            _this.hasData = true;
            _this.combinatorialList = res;
        });
    };
    CombinatorialTableComponent.prototype.select = function (combinatorial) {
        /*
          Toggle select on a single combinatorial row and
          emit the new select list
        */
        var index = this.getCombinatorialIdx(combinatorial);
        if (index > -1) {
            this.selectedCombinatorials.splice(index, 1);
        }
        else {
            this.selectedCombinatorials.push(combinatorial);
        }
        this.combinatorialObservableChange.emit(this.selectedCombinatorials);
    };
    CombinatorialTableComponent.prototype.selectAll = function (checked) {
        var _this = this;
        /*
          Toggle select on all projects and emit the new list
        */
        if (this.hasData) {
            if (checked) {
                this.selectedCombinatorials = [];
            }
            else {
                this.combinatorialList.map(function (project) {
                    if (!_this.isCombinatorialSelected(project)) {
                        _this.selectedCombinatorials.push(project);
                    }
                });
            }
        }
        this.combinatorialObservableChange.emit(this.selectedCombinatorials);
    };
    CombinatorialTableComponent.prototype.isCombinatorialSelected = function (combinatorial) {
        /*
          Returns a boolean indicating whether the combinatorial
          is present in the selectedProjects list
        */
        return this.getCombinatorialIdx(combinatorial) > -1;
    };
    CombinatorialTableComponent.prototype.isAllSelected = function () {
        var _this = this;
        /*
          Returns true if ALL projects in the table are selected
        */
        return this.combinatorialList.every(function (el) { return _this.isCombinatorialSelected(el); });
    };
    CombinatorialTableComponent.prototype.isAnySelected = function () {
        var _this = this;
        /*
          Returns true if ANY project in the table is selected
        */
        return this.combinatorialList.some(function (el) { return _this.isCombinatorialSelected(el); });
    };
    CombinatorialTableComponent.prototype.getCombinatorialIdx = function (combinatorial) {
        /*
          Finds the id of the Combinatorial in the selected array
          based on the id of the Combinatorial itself.
        */
        return this.selectedCombinatorials.map(function (el) { return el.id; }).indexOf(combinatorial.id);
    };
    CombinatorialTableComponent.prototype.downloadCsv = function (combinatorial) {
        this._combinatorialService.getCsv(combinatorial)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_2_file_saver__["saveAs"])(blob, 'test.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () { });
    };
    CombinatorialTableComponent.prototype.blockEvent = function ($ev) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
    ], CombinatorialTableComponent.prototype, "combinatorialObservable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CombinatorialTableComponent.prototype, "combinatorialObservableChange", void 0);
    CombinatorialTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-combinatorial-table',
            template: __webpack_require__("./src/app/combinatorial-table/combinatorial-table.component.html"),
            styles: [__webpack_require__("./src/app/combinatorial-table/combinatorial-table.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__combinatorial_service__["a" /* CombinatorialService */]])
    ], CombinatorialTableComponent);
    return CombinatorialTableComponent;
}());



/***/ }),

/***/ "./src/app/combinatorial.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CombinatorialService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__base_api__ = __webpack_require__("./src/app/base-api.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CombinatorialService = /** @class */ (function (_super) {
    __extends(CombinatorialService, _super);
    function CombinatorialService(_authHttp, _router) {
        return _super.call(this, _authHttp, _router, 'combinatorial') || this;
    }
    CombinatorialService.prototype.create = function (combinatorial) {
        var res = this._authHttp
            .post(this.getFullUrl(), JSON.stringify(combinatorial), { headers: this.composeHeader() })
            .map(function (el) { return el.json(); });
        return res;
    };
    CombinatorialService.prototype.update = function (combinatorial) {
        var id = combinatorial.id;
        var res = this._authHttp
            .put(this.getFullUrl() + (id + "/"), JSON.stringify(combinatorial), { headers: this.composeHeader() })
            .map(function (el) { return el.json(); });
        return res;
    };
    CombinatorialService.prototype.getCsv = function (combinatorial) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'text/csv');
        var csvResp = this._authHttp
            .get(this.getFullUrl() + combinatorial.id + '/csv/', { headers: headers })
            .map(function (res) { return res['_body']; })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["a" /* Observable */].throw(err.json()); });
        return csvResp;
    };
    CombinatorialService.prototype.getGenbank = function (combinatorial) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var csvResp = this._authHttp
            .get(this.getFullUrl() + combinatorial.id + '/genbank/', { headers: headers })
            .map(function (res) { return res['_body']; })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["a" /* Observable */].throw(err.json()); });
        return csvResp;
    };
    CombinatorialService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], CombinatorialService);
    return CombinatorialService;
}(__WEBPACK_IMPORTED_MODULE_7__base_api__["a" /* BaseAPI */]));



/***/ }),

/***/ "./src/app/ice-login-setter/ice-login-setter.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <td-layout-card-over>\n      <h1 matDialogTitle class=\"ice-form\">Ice Login Information</h1>\n      <div *ngIf='credentialsForm'>\n        <form [formGroup]='credentialsForm'\n          class=\"ice-form\">\n          <mat-form-field>\n            <input matInput\n              formControlName='ice_username'\n              placeholder=\"Ice Login Name\" \n              type=\"text\"\n              autocomplete=\"off\">\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput\n              formControlName='ice_password'\n              placeholder=\"Ice Password\" \n              type=\"password\"\n              autocomplete=\"off\">\n          </mat-form-field>\n          <mat-error *ngIf=\"showError\">\n            Credentials or password incorrect. Please try again.\n          </mat-error>\n        </form>\n        <button\n          mat-button\n          mat-dialog-actions\n          (click)='updateIceCredentials()'>\n          Update\n        </button>\n      </div>\n    </td-layout-card-over>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/ice-login-setter/ice-login-setter.component.scss":
/***/ (function(module, exports) {

module.exports = ".ice-form {\n  padding-left: 16px; }\n"

/***/ }),

/***/ "./src/app/ice-login-setter/ice-login-setter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IceLoginSetterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_information_service__ = __webpack_require__("./src/app/user-information.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IceLoginSetterComponent = /** @class */ (function () {
    function IceLoginSetterComponent(_userService, _fb) {
        this._userService = _userService;
        this._fb = _fb;
        this.showError = false;
    }
    IceLoginSetterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getIceLoginInformation()
            .subscribe(function (data) {
            _this.credentialsForm = _this._fb.group({
                ice_username: [data.ice_username, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
                ice_password: [data.ice_password, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]
            });
        });
    };
    IceLoginSetterComponent.prototype.updateIceCredentials = function () {
        this.credentials = this.credentialsForm.value;
        var ret = this._userService.updateIceLoginInformation(this.credentials)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    IceLoginSetterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-ice-login-setter',
            template: __webpack_require__("./src/app/ice-login-setter/ice-login-setter.component.html"),
            styles: [__webpack_require__("./src/app/ice-login-setter/ice-login-setter.component.scss")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__user_information_service__["a" /* UserInformationService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_information_service__["a" /* UserInformationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]])
    ], IceLoginSetterComponent);
    return IceLoginSetterComponent;
}());



/***/ }),

/***/ "./src/app/jwt-authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtAuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_async__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/async.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JwtAuthenticationService = /** @class */ (function () {
    function JwtAuthenticationService(_http, _authHttp) {
        this._http = _http;
        this._authHttp = _authHttp;
        this._jwtHelper = new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["JwtHelper"]();
    }
    JwtAuthenticationService.prototype.login = function (credentials) {
        var ret = this._http.post('/rest/api/token-auth/', credentials);
        // The token is set in the login component along with the ice_token
        return ret;
    };
    JwtAuthenticationService.prototype.refreshToken = function (state) {
        var token = {
            token: localStorage.getItem('token')
        };
        var ret = state._authHttp.post('/rest/api/token-refresh/', token)
            .map(function (el) { return el.json(); })
            .subscribe(function (data) {
            localStorage.setItem('token', data['token']);
            state.scheduleRefresh();
        }, function (error) {
        });
        return ret;
    };
    JwtAuthenticationService.prototype.scheduleRefresh = function () {
        var _this = this;
        this._authHttp.tokenStream.subscribe(function (token) {
            if (token) {
                var now = new Date().valueOf();
                var jwtExp = _this._jwtHelper.decodeToken(token).exp;
                var exp = new Date(0);
                exp.setUTCSeconds(jwtExp);
                var delay = exp.valueOf() - now - 2000;
                __WEBPACK_IMPORTED_MODULE_3_rxjs_scheduler_async__["a" /* async */].schedule(_this.refreshToken, delay, _this);
            }
        }, function (err) { return console.log(err); });
    };
    JwtAuthenticationService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('ice_token');
    };
    JwtAuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"]])
    ], JwtAuthenticationService);
    return JwtAuthenticationService;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 matDialogTitle>Login</h1>\n<form\n  (submit)='login()'\n  [formGroup]='credentialsForm'>\n  <mat-form-field>\n    <input matInput\n      formControlName='username'\n      placeholder=\"DTU Credentials\" \n      type=\"text\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput\n      formControlName='password'\n      placeholder=\"Password\" \n      type=\"password\">\n  </mat-form-field>\n  <mat-error *ngIf=\"showError\">\n    Credentials or password incorrect. Please try again.\n  </mat-error>\n  <button\n    mat-button\n    mat-dialog-actions\n    type='submit'>\n    Login\n  </button>\n</form>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jwt_authentication_service__ = __webpack_require__("./src/app/jwt-authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(_authService, _fb, dialogRef) {
        this._authService = _authService;
        this._fb = _fb;
        this.dialogRef = dialogRef;
        this.showError = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.credentialsForm = this._fb.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.credentials = this.credentialsForm.value;
        var ret = this._authService.login(this.credentials)
            .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an token key
        function (data) {
            localStorage.setItem('token', data['token']);
            localStorage.setItem('ice_token', data['ice_token']);
            _this.dialogRef.close();
            _this._authService.scheduleRefresh();
        }, function (error) {
            console.log(error);
            _this.showError = true;
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_3__jwt_authentication_service__["a" /* JwtAuthenticationService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__jwt_authentication_service__["a" /* JwtAuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatDialogRef */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/new-project/new-project.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/new-project/new-project.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <td-layout-card-over cardTitle=\"Create a single new project\">\n      <!-- TODO: Change all warnings to mat-hint -->\n      <td-steps mode=\"horizontal\">\n        <td-step #step1 \n          label=\"General information\"\n          sublabel=\"Give the project a name and a description\"\n          [active]=\"activePanel===0\"\n          [state]=\"stateStep[0]\">\n          <form\n            [formGroup]=\"newProjectForm\">\n            <mat-form-field>\n              <input matInput\n                formControlName=\"name\"\n                type=\"text\"\n                placeholder=\"Project name\">\n            </mat-form-field>\n            <small\n              *ngIf=\"!newProjectForm.get('name').valid && \n                     (newProjectForm.get('name').dirty ||\n                      newProjectForm.get('name').touched)\"\n              class=\"text-danger\"\n              color='warn'>\n                Name is required (5 to 50 characters).\n            </small>\n            <br>\n            <mat-form-field>\n              <textarea matInput\n                formControlName=\"description\"\n                placeholder=\"Project description (optional)\"></textarea>\n            </mat-form-field>\n            <ng-template td-step-actions>\n              <button mat-raised-button\n                color=\"primary\"\n                [disabled]=\"!firstTabValid()\"\n                (click)=\"step2.open(); toggleState(0)\">Next</button>\n            </ng-template>\n          </form>\n        </td-step>\n\n        <!-- TODO: Add a better \"add\" button to the part step in the wizards -->\n        <td-step #step2\n          label=\"Parts\"\n          sublabel=\"Pick some parts from the ICE database\"\n          [active]=\"this.activePanel===1\"\n          [state]=\"stateStep[1]\">\n          <app-part-selector\n            #partSelector\n            [PartForm]=\"newProjectForm.controls.parts\"\n            [title]=\"'Parts'\">\n          </app-part-selector>\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\"\n              (click)=\"partSelector.addPart()\">\n              Add part\n            </button>\n            <button mat-raised-button\n              color=\"primary\"\n              [disabled]=\"!secondTabValid()\"\n              (click)=\"step3.open(); toggleState(1)\">Next</button>\n          </ng-template>\n        </td-step>\n\n        <td-step #step3\n          label=\"Settings\"\n          sublabel=\"Set the settings that Amuser will use to create the primers\"\n          [active]=\"this.activePanel===2\"\n          [state]=\"stateStep[2]\">\n          <app-amuser-settings \n            [settings]=\"newProjectForm.controls.amusercloning\">\n          </app-amuser-settings>\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\"\n              [disabled]=\"!firstTabValid()\"\n              (click)=\"step4.open(); toggleState(2)\">Next</button>\n          </ng-template>\n        </td-step>\n\n        <td-step #step4\n        label=\"Review and submit\"\n        sublabel=\"One last check to confirm everything is as you want it\"\n        [active]=\"this.activePanel===3\"\n        [state]=\"stateStep[3]\">\n          <div\n            fxLayout='row' \n            fxLayoutAlign=\"start\"\n            fxLayoutGap=\"10px\"\n            fxLayoutWrap>\n            <app-project-card\n              [project]=\"getProject()\">\n            </app-project-card>  \n          </div>\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\"\n              [disabled]=\"!thirdTabValid()\"\n              (click)=\"submit(); toggleState(3)\">Submit</button>\n          </ng-template>\n        </td-step>\n      </td-steps>\n    </td-layout-card-over>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/new-project/new-project.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewProjectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__covalent_core__ = __webpack_require__("./node_modules/@covalent/core/esm5/covalent-core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__amuser_settings__ = __webpack_require__("./src/app/amuser-settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_service__ = __webpack_require__("./src/app/project.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewProjectComponent = /** @class */ (function () {
    function NewProjectComponent(projectService, fb, router) {
        this.projectService = projectService;
        this.fb = fb;
        this.router = router;
        this.events = [];
        this.activePanel = 0;
        this.stateStep = [__WEBPACK_IMPORTED_MODULE_3__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_3__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_3__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_3__covalent_core__["g" /* StepState */].None];
    }
    NewProjectComponent.prototype.ngOnInit = function () {
        var nameValidator = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5)]);
        this.newProjectForm = this.fb.group({
            name: ['', nameValidator],
            description: [''],
            parts: this.fb.array([], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required])),
            amusercloning: Object(__WEBPACK_IMPORTED_MODULE_4__amuser_settings__["b" /* createDefaultAmuserSettingForm */])(this.fb)
        });
    };
    NewProjectComponent.prototype.setActiveTab = function (newTab) {
        this.activePanel = newTab;
    };
    NewProjectComponent.prototype.firstTabValid = function () {
        return this.newProjectForm.controls['name'].valid && this.newProjectForm.controls['description'].valid;
    };
    NewProjectComponent.prototype.secondTabValid = function () {
        return (this.firstTabValid() && this.newProjectForm.controls['parts'].valid);
    };
    NewProjectComponent.prototype.thirdTabValid = function () {
        return this.secondTabValid() && this.newProjectForm.controls['amusercloning'].valid;
    };
    NewProjectComponent.prototype.toggleState = function (idx) {
        this.stateStep[idx] = __WEBPACK_IMPORTED_MODULE_3__covalent_core__["g" /* StepState */].Complete;
    };
    NewProjectComponent.prototype.getProject = function () {
        return this.newProjectForm.value;
    };
    NewProjectComponent.prototype.submit = function () {
        var _this = this;
        this.formSubmitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        var project = this.getProject();
        this.projectService.create(project)
            .subscribe(function (res) {
            _this.router.navigate(['/projects', res.id]);
        }, function (err) {
            console.log(err);
        });
    };
    NewProjectComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-new-project',
            template: __webpack_require__("./src/app/new-project/new-project.component.html"),
            styles: [__webpack_require__("./src/app/new-project/new-project.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__project_service__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], NewProjectComponent);
    return NewProjectComponent;
}());



/***/ }),

/***/ "./src/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <td-layout-card-over>\n      <h1 matDialogTitle class=\"ice-form\">An error occured</h1>\n      <div>\n        <p>This could be due to the resource you were trying to access no longer existing or that you do not have sufficient priviliges to access it.</p>\n      </div>\n    </td-layout-card-over>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/not-found/not-found.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__("./src/app/not-found/not-found.component.html"),
            styles: [__webpack_require__("./src/app/not-found/not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/part-error-dialog/part-error-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>\n  Errors found in part {{ data.part_name }}\n</h2>\n<mat-dialog-content>\n  <div class=\"container\">\n    <mat-table #table [dataSource]=\"dataSource\" class=\"table\">\n      <ng-container matColumnDef=\"name\">\n        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\"> \n            {{element.name.value}} <mat-icon color=\"warn\" *ngIf=element.name.error matTooltip=\"No support for dynamic tooltips, yet\">warning</mat-icon>\n          </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"strand\">\n        <mat-header-cell *matHeaderCellDef> Strand </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\">\n          {{element.strand.value}} <mat-icon color=\"warn\" *ngIf=element.strand.error matTooltip=\"No support for dynamic tooltips, yet\">warning</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"genbankStart\">\n        <mat-header-cell *matHeaderCellDef> Location start</mat-header-cell>\n        <mat-cell *matCellDef=\"let element\">\n          {{element.locations[0].genbankStart.value}} <mat-icon color=\"warn\" *ngIf=element.locations[0].genbankStart.error matTooltip=\"No support for dynamic tooltips, yet\">warning</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <ng-container matColumnDef=\"end\">\n        <mat-header-cell *matHeaderCellDef> Location end </mat-header-cell>\n        <mat-cell *matCellDef=\"let element\">\n          {{element.locations[0].end.value}} <mat-icon color=\"warn\" *ngIf=element.locations[0].end.error matTooltip=\"No support for dynamic tooltips, yet\">warning</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>    \n  </div>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"openInIce()\">Open part in ICE</button>\n  <button mat-button mat-dialog-close>Close</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/part-error-dialog/part-error-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = "/* Structure */\n.container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-height: 500px;\n  min-width: 300px;\n  position: relative; }\n.header {\n  min-height: 64px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-left: 24px;\n  font-size: 20px; }\n.table {\n  overflow: auto;\n  min-height: 300px; }\n"

/***/ }),

/***/ "./src/app/part-error-dialog/part-error-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartErrorDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var PartErrorDialogComponent = /** @class */ (function () {
    function PartErrorDialogComponent(data) {
        this.data = data;
        this.displayedColumns = ['name', 'strand', 'genbankStart', 'end'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatTableDataSource */]();
    }
    PartErrorDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.dataSource.data = _this.data['errorArray'];
        }, 200);
    };
    PartErrorDialogComponent.prototype.openInIce = function () {
        var url = 'https://ice.ebdrup.biosustain.dtu.dk/entry/' + this.data['ice_id'];
        window.open(url, '_blank');
    };
    PartErrorDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-part-error-dialog',
            template: __webpack_require__("./src/app/part-error-dialog/part-error-dialog.component.html"),
            styles: [__webpack_require__("./src/app/part-error-dialog/part-error-dialog.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object])
    ], PartErrorDialogComponent);
    return PartErrorDialogComponent;
}());



/***/ }),

/***/ "./src/app/part-multi-selector/part-multi-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf='partArrs'>\n  <div\n    class=\"position-row\"\n    fxLayout='row' \n    fxLayoutAlign=\"start\"\n    fxLayoutGap=\"10px\"\n    fxLayoutWrap>\n    <!-- TODO: Add drag and drop to the positions -->\n    <div class=\"expContainer\">\n      <td-expansion-panel *ngFor=\"let partArr of partArrs.controls; let i = index\">\n        <ng-template td-expansion-panel-header color=\"accent\">\n          <h4 matSubheader>Position {{i}}</h4>\n        </ng-template>\n        <app-part-selector\n          #selector\n          [PartForm]=\"partArr.controls.parts\">\n        </app-part-selector>\n        <button mat-button\n          (click)=\"selector.addPart()\">\n          Add part\n        </button>\n        <button mat-button\n          (click)=\"removeColumn(i)\">\n          Remove Column\n        </button>\n      </td-expansion-panel>\n    </div>\n  </div>\n  <small \n    *ngIf=\"!partArrs.valid\"\n    class=\"text-danger\">\n    There needs to be at least two positions.\n  </small>\n</div>"

/***/ }),

/***/ "./src/app/part-multi-selector/part-multi-selector.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/part-multi-selector/part-multi-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartMultiSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PartMultiSelectorComponent = /** @class */ (function () {
    function PartMultiSelectorComponent() {
    }
    PartMultiSelectorComponent.prototype.ngOnInit = function () {
    };
    PartMultiSelectorComponent.prototype.removeColumn = function (idx) {
        this.partArrs.removeAt(idx);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormArray"])
    ], PartMultiSelectorComponent.prototype, "partArrs", void 0);
    PartMultiSelectorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-part-multi-selector',
            template: __webpack_require__("./src/app/part-multi-selector/part-multi-selector.component.html"),
            styles: [__webpack_require__("./src/app/part-multi-selector/part-multi-selector.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PartMultiSelectorComponent);
    return PartMultiSelectorComponent;
}());



/***/ }),

/***/ "./src/app/part-search/part-search.component.css":
/***/ (function(module, exports) {

module.exports = ".card {\n    outline: black;\n    -webkit-box-shadow: 1px 1px 0.5px grey;\n            box-shadow: 1px 1px 0.5px grey;\n}\n\n.card-header {\n    background-color: #F8F8F8;\n}"

/***/ }),

/***/ "./src/app/part-search/part-search.component.html":
/***/ (function(module, exports) {

module.exports = "<input #searchBox \n  id=\"search-box\"\n  (keyup)=\"search(searchBox.value)\"\n  class=\"form-control\"\n  />"

/***/ }),

/***/ "./src/app/part-search/part-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__part_service__ = __webpack_require__("./src/app/part.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PartSearchComponent = /** @class */ (function () {
    function PartSearchComponent(partService) {
        this.partService = partService;
        this.searchEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    PartSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parts = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.partService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([]);
        });
        this.searchEvent.emit(this.parts);
    };
    PartSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
    ], PartSearchComponent.prototype, "parts", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], PartSearchComponent.prototype, "searchEvent", void 0);
    PartSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-part-search',
            template: __webpack_require__("./src/app/part-search/part-search.component.html"),
            styles: [__webpack_require__("./src/app/part-search/part-search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__part_service__["b" /* PartService */]])
    ], PartSearchComponent);
    return PartSearchComponent;
}());



/***/ }),

/***/ "./src/app/part-selector/part-selector.component.css":
/***/ (function(module, exports) {

module.exports = "mat-card {\n    min-width: 400px;\n}\n\nmat-toolbar {\n    width: calc(100% + 48px);\n    margin: -24px 0 24px -24px;\n    top: -24px;\n    position: relative;\n}\n\nmat-list-item:hover {\n    background-color: lightblue;\n}\n\n.right-button {\n    float: right;\n}\n\n.add-button {\n    position: absolute;\n    top: 42px;\n    left: 80%;\n}\n\n.reorder_icon {\n    cursor: move;\n}\n"

/***/ }),

/***/ "./src/app/part-selector/part-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- TODO: focus on added part input -->\n<mat-list>\n  <h2 matSubheader>Selected Parts</h2>\n  <!-- BUG: When dragging a part, the list element appears in top toolbar -->\n  <!-- TODO: Add a shadow element when dragging -->\n  <div [dragula]=\"'part-bag'\" [dragulaModel]='dragableForm'>\n    <mat-list-item *ngFor=\"let part of dragableForm.fa.controls; let i = index\">\n      <mat-icon class=\"reorder_icon\">\n        reorder\n      </mat-icon>\n      <span>\n        <button mat-button (click)=\"removePart(i)\">\n          <mat-icon>delete</mat-icon>\n        </button>\n      </span>\n      <!-- TODO: change to lazy evaluation of autocomplete so it doesn't send a search query for every single part when an input field is in focus -->\n      <mat-form-field>\n        <input \n          type=\"text\"\n          matInput\n          #searchBox \n          [matAutocomplete]=\"auto\"\n          [formControl]=\"part.controls.name\"\n          (keyup)=\"search(searchBox.value)\">\n      </mat-form-field>\n\n\n      <!-- TODO: Consider changing to covalent stacked chips with autocomplete -->\n      <span\n        class=\"right-button\"\n        *ngIf=\"!part.controls.errors.valid\">\n        <button mat-button matTooltip='Errors found. Click to view.' (click)='openErrorDialog(part)'>\n          <mat-icon color=\"warn\">\n            warning\n          </mat-icon>\n        </button>\n      </span>\n      <!-- This can't be moved outside the loop as it will have severe bugs with dragula -->\n      <!-- NOTE: Recheck for new functionality when Material is updated -->\n      <mat-autocomplete #auto=\"matAutocomplete\">\n        <mat-option \n          *ngFor=\"let icePart of searchParts | async\" \n          (click)=\"selectPart(part, icePart)\" \n          [value]=\"icePart.name\">\n            {{ icePart.name }}\n        </mat-option>\n      </mat-autocomplete>\n    </mat-list-item>\n  </div>\n</mat-list>\n"

/***/ }),

/***/ "./src/app/part-selector/part-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__ = __webpack_require__("./node_modules/ng2-dragula/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__part_error_dialog_part_error_dialog_component__ = __webpack_require__("./src/app/part-error-dialog/part-error-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__part_service__ = __webpack_require__("./src/app/part.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// Wrapper to add splice method on formarray, which is needed for dragula to work.
var FormArrayWrapper = /** @class */ (function () {
    function FormArrayWrapper(fa) {
        this.fa = fa;
    }
    FormArrayWrapper.prototype.get = function (index) {
        return this.fa.controls[index];
    };
    FormArrayWrapper.prototype.splice = function (start, deleteCount) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var deleted = this.fa.controls.slice(start, start + deleteCount);
        for (var i = start; i < start + deleteCount; i++) {
            this.fa.removeAt(i);
        }
        for (var i = start, j = 0; j < items.length; i++, j++) {
            this.fa.insert(i, items[j]);
        }
        return deleted;
    };
    return FormArrayWrapper;
}());
var PartSelectorComponent = /** @class */ (function () {
    function PartSelectorComponent(partService, icePartService, fb, dragulaService, dialog) {
        var _this = this;
        this.partService = partService;
        this.icePartService = icePartService;
        this.fb = fb;
        this.dragulaService = dragulaService;
        this.dialog = dialog;
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
        this.searchClickEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
    }
    PartSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchParts = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.icePartService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of([]);
        });
        this.searchParts.subscribe();
        this.elem_num = this.PartForm.length;
        this.dragableForm = new FormArrayWrapper(this.PartForm);
    };
    PartSelectorComponent.prototype.openErrorDialog = function (partForm) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__part_error_dialog_part_error_dialog_component__["a" /* PartErrorDialogComponent */], {
            data: {
                errorArray: partForm['part_errors'],
                ice_id: partForm.controls.ice_id.value,
                part_name: partForm.controls.ice_name.value
            }
        });
    };
    PartSelectorComponent.prototype.onDrop = function (args) {
        this.dragableForm.fa.controls.map(function (el, idx) {
            el['controls']['order'].setValue(idx);
            return el;
        });
    };
    PartSelectorComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    PartSelectorComponent.prototype.addPart = function () {
        this.PartForm.push(this.initPartForm());
        this.elem_num += 1;
    };
    PartSelectorComponent.prototype.removePart = function (i) {
        // remove Part from the list
        this.elem_num -= 1;
        this.PartForm.removeAt(i);
    };
    PartSelectorComponent.prototype.selectPart = function (part, ice_part) {
        // add Part to the list
        part.controls['name'].setValue(ice_part.name);
        part.controls['ice_id'].setValue(ice_part.ice_id);
        part.controls['ice_name'].setValue(ice_part.ice_name);
        part.controls['errors'].setValue(ice_part.errors);
        part['part_errors'] = ice_part.errors;
    };
    PartSelectorComponent.prototype.initPartForm = function () {
        return this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            order: [this.elem_num, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_id: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            errors: [[], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(0)]
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('PartForm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormArray"])
    ], PartSelectorComponent.prototype, "PartForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('title'),
        __metadata("design:type", String)
    ], PartSelectorComponent.prototype, "title", void 0);
    PartSelectorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-part-selector',
            template: __webpack_require__("./src/app/part-selector/part-selector.component.html"),
            styles: [__webpack_require__("./src/app/part-selector/part-selector.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__part_service__["b" /* PartService */],
            __WEBPACK_IMPORTED_MODULE_7__part_service__["a" /* IcePartService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_5_ng2_dragula__["DragulaService"],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialog */]])
    ], PartSelectorComponent);
    return PartSelectorComponent;
}());



/***/ }),

/***/ "./src/app/part-uploader/part-uploader.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/part-uploader/part-uploader.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"currentPart\">\n  <label>Part Name</label><input #part [(ngModel)]=\"currentPart.name\">\n  <button (click)=\"createPart()\">Create</button>\n  <br>\n</div>"

/***/ }),

/***/ "./src/app/part-uploader/part-uploader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartUploaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__part_service__ = __webpack_require__("./src/app/part.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PartUploaderComponent = /** @class */ (function () {
    function PartUploaderComponent(partService) {
        this.partService = partService;
        this.partChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(PartUploaderComponent.prototype, "selectedPart", {
        get: function () {
            return this.currentPart;
        },
        set: function (part) {
            this.currentPart = part;
            this.partChange.emit(part);
        },
        enumerable: true,
        configurable: true
    });
    ;
    PartUploaderComponent.prototype.ngOnInit = function () {
    };
    PartUploaderComponent.prototype.createPart = function () {
        var _this = this;
        this.partService.create(this.currentPart)
            .subscribe(function (res) {
            _this.currentPart = res;
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PartUploaderComponent.prototype, "selectedPart", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], PartUploaderComponent.prototype, "partChange", void 0);
    PartUploaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-part-uploader',
            template: __webpack_require__("./src/app/part-uploader/part-uploader.component.html"),
            styles: [__webpack_require__("./src/app/part-uploader/part-uploader.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__part_service__["b" /* PartService */]])
    ], PartUploaderComponent);
    return PartUploaderComponent;
}());



/***/ }),

/***/ "./src/app/part.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PartService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IcePartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_api__ = __webpack_require__("./src/app/base-api.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PartService = /** @class */ (function (_super) {
    __extends(PartService, _super);
    function PartService(_authHttp, _router) {
        return _super.call(this, _authHttp, _router, 'parts') || this;
    }
    PartService.prototype.create = function (part) {
        var res = this._authHttp
            .post(this.getFullUrl(), JSON.stringify(part), { headers: this.composeHeader() })
            .map(function (res) { return res.json(); });
        return res;
    };
    PartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], PartService);
    return PartService;
}(__WEBPACK_IMPORTED_MODULE_3__base_api__["a" /* BaseAPI */]));

var IcePartService = /** @class */ (function (_super) {
    __extends(IcePartService, _super);
    function IcePartService(_authHttp, _router) {
        return _super.call(this, _authHttp, _router, 'ice-parts') || this;
    }
    IcePartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], IcePartService);
    return IcePartService;
}(__WEBPACK_IMPORTED_MODULE_3__base_api__["a" /* BaseAPI */]));



/***/ }),

/***/ "./src/app/primer-detail/primer-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <td-expansion-panel-group> -->\n  <td-expansion-panel *ngFor=\"let primer of primers\">\n    <ng-template td-expansion-panel-label>\n      <span class=\"project-header\">\n        Primer for {{primer.name}}\n      </span>\n    </ng-template>\n    <ng-template td-expansion-panel-sublabel>\n      <span class='primer-span'>\n        <b>Forward: </b> {{primer.forward_primer.sequence}}<br>\n        <b>Backward:</b> {{primer.backward_primer.sequence}}\n      </span>\n    </ng-template>\n    <td-expansion-summary>\n\n    </td-expansion-summary>\n    <mat-list>\n      <h3 matSubheader>Forward primer</h3>\n      <mat-list>\n        <mat-list-item>\n          Sequence {{primer.forward_primer.sequence}}\n        </mat-list-item>\n        <mat-list-item>\n          Melting Temperature {{primer.forward_primer.Tm}}\n        </mat-list-item>\n        <mat-list-item>\n          GC Content percentage {{primer.forward_primer.GC_content_percent}}\n        </mat-list-item>\n        <mat-list-item>\n          GC clamp present at 3' end? {{primer.forward_primer.GC_clamp}}\n        </mat-list-item>\n        <mat-list-item>\n          3 G/C out of last 5 bases at 3' end? {{primer.forward_primer.Over_3_gc}}\n        </mat-list-item>\n        <mat-list-item>\n          No primer dimer formation in primer pair? {{primer.forward_primer.risk_primer_dimer}}\n        </mat-list-item>\n        <mat-list-item>\n          No intra-primer homology {{primer.forward_primer.risk_intraprimer}}\n        </mat-list-item>\n        <mat-list-item>\n          PolyN stretches {{primer.forward_primer.polyN_stretch}}\n        </mat-list-item>\n      </mat-list>\n      <mat-divider></mat-divider>\n      <h3 matSubheader>Backward primer</h3>\n      <mat-list>\n        <mat-list-item>\n          Sequence {{primer.backward_primer.primer}}\n        </mat-list-item>\n        <mat-list-item>\n          Melting Temperature {{primer.backward_primer.Tm}}\n        </mat-list-item>\n        <mat-list-item>\n          GC Content percentage {{primer.backward_primer.GC_content_percent}}\n        </mat-list-item>\n        <mat-list-item>\n          GC clamp present at 3' end? {{primer.backward_primer.GC_clamp}}\n        </mat-list-item>\n        <mat-list-item>\n          3 G/C out of last 5 bases at 3' end? {{primer.backward_primer.Over_3_gc}}\n        </mat-list-item>\n        <mat-list-item>\n          No primer dimer formation in primer pair? {{primer.backward_primer.risk_primer_dimer}}\n        </mat-list-item>\n        <mat-list-item>\n          No intra-primer homology {{primer.backward_primer.risk_intraprimer}}\n        </mat-list-item>\n        <mat-list-item>\n          PolyN stretches {{primer.backward_primer.polyN_stretch}}\n        </mat-list-item>\n      </mat-list>\n    </mat-list>\n  </td-expansion-panel>\n<!-- </td-expansion-panel-group> -->"

/***/ }),

/***/ "./src/app/primer-detail/primer-detail.component.scss":
/***/ (function(module, exports) {

module.exports = ".primer-span {\n  display: inline-block;\n  vertical-align: middle;\n  line-height: normal; }\n"

/***/ }),

/***/ "./src/app/primer-detail/primer-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrimerDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrimerDetailComponent = /** @class */ (function () {
    function PrimerDetailComponent() {
    }
    PrimerDetailComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], PrimerDetailComponent.prototype, "primers", void 0);
    PrimerDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-primer-detail',
            template: __webpack_require__("./src/app/primer-detail/primer-detail.component.html"),
            styles: [__webpack_require__("./src/app/primer-detail/primer-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrimerDetailComponent);
    return PrimerDetailComponent;
}());



/***/ }),

/***/ "./src/app/project-bundle-cards/project-bundle-cards.component.css":
/***/ (function(module, exports) {

module.exports = "mat-card > mat-toolbar {\n    margin: -24px 0 24px -24px;\n    width: calc(100% + 48px);\n}"

/***/ }),

/***/ "./src/app/project-bundle-cards/project-bundle-cards.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"multiple-new\">\n  <mat-toolbar color=\"primary\">\n    <span>Create several new projects</span>\n  </mat-toolbar>\n  <mat-card-content>\n    <p>\n      When you need to create a lot of projects quickly, this is the way to go. It lets you choose what combination of parts you would like in each position and then makes all possible combination. It makes it possible to create a huge number of projects at once, but comes at a cost of the detail you can add to each project.\n    </p>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-button (click)=\"openCreateMultipleProjects()\">Select</button>\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/project-bundle-cards/project-bundle-cards.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectBundleCardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_bundle_project_bundle_component__ = __webpack_require__("./src/app/project-bundle/project-bundle.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectBundleCardsComponent = /** @class */ (function () {
    function ProjectBundleCardsComponent(dialog) {
        this.dialog = dialog;
    }
    ProjectBundleCardsComponent.prototype.ngOnInit = function () {
    };
    ProjectBundleCardsComponent.prototype.openCreateMultipleProjects = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__project_bundle_project_bundle_component__["a" /* ProjectBundleComponent */]);
    };
    ProjectBundleCardsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-bundle-cards',
            template: __webpack_require__("./src/app/project-bundle-cards/project-bundle-cards.component.html"),
            styles: [__webpack_require__("./src/app/project-bundle-cards/project-bundle-cards.component.css")],
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["o" /* trigger */])('openCreateSingleProject', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["l" /* state */])('shown', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["m" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["l" /* state */])('hidden', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["m" /* style */])({ opacity: 0 })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["n" /* transition */])('* => *', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('.5s'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialog */]])
    ], ProjectBundleCardsComponent);
    return ProjectBundleCardsComponent;
}());



/***/ }),

/***/ "./src/app/project-bundle/project-bundle.component.css":
/***/ (function(module, exports) {

module.exports = "app-project-card {\n    padding: 20px;\n}\n\n.card-container {\n    padding-bottom: 10px;\n}\n\n.expContainer {\n    width: 362px;\n}\n"

/***/ }),

/***/ "./src/app/project-bundle/project-bundle.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <td-layout-card-over cardTitle=\"Create several new projects\">\n      <!-- BUG: the labels for the stepper make a linebreak which they shouldn't -->\n      <td-steps mode='horizontal'>\n        <!-- BUG: Description isn't updated correctly when changing it after combination function has run -->\n        <td-step #step1 \n          label=\"General information\"\n          sublabel=\"Give the project a name and a description\"\n          [active]=\"activePanel===0\"\n          [state]=\"stateStep[0]\">\n          <form\n            [formGroup]=\"newProjectForm\">\n            <mat-form-field>\n              <input matInput\n                formControlName=\"name\"\n                type=\"text\"\n                placeholder=\"Basename\">\n            </mat-form-field>\n            <small\n              *ngIf=\"!newProjectForm.get('name').valid && \n                     (newProjectForm.get('name').dirty ||\n                      newProjectForm.get('name').touched)\"\n              class=\"text-danger\">\n                Name is required (2 to 46 characters).\n            </small>\n            <br>\n            <mat-form-field>\n              <textarea matInput\n                formControlName=\"description\"\n                type=\"text\"\n                placeholder=\"Project description (optional)\"></textarea>\n            </mat-form-field>\n            <ng-template td-step-actions>\n              <button mat-raised-button\n                color=\"primary\"\n                [disabled]=\"!firstTabValid()\"\n                (click)=\"step2.open(); toggleState(0)\">Next</button>\n            </ng-template>\n          </form>\n        </td-step>\n\n        <td-step #step2\n          label=\"Parts\"\n          sublabel=\"Pick some parts from the ICE database\"\n          [active]=\"this.activePanel===1\"\n          [state]=\"stateStep[1]\"\n          [disabled]=\"!firstTabValid()\">\n          <form [formGroup]=\"newProjectForm\">\n            <app-part-multi-selector\n              [partArrs]='newProjectForm.controls.parts'>\n            </app-part-multi-selector>\n          </form>\n\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\" (click)=\"addColumn($event)\">Add column</button>\n            <button mat-raised-button\n              color=\"primary\"\n              [disabled]=\"!secondTabValid()\"\n              (click)=\"step3.open(); toggleState(1)\">Next</button>\n          </ng-template>\n        </td-step>\n\n        <td-step #step3\n          label=\"Settings\"\n          sublabel=\"Set the settings that Amuser will use to create the primers\"\n          [active]=\"this.activePanel===2\"\n          [state]=\"stateStep[2]\"\n          [disabled]=\"!secondTabValid()\">\n          <app-amuser-settings \n            [settings]=\"newProjectForm.controls.amusercloning\">\n          </app-amuser-settings>\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\" \n              [disabled]=\"!thirdTabValid()\"\n              (click)=\"step4.open(); toggleState(2)\">Next</button>\n          </ng-template>\n        </td-step>\n\n        <td-step #step4\n          label=\"Review and submit\"\n          sublabel=\"One last check to confirm everything is as you want it\"\n          [active]=\"this.activePanel===3\"\n          [state]=\"stateStep[3]\"\n          [disabled]=\"!thirdTabValid()\">\n          <div\n            fxLayout='row' \n            fxLayoutAlign=\"start\"\n            fxLayoutGap=\"10px\"\n            fxLayoutWrap>\n          </div>\n          <ng-template td-step-actions>\n            <button mat-raised-button\n              color=\"primary\" \n              [disabled]=\"!thirdTabValid()\"\n              (click)=\"submit()\">\n              Submit\n            </button>\n          </ng-template>\n        </td-step>\n      </td-steps>\n    </td-layout-card-over>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/project-bundle/project-bundle.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectBundleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__covalent_core__ = __webpack_require__("./node_modules/@covalent/core/esm5/covalent-core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__amuser_settings__ = __webpack_require__("./src/app/amuser-settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__part_service__ = __webpack_require__("./src/app/part.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__combinatorial_service__ = __webpack_require__("./src/app/combinatorial.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProjectBundleComponent = /** @class */ (function () {
    function ProjectBundleComponent(fb, partService, combinatorialService, router) {
        this.fb = fb;
        this.partService = partService;
        this.combinatorialService = combinatorialService;
        this.router = router;
        this.events = [];
        this.activePanel = 0;
        this.stateStep = [__WEBPACK_IMPORTED_MODULE_5__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_5__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_5__covalent_core__["g" /* StepState */].None, __WEBPACK_IMPORTED_MODULE_5__covalent_core__["g" /* StepState */].None];
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    ProjectBundleComponent.prototype.ngOnInit = function () {
        var _this = this;
        var nameValidator = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(46), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2)]);
        this.newProjectForm = this.fb.group({
            name: ['', nameValidator],
            description: [''],
            parts: this.fb.array([this.initColumn(), this.initColumn()], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2)),
            amusercloning: Object(__WEBPACK_IMPORTED_MODULE_6__amuser_settings__["b" /* createDefaultAmuserSettingForm */])(this.fb)
        });
        this.searchParts = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.partService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of([]);
        });
    };
    ProjectBundleComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    ProjectBundleComponent.prototype.firstTabValid = function () {
        return this.newProjectForm.controls['name'].valid && this.newProjectForm.controls['description'].valid;
    };
    ProjectBundleComponent.prototype.secondTabValid = function () {
        return (this.firstTabValid() && this.newProjectForm.controls['parts'].valid);
    };
    ProjectBundleComponent.prototype.thirdTabValid = function () {
        return this.secondTabValid() && this.newProjectForm.controls['amusercloning'].valid;
    };
    ProjectBundleComponent.prototype.toggleState = function (idx) {
        this.stateStep[idx] = __WEBPACK_IMPORTED_MODULE_5__covalent_core__["g" /* StepState */].Complete;
        this.activePanel = idx + 1;
    };
    ProjectBundleComponent.prototype.clickCol = function (col, i) {
        this.selectedIndex = i;
        this.selectedColumn = col;
    };
    ProjectBundleComponent.prototype.isSelectedCol = function (col) {
        if (col !== this.selectedColumn) {
            return false;
        }
        return true;
    };
    ProjectBundleComponent.prototype.initColumn = function () {
        return this.fb.group({
            parts: this.fb.array([], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(1)),
        });
    };
    ProjectBundleComponent.prototype.onDrop = function (args) {
        this.newProjectForm.controls['parts']['controls'].map(function (el, idx) {
            el['controls']['id'].setValue(idx);
            return el;
        });
    };
    ProjectBundleComponent.prototype.initPartForm = function (part) {
        return this.fb.group({
            name: [part.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            order: [this.selectedIndex, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_name: [part.ice_name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_id: [part.ice_id, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            errors: [[], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(0)]
        });
    };
    ProjectBundleComponent.prototype.addColumn = function ($event) {
        var control = this.newProjectForm.controls['parts'];
        control.push(this.initColumn());
        this.onDrop($event);
    };
    ProjectBundleComponent.prototype.submit = function () {
        var _this = this;
        // Should contain a call to the project service and upload
        this.combinatorial = this.newProjectForm.value;
        this.combinatorial.parts = this.combinatorial.parts.map(function (res) {
            return res['parts'];
        });
        this.combinatorialService.create(this.combinatorial)
            .subscribe(function (res) {
            _this.router.navigate(['/combinatorial', res.id]);
        }, function (err) {
            console.log(err);
        });
    };
    ProjectBundleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-bundle',
            template: __webpack_require__("./src/app/project-bundle/project-bundle.component.html"),
            styles: [__webpack_require__("./src/app/project-bundle/project-bundle.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_7__part_service__["b" /* PartService */],
            __WEBPACK_IMPORTED_MODULE_8__combinatorial_service__["a" /* CombinatorialService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], ProjectBundleComponent);
    return ProjectBundleComponent;
}());



/***/ }),

/***/ "./src/app/project-card/project-card.component.css":
/***/ (function(module, exports) {

module.exports = "mat-card {\n    width: 280px;\n}\n\nspan.md-subhead {\n    line-height: 24px;\n    letter-spacing: .01em;\n    font-size: 16px;\n    margin-left: 14px;\n}\n\n.icon-spacer {\n    margin-top: 4px;\n}\n\n.spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}"

/***/ }),

/***/ "./src/app/project-card/project-card.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- TODO: Replace with expansion panel -->\n<mat-card *ngIf=\"project\">\n  <div class=\"expContainer\"> \n    <td-expansion-panel \n      (expanded)=\"expanded = !expanded\"\n      (collapsed)=\"expanded = !expanded\">\n      <!-- TODO: Make it more obvious that the header can be clicked -->\n      <ng-template td-expansion-panel-header>\n        <mat-toolbar color=\"primary\">\n          <span class=\"project-header\">\n            {{project.name}}\n          </span>\n          <span class=\"spacer\"></span>\n          <div *ngIf=\"!expanded; else elseblock\">\n            <mat-icon>expand_more</mat-icon>\n          </div>\n          <ng-template #elseblock>\n            <mat-icon>expand_less</mat-icon>\n          </ng-template>\n        </mat-toolbar>\n      </ng-template>\n      <td-expansion-summary>\n        <div fxLayout='row' fxLayoutAlign='start center'>\n          <span class=\"md-subhead\" fxFlex=\"40\">\n            Description\n          </span>\n          <span fxFlex=\"5\" class=\"icon-spacer\">\n            <mat-icon>chevron_right</mat-icon>\n          </span>\n          <span  class=\"md-subhead\" fxFlex>\n            {{project.description}}\n          </span>\n        </div>\n        <div fxLayout='row' fxLayoutAlign='start center'>\n          <span class=\"md-subhead\" fxFlex=\"40\">\n            Number of parts\n          </span>\n          <span fxFlex=\"5\" class=\"icon-spacer\">\n            <mat-icon>chevron_right</mat-icon>\n          </span>\n          <span class=\"md-subhead\" fxFlex>\n            {{project.parts.length}}\n          </span>\n        </div>\n      </td-expansion-summary>\n      <mat-list>\n        <h3 matSubheader>Some title</h3>\n        <mat-list-item>\n          <mat-icon>\n            description\n          </mat-icon>\n          {{project.description}}\n        </mat-list-item>\n        <mat-divider></mat-divider>\n        <h3 matSubheader>Parts</h3>\n        <mat-list-item *ngFor=\"let part of project.parts\">\n          {{part.name}}\n        </mat-list-item>\n      </mat-list>\n    </td-expansion-panel>\n  </div>\n\n  <!-- TODO: add functionality to delete button -->\n  <!-- TODO: add edit button or make card editable -->\n  <mat-card-actions>\n    <button mat-button *ngIf=\"project.id\" [routerLink]=\"['/projects/'+project.id]\">Select</button>\n    <button mat-button (click)=\"delete_project\">Delete</button>\n    <mat-checkbox [(ngModel)]=\"selected\"></mat-checkbox>\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/project-card/project-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectCardComponent = /** @class */ (function () {
    function ProjectCardComponent() {
        this.projectChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selected = false;
        this.expanded = false;
    }
    ProjectCardComponent.prototype.ngOnInit = function () {
        if (!this.project.description) {
            this.project.description = 'no description';
        }
    };
    ProjectCardComponent.prototype.addToCsv = function () {
        this.selected = !this.selected;
        this.projectChange.emit(this.project);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProjectCardComponent.prototype, "project", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProjectCardComponent.prototype, "projectChange", void 0);
    ProjectCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-card',
            template: __webpack_require__("./src/app/project-card/project-card.component.html"),
            styles: [__webpack_require__("./src/app/project-card/project-card.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectCardComponent);
    return ProjectCardComponent;
}());



/***/ }),

/***/ "./src/app/project-create/project-create.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <div fxLayout='row' fxLayoutAlign=\"space-between stretch\">\n      <mat-card fxFlex=\"45\" class=\"single-new\">\n        <mat-toolbar color=\"primary\">\n          <span>Create a single new project</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <p>\n            If you only need a single project this will take you through the steps needed. This option makes it possible to add a high level of detail to the description of the project and it is simple to achieve a desired result, but it is slow to create.\n          </p>\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-button routerLink=\"/new_project\">Select</button>\n        </mat-card-actions>\n      </mat-card>\n\n      <mat-card fxFlex=\"45\" class=\"multiple-new\">\n        <mat-toolbar color=\"primary\">\n          <span>Create several new projects</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <p>\n            When you need to create a lot of projects quickly, this is the way to go. It lets you choose what combination of parts you would like in each position and then makes all possible combination. It makes it possible to create a huge number of projects at once, but comes at a cost of the detail you can add to each project.\n          </p>\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-button routerLink=\"/combinatorial\">Select</button>\n        </mat-card-actions>\n      </mat-card>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/project-create/project-create.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/project-create/project-create.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCreateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectCreateComponent = /** @class */ (function () {
    function ProjectCreateComponent() {
    }
    ProjectCreateComponent.prototype.ngOnInit = function () {
    };
    ProjectCreateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-create',
            template: __webpack_require__("./src/app/project-create/project-create.component.html"),
            styles: [__webpack_require__("./src/app/project-create/project-create.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectCreateComponent);
    return ProjectCreateComponent;
}());



/***/ }),

/***/ "./src/app/project-csv-downloader/project-csv-downloader.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <td-layout-card-over>\n      <mat-tab-group>\n        <mat-tab label=\"Projects\">\n          <div layout=\"row\" layout-align=\"start start\" class=\"pad-left-sm pad-right-sm\">\n            <div layout=\"column\" layout-align=\"center start\">\n              <span class=\"md-title\">Available projects</span>\n              <span class=\"md-body-1\">{{selectedProjects.length}} project(s) selected</span>\n            </div>\n            <span class=\"spacer\"></span>\n            <div layout=\"row\">\n              <td-search-box #searchBox placeholder=\"Search here\" (searchDebounce)=\"searchProjects($event)\" flex>\n              </td-search-box>\n              <button mat-button\n                (click)=\"downloadProjectCsv()\"\n                [disabled]=\"!canDownload()\">\n                <mat-icon>\n                  file_download\n                </mat-icon>\n              </button>\n            </div>\n          </div>\n          <mat-divider></mat-divider>\n          <app-project-table\n            [projectObservable]=\"projectObservable\"\n            (projectObservableChange)='projectChange($event)'>\n          </app-project-table>\n          <td-paging-bar #pagingBar [pageSize]=\"[5, 10, 15, 20]\" [total]=\"filteredTotal\" (change)=\"page($event)\">\n            <span td-paging-bar-label hide-xs>Row per page:</span>\n            {{pagingBar.range}} <span hide-xs>of {{pagingBar.total}}</span>\n          </td-paging-bar>\n        </mat-tab>\n        <mat-tab label='Combinatorial'>\n          <div layout=\"row\" layout-align=\"start start\" class=\"pad-left-sm pad-right-sm\">\n            <div layout=\"column\" layout-align=\"center start\">\n              <span class=\"md-title\">Available combinatorial projects</span>\n              <span class=\"md-body-1\">{{selectedCombinatorials.length}} combinatorial project(s) selected</span>\n            </div>\n            <span class=\"spacer\"></span>\n            <div layout=\"row\">\n              <td-search-box #searchBox placeholder=\"Search here\" (searchDebounce)=\"searchCombinatorial($event)\" flex>\n              </td-search-box>\n              <!-- <button mat-button\n                (click)=\"downloadCsv()\"\n                [disabled]=\"!canDownload()\">\n                <mat-icon>\n                  file_download\n                </mat-icon>\n              </button> -->\n            </div>\n          </div>\n          <app-combinatorial-table\n            [combinatorialObservable]='combinatorialObservable'\n            (combinatorialObservableChange)='combinatorialChange($event)'>\n          </app-combinatorial-table>\n        </mat-tab>\n      </mat-tab-group>\n    </td-layout-card-over>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/project-csv-downloader/project-csv-downloader.component.scss":
/***/ (function(module, exports) {

module.exports = ".spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto; }\n"

/***/ }),

/***/ "./src/app/project-csv-downloader/project-csv-downloader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCsvDownloaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_service__ = __webpack_require__("./src/app/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__combinatorial_service__ = __webpack_require__("./src/app/combinatorial.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectCsvDownloaderComponent = /** @class */ (function () {
    function ProjectCsvDownloaderComponent(_projectService, _combinatorialService) {
        this._projectService = _projectService;
        this._combinatorialService = _combinatorialService;
        this.selectedProjects = [];
        this.selectedCombinatorials = [];
        this.filteredTotal = 0;
        this.projectSearchTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
        this.combinatorialSearchTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    ProjectCsvDownloaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectObservable = this.projectSearchTerms
            .distinctUntilChanged()
            .switchMap(function (term) { return _this._projectService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([]);
        });
        this.combinatorialObservable = this.combinatorialSearchTerms
            .distinctUntilChanged()
            .switchMap(function (term) { return _this._combinatorialService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([]);
        });
    };
    ProjectCsvDownloaderComponent.prototype.searchProjects = function (term) {
        this.projectSearchTerms.next(term);
    };
    ProjectCsvDownloaderComponent.prototype.searchCombinatorial = function (term) {
        this.combinatorialSearchTerms.next(term);
    };
    ProjectCsvDownloaderComponent.prototype.projectChange = function ($ev) {
        /*
          Method called when a project is selected or
          deselected for download
        */
        this.selectedProjects = $ev;
    };
    ProjectCsvDownloaderComponent.prototype.combinatorialChange = function ($ev) {
        this.selectedCombinatorials = $ev;
    };
    ProjectCsvDownloaderComponent.prototype.canDownload = function () {
        return this.selectedProjects.length > 0;
    };
    ProjectCsvDownloaderComponent.prototype.downloadProjectCsv = function () {
        this._projectService.getCsv(this.selectedProjects)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"])(blob, 'test.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () {
        });
    };
    ProjectCsvDownloaderComponent.prototype.page = function ($ev) {
    };
    ProjectCsvDownloaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-csv-downloader',
            template: __webpack_require__("./src/app/project-csv-downloader/project-csv-downloader.component.html"),
            styles: [__webpack_require__("./src/app/project-csv-downloader/project-csv-downloader.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_5__combinatorial_service__["a" /* CombinatorialService */]])
    ], ProjectCsvDownloaderComponent);
    return ProjectCsvDownloaderComponent;
}());



/***/ }),

/***/ "./src/app/project-detail/project-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout='row' fxLayoutAlign='center'>\n  <div fxFlex='75'>\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-around stretch\" *ngIf=\"project\">\n      <mat-card fxFlex=\"50\">\n        <mat-toolbar color=\"primary\">\n          <span>Settings</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <app-amuser-settings\n            [settings]=\"newProjectForm.controls.amusercloning\">\n          </app-amuser-settings>\n        </mat-card-content>\n      </mat-card>\n\n      <mat-card fxFlex=\"50\">\n        <mat-toolbar color=\"primary\">\n          <span>Parts</span>\n        </mat-toolbar>\n        <mat-card-content>\n          <app-part-selector\n            #partSelector\n            [PartForm]=\"newProjectForm.controls.parts\">\n          </app-part-selector>\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-raised-button\n                color=\"primary\"\n                (click)=\"partSelector.addPart()\">\n                Add part\n          </button>\n        </mat-card-actions>\n      </mat-card>\n    </div>\n    <br>\n    <!-- TODO: Add loader when changing project -->\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-around stretch\" *ngIf=\"project\">\n      <mat-card fxFlex=\"100\">\n        <mat-toolbar color=\"primary\">\n          <span>Results</span>\n        </mat-toolbar>\n        <mat-card-content>\n\n        <!-- BUG: report and genbank overflows boundary of the card -->\n          <mat-tab-group [selectedIndex]=\"activeTab\">            \n            <mat-tab label=\"Report\">\n              <app-primer-detail \n                [primers]='project.report.primers'>\n              </app-primer-detail>\n            </mat-tab>\n\n            <mat-tab \n              label=\"Files\">\n              <button mat-button\n                (click)='downloadCsv()'>\n                Download Csv\n              </button>\n              <button mat-button\n                (click)='downloadGenbank()'>\n                Download Genbank\n              </button>\n            </mat-tab>\n            <mat-tab \n              label=\"Visualisation\">\n              <app-project-visualizer\n                [project]=\"project\">\n                \n              </app-project-visualizer>\n            </mat-tab>\n          </mat-tab-group>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/project-detail/project-detail.component.scss":
/***/ (function(module, exports) {

module.exports = "mat-card mat-toolbar span {\n  color: white; }\n"

/***/ }),

/***/ "./src/app/project-detail/project-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__amuser_settings__ = __webpack_require__("./src/app/amuser-settings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_service__ = __webpack_require__("./src/app/project.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectDetailComponent = /** @class */ (function () {
    function ProjectDetailComponent(_projectService, fb, route) {
        this._projectService = _projectService;
        this.fb = fb;
        this.route = route;
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this._projectService
                .get(id)
                .subscribe(function (res) {
                _this.project = res;
                _this.initForm();
            });
        });
    };
    ProjectDetailComponent.prototype.initForm = function () {
        var _this = this;
        this.newProjectForm = this.fb.group({
            name: [this.project.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            description: [this.project.description],
            parts: this.fb.array(this.project.parts.map(function (a) { return _this.initPartForm(a); }), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2)),
            amusercloning: Object(__WEBPACK_IMPORTED_MODULE_4__amuser_settings__["a" /* createAmuserSettingForm */])(this.project.amusercloning, this.fb)
        });
        this.newProjectForm.valueChanges
            .debounceTime(500)
            .subscribe(function (data) {
            _this.save();
        });
    };
    ProjectDetailComponent.prototype.initPartForm = function (part) {
        var fg = this.fb.group({
            id: [part.id],
            name: [part.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            order: [part.order, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_name: [part.ice_name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            ice_id: [part.ice_id, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            errors: [part.errors, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(0)]
        });
        return fg;
    };
    ProjectDetailComponent.prototype.downloadCsv = function () {
        var _this = this;
        this._projectService.getCsv([this.project])
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"])(blob, _this.project.name + '.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () { });
    };
    ProjectDetailComponent.prototype.downloadGenbank = function () {
        var _this = this;
        this._projectService.getGenbank(this.project)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'application/x-zip-compressed' });
            Object(__WEBPACK_IMPORTED_MODULE_3_file_saver__["saveAs"])(blob, _this.project.name + '.gb');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () { });
    };
    ProjectDetailComponent.prototype.save = function () {
        var _this = this;
        console.log(this.newProjectForm);
        if (this.newProjectForm.valid) {
            var project = this.newProjectForm.value;
            project.id = this.project.id;
            this._projectService.update(project)
                .subscribe(function (res) {
                _this.project = res;
            }, function (err) {
                console.log(err);
            });
        }
    };
    ProjectDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-detail',
            template: __webpack_require__("./src/app/project-detail/project-detail.component.html"),
            styles: [__webpack_require__("./src/app/project-detail/project-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__project_service__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());



/***/ }),

/***/ "./src/app/project-error-dialog/project-error-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>\n  Errors found in project {{ project_name }}\n</h2>\n\n<mat-dialog-content>\n  <div class=\"container\">\n    <div *ngFor=\"let error of errors\">\n        <p>{{ error }}</p>\n    </div>\n  </div>\n</mat-dialog-content>\n"

/***/ }),

/***/ "./src/app/project-error-dialog/project-error-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/project-error-dialog/project-error-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectErrorDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ProjectErrorDialogComponent = /** @class */ (function () {
    function ProjectErrorDialogComponent(data) {
        this.data = data;
    }
    ProjectErrorDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.errors = _this.data['errorArray'];
            _this.project_name = _this.data['project_name'];
        }, 200);
    };
    ProjectErrorDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-error-dialog',
            template: __webpack_require__("./src/app/project-error-dialog/project-error-dialog.component.html"),
            styles: [__webpack_require__("./src/app/project-error-dialog/project-error-dialog.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object])
    ], ProjectErrorDialogComponent);
    return ProjectErrorDialogComponent;
}());



/***/ }),

/***/ "./src/app/project-list/project-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='containerX'>\n  <div fxLayout='row' fxLayoutAlign='center'>\n    <div fxFlex='75'>\n      <div fxLayout='row' fxLayoutAlign=\"space-around stretch\">\n        <mat-card fxFlex class=\"welcome-card\">\n          <mat-card-content class=\"browse-projects\">\n            <div #componentBlock class=\"welcome-message\">\n\n            </div>\n          </mat-card-content>\n          <mat-card-actions>\n          </mat-card-actions>\n        </mat-card>\n      </div><br>\n\n      <div fxLayout='row' fxLayoutAlign=\"space-between stretch\">\n        <mat-card fxFlex=\"45\">\n          <mat-toolbar color=\"primary\" [class.is-active]=\"browse_active\">\n            <span>Browse existing projects</span>\n          </mat-toolbar>\n          <mat-card-content>\n            <p>\n              This option lets you browse and search already created projects. A number of filters can be applied to the search to make sure you find the project you are looking for.\n            </p>\n            <br>\n            <br>\n          </mat-card-content>\n          <mat-card-actions>\n            <button mat-button routerLink=\"/browse\">Select</button>\n          </mat-card-actions>\n        </mat-card>\n\n        <mat-card fxFlex=\"45\">\n          <mat-toolbar color=\"primary\" [class.is-active]=\"browse_active\">\n            <span>Create new projects</span>\n          </mat-toolbar>\n          <mat-card-content>\n            <p>\n              Create one or several projects\n            </p>\n            <br>\n            <br>\n          </mat-card-content>\n          <mat-card-actions>\n            <button mat-button routerLink=\"/create_projects\">Select</button>\n          </mat-card-actions>\n        </mat-card>\n      </div><br>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/project-list/project-list.component.scss":
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.mat-elevation-z0{-webkit-box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}\n.mat-elevation-z1{-webkit-box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}\n.mat-elevation-z2{-webkit-box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}\n.mat-elevation-z3{-webkit-box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}\n.mat-elevation-z4{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}\n.mat-elevation-z5{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}\n.mat-elevation-z6{-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}\n.mat-elevation-z7{-webkit-box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12);box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}\n.mat-elevation-z8{-webkit-box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}\n.mat-elevation-z9{-webkit-box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12);box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}\n.mat-elevation-z10{-webkit-box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12);box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}\n.mat-elevation-z11{-webkit-box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12);box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}\n.mat-elevation-z12{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}\n.mat-elevation-z13{-webkit-box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12);box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}\n.mat-elevation-z14{-webkit-box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12);box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}\n.mat-elevation-z15{-webkit-box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12);box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}\n.mat-elevation-z16{-webkit-box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}\n.mat-elevation-z17{-webkit-box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12);box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}\n.mat-elevation-z18{-webkit-box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12);box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}\n.mat-elevation-z19{-webkit-box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12);box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}\n.mat-elevation-z20{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}\n.mat-elevation-z21{-webkit-box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12);box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}\n.mat-elevation-z22{-webkit-box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12);box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}\n.mat-elevation-z23{-webkit-box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12);box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}\n.mat-elevation-z24{-webkit-box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}\n.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}\n.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}\n.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}\n.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}\n.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}\n.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}\n.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}\n.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}\n.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}\n.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}\n.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}\n.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}\n.mat-button-toggle{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-card-title{font-size:24px;font-weight:400}\n.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}\n.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-checkbox-layout .mat-checkbox-label{line-height:24px}\n.mat-chip{font-size:13px;line-height:18px}\n.mat-chip .mat-chip-remove.mat-icon{font-size:18px}\n.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-header-cell{font-size:12px;font-weight:500}\n.mat-cell{font-size:14px}\n.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-calendar-body{font-size:13px}\n.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}\n.mat-calendar-table-header th{font-size:11px;font-weight:400}\n.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}\n.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-form-field-wrapper{padding-bottom:1.25em}\n.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}\n.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}\n.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}\n.mat-form-field-infix{padding:.4375em 0;border-top:.84375em solid transparent}\n.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}\n.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}\n.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}\n.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}\n.mat-form-field-label{top:1.28125em}\n.mat-form-field-underline{bottom:1.25em}\n.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.54167em;top:calc(100% - 1.66667em)}\n.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}\n.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}\n.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}\ninput.mat-input-element{margin-top:-.0625em}\n.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}\n.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}\n.mat-radio-button{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-select-trigger{height:1.125em}\n.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}\n.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-step-label{font-size:14px;font-weight:400}\n.mat-step-label-selected{font-size:14px;font-weight:500}\n.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}\n.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}\n.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}\n.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}\n.mat-list-item{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}\n.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}\n.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}\n.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}\n.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}\n.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}\n.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}\n.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}\n.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}\n.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}\n.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2){font-size:12px}\n.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-option{font-size:12px}\n.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}\n.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}\n.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}\n.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}\n.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}\n.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}\n.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}\n.mat-ripple{overflow:hidden}\n@media screen and (-ms-high-contrast:active){.mat-ripple{display:none}}\n.mat-ripple.mat-ripple-unbounded{overflow:visible}\n.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}\n.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}\n.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}\n.cdk-overlay-container{position:fixed;z-index:1000}\n.cdk-overlay-container:empty{display:none}\n.cdk-global-overlay-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:absolute;z-index:1000}\n.cdk-overlay-pane{position:absolute;pointer-events:auto;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1000}\n.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity .4s cubic-bezier(.25,.8,.25,1);transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}\n.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}\n.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}\n.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}\n.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}\n.mat-ripple-element{background-color:rgba(0,0,0,.1)}\n.mat-option{color:rgba(0,0,0,.87)}\n.mat-option:focus:not(.mat-option-disabled),.mat-option:hover:not(.mat-option-disabled){background:rgba(0,0,0,.04)}\n.mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color:#673ab7}\n.mat-accent .mat-option.mat-selected:not(.mat-option-disabled){color:#ffd740}\n.mat-warn .mat-option.mat-selected:not(.mat-option-disabled){color:#f44336}\n.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled){background:rgba(0,0,0,.04)}\n.mat-option.mat-active{background:rgba(0,0,0,.04);color:rgba(0,0,0,.87)}\n.mat-option.mat-option-disabled{color:rgba(0,0,0,.38)}\n.mat-optgroup-label{color:rgba(0,0,0,.54)}\n.mat-optgroup-disabled .mat-optgroup-label{color:rgba(0,0,0,.38)}\n.mat-pseudo-checkbox{color:rgba(0,0,0,.54)}\n.mat-pseudo-checkbox::after{color:#fafafa}\n.mat-accent .mat-pseudo-checkbox-checked,.mat-accent .mat-pseudo-checkbox-indeterminate,.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox-indeterminate{background:#ffd740}\n.mat-primary .mat-pseudo-checkbox-checked,.mat-primary .mat-pseudo-checkbox-indeterminate{background:#673ab7}\n.mat-warn .mat-pseudo-checkbox-checked,.mat-warn .mat-pseudo-checkbox-indeterminate{background:#f44336}\n.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}\n.mat-app-background{background-color:#fafafa;color:rgba(0,0,0,.87)}\n.mat-theme-loaded-marker{display:none}\n.mat-autocomplete-panel{background:#fff;color:rgba(0,0,0,.87)}\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover){background:#fff}\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,.87)}\n.mat-button,.mat-icon-button,.mat-stroked-button{background:0 0}\n.mat-button.mat-primary .mat-button-focus-overlay,.mat-icon-button.mat-primary .mat-button-focus-overlay,.mat-stroked-button.mat-primary .mat-button-focus-overlay{background-color:rgba(103,58,183,.12)}\n.mat-button.mat-accent .mat-button-focus-overlay,.mat-icon-button.mat-accent .mat-button-focus-overlay,.mat-stroked-button.mat-accent .mat-button-focus-overlay{background-color:rgba(255,215,64,.12)}\n.mat-button.mat-warn .mat-button-focus-overlay,.mat-icon-button.mat-warn .mat-button-focus-overlay,.mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color:rgba(244,67,54,.12)}\n.mat-button[disabled] .mat-button-focus-overlay,.mat-icon-button[disabled] .mat-button-focus-overlay,.mat-stroked-button[disabled] .mat-button-focus-overlay{background-color:transparent}\n.mat-button.mat-primary,.mat-icon-button.mat-primary,.mat-stroked-button.mat-primary{color:#673ab7}\n.mat-button.mat-accent,.mat-icon-button.mat-accent,.mat-stroked-button.mat-accent{color:#ffd740}\n.mat-button.mat-warn,.mat-icon-button.mat-warn,.mat-stroked-button.mat-warn{color:#f44336}\n.mat-button.mat-accent[disabled],.mat-button.mat-primary[disabled],.mat-button.mat-warn[disabled],.mat-button[disabled][disabled],.mat-icon-button.mat-accent[disabled],.mat-icon-button.mat-primary[disabled],.mat-icon-button.mat-warn[disabled],.mat-icon-button[disabled][disabled],.mat-stroked-button.mat-accent[disabled],.mat-stroked-button.mat-primary[disabled],.mat-stroked-button.mat-warn[disabled],.mat-stroked-button[disabled][disabled]{color:rgba(0,0,0,.26)}\n.mat-fab,.mat-mini-fab,.mat-raised-button{color:rgba(0,0,0,.87);background-color:#fff}\n.mat-fab.mat-primary,.mat-mini-fab.mat-primary,.mat-raised-button.mat-primary{color:#fff}\n.mat-fab.mat-accent,.mat-mini-fab.mat-accent,.mat-raised-button.mat-accent{color:rgba(0,0,0,.87)}\n.mat-fab.mat-warn,.mat-mini-fab.mat-warn,.mat-raised-button.mat-warn{color:#fff}\n.mat-fab.mat-accent[disabled],.mat-fab.mat-primary[disabled],.mat-fab.mat-warn[disabled],.mat-fab[disabled][disabled],.mat-mini-fab.mat-accent[disabled],.mat-mini-fab.mat-primary[disabled],.mat-mini-fab.mat-warn[disabled],.mat-mini-fab[disabled][disabled],.mat-raised-button.mat-accent[disabled],.mat-raised-button.mat-primary[disabled],.mat-raised-button.mat-warn[disabled],.mat-raised-button[disabled][disabled]{color:rgba(0,0,0,.26)}\n.mat-fab.mat-primary,.mat-mini-fab.mat-primary,.mat-raised-button.mat-primary{background-color:#673ab7}\n.mat-fab.mat-accent,.mat-mini-fab.mat-accent,.mat-raised-button.mat-accent{background-color:#ffd740}\n.mat-fab.mat-warn,.mat-mini-fab.mat-warn,.mat-raised-button.mat-warn{background-color:#f44336}\n.mat-fab.mat-accent[disabled],.mat-fab.mat-primary[disabled],.mat-fab.mat-warn[disabled],.mat-fab[disabled][disabled],.mat-mini-fab.mat-accent[disabled],.mat-mini-fab.mat-primary[disabled],.mat-mini-fab.mat-warn[disabled],.mat-mini-fab[disabled][disabled],.mat-raised-button.mat-accent[disabled],.mat-raised-button.mat-primary[disabled],.mat-raised-button.mat-warn[disabled],.mat-raised-button[disabled][disabled]{background-color:rgba(0,0,0,.12)}\n.mat-fab.mat-primary .mat-ripple-element,.mat-mini-fab.mat-primary .mat-ripple-element,.mat-raised-button.mat-primary .mat-ripple-element{background-color:rgba(255,255,255,.2)}\n.mat-fab.mat-accent .mat-ripple-element,.mat-mini-fab.mat-accent .mat-ripple-element,.mat-raised-button.mat-accent .mat-ripple-element{background-color:rgba(0,0,0,.2)}\n.mat-fab.mat-warn .mat-ripple-element,.mat-mini-fab.mat-warn .mat-ripple-element,.mat-raised-button.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,.2)}\n.mat-button.mat-primary .mat-ripple-element{background-color:rgba(103,58,183,.1)}\n.mat-button.mat-accent .mat-ripple-element{background-color:rgba(255,215,64,.1)}\n.mat-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,.1)}\n.mat-flat-button{color:rgba(0,0,0,.87);background-color:#fff}\n.mat-flat-button.mat-primary{color:#fff}\n.mat-flat-button.mat-accent{color:rgba(0,0,0,.87)}\n.mat-flat-button.mat-warn{color:#fff}\n.mat-flat-button.mat-accent[disabled],.mat-flat-button.mat-primary[disabled],.mat-flat-button.mat-warn[disabled],.mat-flat-button[disabled][disabled]{color:rgba(0,0,0,.26)}\n.mat-flat-button.mat-primary{background-color:#673ab7}\n.mat-flat-button.mat-accent{background-color:#ffd740}\n.mat-flat-button.mat-warn{background-color:#f44336}\n.mat-flat-button.mat-accent[disabled],.mat-flat-button.mat-primary[disabled],.mat-flat-button.mat-warn[disabled],.mat-flat-button[disabled][disabled]{background-color:rgba(0,0,0,.12)}\n.mat-flat-button.mat-primary .mat-ripple-element{background-color:rgba(255,255,255,.2)}\n.mat-flat-button.mat-accent .mat-ripple-element{background-color:rgba(0,0,0,.2)}\n.mat-flat-button.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,.2)}\n.mat-icon-button.mat-primary .mat-ripple-element{background-color:rgba(103,58,183,.2)}\n.mat-icon-button.mat-accent .mat-ripple-element{background-color:rgba(255,215,64,.2)}\n.mat-icon-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,.2)}\n.mat-button-toggle{color:rgba(0,0,0,.38)}\n.mat-button-toggle.cdk-focused .mat-button-toggle-focus-overlay{background-color:rgba(0,0,0,.12)}\n.mat-button-toggle-checked{background-color:#e0e0e0;color:rgba(0,0,0,.54)}\n.mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,.26)}\n.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}\n.mat-card{background:#fff;color:rgba(0,0,0,.87)}\n.mat-card-subtitle{color:rgba(0,0,0,.54)}\n.mat-checkbox-frame{border-color:rgba(0,0,0,.54)}\n.mat-checkbox-checkmark{fill:#fafafa}\n.mat-checkbox-checkmark-path{stroke:#fafafa!important}\n.mat-checkbox-mixedmark{background-color:#fafafa}\n.mat-checkbox-checked.mat-primary .mat-checkbox-background,.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background{background-color:#673ab7}\n.mat-checkbox-checked.mat-accent .mat-checkbox-background,.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background{background-color:#ffd740}\n.mat-checkbox-checked.mat-warn .mat-checkbox-background,.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background{background-color:#f44336}\n.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}\n.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}\n.mat-checkbox-disabled .mat-checkbox-label{color:#b0b0b0}\n.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(103,58,183,.26)}\n.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(255,215,64,.26)}\n.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}\n.mat-chip:not(.mat-basic-chip){background-color:#e0e0e0;color:rgba(0,0,0,.87)}\n.mat-chip:not(.mat-basic-chip) .mat-chip-remove{color:rgba(0,0,0,.87);opacity:.4}\n.mat-chip:not(.mat-basic-chip) .mat-chip-remove:hover{opacity:.54}\n.mat-chip.mat-chip-selected.mat-primary{background-color:#673ab7;color:#fff}\n.mat-chip.mat-chip-selected.mat-primary .mat-chip-remove{color:#fff;opacity:.4}\n.mat-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover{opacity:.54}\n.mat-chip.mat-chip-selected.mat-warn{background-color:#f44336;color:#fff}\n.mat-chip.mat-chip-selected.mat-warn .mat-chip-remove{color:#fff;opacity:.4}\n.mat-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover{opacity:.54}\n.mat-chip.mat-chip-selected.mat-accent{background-color:#ffd740;color:rgba(0,0,0,.87)}\n.mat-chip.mat-chip-selected.mat-accent .mat-chip-remove{color:rgba(0,0,0,.87);opacity:.4}\n.mat-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover{opacity:.54}\n.mat-table{background:#fff}\n.mat-header-row,.mat-row{border-bottom-color:rgba(0,0,0,.12)}\n.mat-header-cell{color:rgba(0,0,0,.54)}\n.mat-cell{color:rgba(0,0,0,.87)}\n.mat-datepicker-content{background-color:#fff;color:rgba(0,0,0,.87)}\n.mat-calendar-arrow{border-top-color:rgba(0,0,0,.54)}\n.mat-calendar-next-button,.mat-calendar-previous-button{color:rgba(0,0,0,.54)}\n.mat-calendar-table-header{color:rgba(0,0,0,.38)}\n.mat-calendar-table-header-divider::after{background:rgba(0,0,0,.12)}\n.mat-calendar-body-label{color:rgba(0,0,0,.54)}\n.mat-calendar-body-cell-content{color:rgba(0,0,0,.87);border-color:transparent}\n.mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){color:rgba(0,0,0,.38)}\n.cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:rgba(0,0,0,.04)}\n.mat-calendar-body-selected{background-color:#673ab7;color:#fff}\n.mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(103,58,183,.4)}\n.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.38)}\n.mat-calendar-body-today.mat-calendar-body-selected{-webkit-box-shadow:inset 0 0 0 1px #fff;box-shadow:inset 0 0 0 1px #fff}\n.mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,.18)}\n.mat-datepicker-toggle-active{color:#673ab7}\n.mat-dialog-container{background:#fff;color:rgba(0,0,0,.87)}\n.mat-divider{border-top-color:rgba(0,0,0,.12)}\n.mat-divider-vertical{border-right-color:rgba(0,0,0,.12)}\n.mat-expansion-panel{background:#fff;color:rgba(0,0,0,.87)}\n.mat-action-row{border-top-color:rgba(0,0,0,.12)}\n.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused,.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:rgba(0,0,0,.04)}\n.mat-expansion-panel-header-title{color:rgba(0,0,0,.87)}\n.mat-expansion-indicator::after,.mat-expansion-panel-header-description{color:rgba(0,0,0,.54)}\n.mat-expansion-panel-header[aria-disabled=true]{color:rgba(0,0,0,.26)}\n.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title{color:inherit}\n.mat-form-field-label{color:rgba(0,0,0,.54)}\n.mat-hint{color:rgba(0,0,0,.54)}\n.mat-focused .mat-form-field-label{color:#673ab7}\n.mat-focused .mat-form-field-label.mat-accent{color:#ffd740}\n.mat-focused .mat-form-field-label.mat-warn{color:#f44336}\n.mat-focused .mat-form-field-required-marker{color:#ffd740}\n.mat-form-field-underline{background-color:rgba(0,0,0,.42)}\n.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear,left top, right top,color-stop(0, rgba(0,0,0,.42)),color-stop(33%, rgba(0,0,0,.42)),color-stop(0, transparent));background-image:linear-gradient(to right,rgba(0,0,0,.42) 0,rgba(0,0,0,.42) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x}\n.mat-form-field-ripple{background-color:#673ab7}\n.mat-form-field-ripple.mat-accent{background-color:#ffd740}\n.mat-form-field-ripple.mat-warn{background-color:#f44336}\n.mat-form-field-invalid .mat-form-field-label{color:#f44336}\n.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker,.mat-form-field-invalid .mat-form-field-label.mat-accent{color:#f44336}\n.mat-form-field-invalid .mat-form-field-ripple{background-color:#f44336}\n.mat-error{color:#f44336}\n.mat-icon.mat-primary{color:#673ab7}\n.mat-icon.mat-accent{color:#ffd740}\n.mat-icon.mat-warn{color:#f44336}\n.mat-input-element:disabled{color:rgba(0,0,0,.38)}\n.mat-input-element{caret-color:#673ab7}\n.mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element::-ms-input-placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element::placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element::-moz-placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,.42)}\n.mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,.42)}\n.mat-accent .mat-input-element{caret-color:#ffd740}\n.mat-form-field-invalid .mat-input-element,.mat-warn .mat-input-element{caret-color:#f44336}\n.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{color:rgba(0,0,0,.87)}\n.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{color:rgba(0,0,0,.87)}\n.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{color:rgba(0,0,0,.54)}\n.mat-list-item-disabled{background-color:#eee}\n.mat-list-option.mat-list-item-focus,.mat-list-option:hover,.mat-nav-list .mat-list-item.mat-list-item-focus,.mat-nav-list .mat-list-item:hover{background:rgba(0,0,0,.04)}\n.mat-menu-panel{background:#fff}\n.mat-menu-item{background:0 0;color:rgba(0,0,0,.87)}\n.mat-menu-item[disabled]{color:rgba(0,0,0,.38)}\n.mat-menu-item .mat-icon:not([color]),.mat-menu-item-submenu-trigger::after{color:rgba(0,0,0,.54)}\n.mat-menu-item-highlighted:not([disabled]),.mat-menu-item.cdk-keyboard-focused:not([disabled]),.mat-menu-item.cdk-program-focused:not([disabled]),.mat-menu-item:hover:not([disabled]){background:rgba(0,0,0,.04)}\n.mat-paginator{background:#fff}\n.mat-paginator,.mat-paginator-page-size .mat-select-trigger{color:rgba(0,0,0,.54)}\n.mat-paginator-decrement,.mat-paginator-increment{border-top:2px solid rgba(0,0,0,.54);border-right:2px solid rgba(0,0,0,.54)}\n.mat-paginator-first,.mat-paginator-last{border-top:2px solid rgba(0,0,0,.54)}\n.mat-icon-button[disabled] .mat-paginator-decrement,.mat-icon-button[disabled] .mat-paginator-first,.mat-icon-button[disabled] .mat-paginator-increment,.mat-icon-button[disabled] .mat-paginator-last{border-color:rgba(0,0,0,.38)}\n.mat-progress-bar-background{fill:#d1c4e9}\n.mat-progress-bar-buffer{background-color:#d1c4e9}\n.mat-progress-bar-fill::after{background-color:#673ab7}\n.mat-progress-bar.mat-accent .mat-progress-bar-background{fill:#ffe57f}\n.mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#ffe57f}\n.mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#ffd740}\n.mat-progress-bar.mat-warn .mat-progress-bar-background{fill:#ffcdd2}\n.mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffcdd2}\n.mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#f44336}\n.mat-progress-spinner circle,.mat-spinner circle{stroke:#673ab7}\n.mat-progress-spinner.mat-accent circle,.mat-spinner.mat-accent circle{stroke:#ffd740}\n.mat-progress-spinner.mat-warn circle,.mat-spinner.mat-warn circle{stroke:#f44336}\n.mat-radio-outer-circle{border-color:rgba(0,0,0,.54)}\n.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,.38)}\n.mat-radio-disabled .mat-radio-inner-circle,.mat-radio-disabled .mat-radio-ripple .mat-ripple-element{background-color:rgba(0,0,0,.38)}\n.mat-radio-disabled .mat-radio-label-content{color:rgba(0,0,0,.38)}\n.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle{border-color:#673ab7}\n.mat-radio-button.mat-primary .mat-radio-inner-circle{background-color:#673ab7}\n.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element{background-color:rgba(103,58,183,.26)}\n.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle{border-color:#ffd740}\n.mat-radio-button.mat-accent .mat-radio-inner-circle{background-color:#ffd740}\n.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element{background-color:rgba(255,215,64,.26)}\n.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle{border-color:#f44336}\n.mat-radio-button.mat-warn .mat-radio-inner-circle{background-color:#f44336}\n.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,67,54,.26)}\n.mat-select-content,.mat-select-panel-done-animating{background:#fff}\n.mat-select-value{color:rgba(0,0,0,.87)}\n.mat-select-placeholder{color:rgba(0,0,0,.42)}\n.mat-select-disabled .mat-select-value{color:rgba(0,0,0,.38)}\n.mat-select-arrow{color:rgba(0,0,0,.54)}\n.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background:rgba(0,0,0,.12)}\n.mat-form-field.mat-focused.mat-primary .mat-select-arrow{color:#673ab7}\n.mat-form-field.mat-focused.mat-accent .mat-select-arrow{color:#ffd740}\n.mat-form-field.mat-focused.mat-warn .mat-select-arrow{color:#f44336}\n.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow{color:#f44336}\n.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow{color:rgba(0,0,0,.38)}\n.mat-drawer-container{background-color:#fafafa;color:rgba(0,0,0,.87)}\n.mat-drawer{background-color:#fff;color:rgba(0,0,0,.87)}\n.mat-drawer.mat-drawer-push{background-color:#fff}\n.mat-drawer-backdrop.mat-drawer-shown{background-color:rgba(0,0,0,.6)}\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#ffc107}\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(255,193,7,.5)}\n.mat-slide-toggle:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}\n.mat-slide-toggle .mat-ripple-element{background-color:rgba(255,193,7,.12)}\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#673ab7}\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(103,58,183,.5)}\n.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}\n.mat-slide-toggle.mat-primary .mat-ripple-element{background-color:rgba(103,58,183,.12)}\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,.5)}\n.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,.06)}\n.mat-slide-toggle.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,.12)}\n.mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}\n.mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,.1)}\n.mat-slide-toggle-thumb{background-color:#fafafa}\n.mat-slide-toggle-bar{background-color:rgba(0,0,0,.38)}\n.mat-slider-track-background{background-color:rgba(0,0,0,.26)}\n.mat-primary .mat-slider-thumb,.mat-primary .mat-slider-thumb-label,.mat-primary .mat-slider-track-fill{background-color:#673ab7}\n.mat-primary .mat-slider-thumb-label-text{color:#fff}\n.mat-accent .mat-slider-thumb,.mat-accent .mat-slider-thumb-label,.mat-accent .mat-slider-track-fill{background-color:#ffd740}\n.mat-accent .mat-slider-thumb-label-text{color:rgba(0,0,0,.87)}\n.mat-warn .mat-slider-thumb,.mat-warn .mat-slider-thumb-label,.mat-warn .mat-slider-track-fill{background-color:#f44336}\n.mat-warn .mat-slider-thumb-label-text{color:#fff}\n.mat-slider-focus-ring{background-color:rgba(255,215,64,.2)}\n.cdk-focused .mat-slider-track-background,.mat-slider:hover .mat-slider-track-background{background-color:rgba(0,0,0,.38)}\n.mat-slider-disabled .mat-slider-thumb,.mat-slider-disabled .mat-slider-track-background,.mat-slider-disabled .mat-slider-track-fill{background-color:rgba(0,0,0,.26)}\n.mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,.26)}\n.mat-slider-min-value .mat-slider-focus-ring{background-color:rgba(0,0,0,.12)}\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:rgba(0,0,0,.87)}\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label{background-color:rgba(0,0,0,.26)}\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,.26);background-color:transparent}\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb{border-color:rgba(0,0,0,.38)}\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb,.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,.26)}\n.mat-slider-has-ticks .mat-slider-wrapper::after{border-color:rgba(0,0,0,.7)}\n.mat-slider-horizontal .mat-slider-ticks{background-image:repeating-linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent);background-image:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}\n.mat-slider-vertical .mat-slider-ticks{background-image:repeating-linear-gradient(to bottom,rgba(0,0,0,.7),rgba(0,0,0,.7) 2px,transparent 0,transparent)}\n.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused,.mat-step-header:hover{background-color:rgba(0,0,0,.04)}\n.mat-step-header .mat-step-label,.mat-step-header .mat-step-optional{color:rgba(0,0,0,.38)}\n.mat-step-header .mat-step-icon{background-color:#673ab7;color:#fff}\n.mat-step-header .mat-step-icon-not-touched{background-color:rgba(0,0,0,.38);color:#fff}\n.mat-step-header .mat-step-label.mat-step-label-active{color:rgba(0,0,0,.87)}\n.mat-stepper-horizontal,.mat-stepper-vertical{background-color:#fff}\n.mat-stepper-vertical-line::before{border-left-color:rgba(0,0,0,.12)}\n.mat-stepper-horizontal-line{border-top-color:rgba(0,0,0,.12)}\n.mat-tab-header,.mat-tab-nav-bar{border-bottom:1px solid rgba(0,0,0,.12)}\n.mat-tab-group-inverted-header .mat-tab-header,.mat-tab-group-inverted-header .mat-tab-nav-bar{border-top:1px solid rgba(0,0,0,.12);border-bottom:none}\n.mat-tab-label,.mat-tab-link{color:rgba(0,0,0,.87)}\n.mat-tab-label.mat-tab-disabled,.mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,.38)}\n.mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.87)}\n.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.38)}\n.mat-tab-group[class*=mat-background-] .mat-tab-header,.mat-tab-nav-bar[class*=mat-background-]{border-bottom:none;border-top:none}\n.mat-tab-group.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(209,196,233,.3)}\n.mat-tab-group.mat-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#673ab7}\n.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,.mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar{background-color:#fff}\n.mat-tab-group.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,229,127,.3)}\n.mat-tab-group.mat-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent .mat-ink-bar{background-color:#ffd740}\n.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,.mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar{background-color:rgba(0,0,0,.87)}\n.mat-tab-group.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}\n.mat-tab-group.mat-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn .mat-ink-bar{background-color:#f44336}\n.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,.mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar{background-color:#fff}\n.mat-tab-group.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(209,196,233,.3)}\n.mat-tab-group.mat-background-primary .mat-tab-header,.mat-tab-group.mat-background-primary .mat-tab-links,.mat-tab-nav-bar.mat-background-primary .mat-tab-header,.mat-tab-nav-bar.mat-background-primary .mat-tab-links{background-color:#673ab7}\n.mat-tab-group.mat-background-primary .mat-tab-label,.mat-tab-group.mat-background-primary .mat-tab-link,.mat-tab-nav-bar.mat-background-primary .mat-tab-label,.mat-tab-nav-bar.mat-background-primary .mat-tab-link{color:#fff}\n.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron{border-color:#fff}\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}\n.mat-tab-group.mat-background-primary .mat-ripple-element,.mat-tab-nav-bar.mat-background-primary .mat-ripple-element{background-color:rgba(255,255,255,.12)}\n.mat-tab-group.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,229,127,.3)}\n.mat-tab-group.mat-background-accent .mat-tab-header,.mat-tab-group.mat-background-accent .mat-tab-links,.mat-tab-nav-bar.mat-background-accent .mat-tab-header,.mat-tab-nav-bar.mat-background-accent .mat-tab-links{background-color:#ffd740}\n.mat-tab-group.mat-background-accent .mat-tab-label,.mat-tab-group.mat-background-accent .mat-tab-link,.mat-tab-nav-bar.mat-background-accent .mat-tab-label,.mat-tab-nav-bar.mat-background-accent .mat-tab-link{color:rgba(0,0,0,.87)}\n.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,.4)}\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.87)}\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,.4)}\n.mat-tab-group.mat-background-accent .mat-ripple-element,.mat-tab-nav-bar.mat-background-accent .mat-ripple-element{background-color:rgba(0,0,0,.12)}\n.mat-tab-group.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-group.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,.mat-tab-nav-bar.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus{background-color:rgba(255,205,210,.3)}\n.mat-tab-group.mat-background-warn .mat-tab-header,.mat-tab-group.mat-background-warn .mat-tab-links,.mat-tab-nav-bar.mat-background-warn .mat-tab-header,.mat-tab-nav-bar.mat-background-warn .mat-tab-links{background-color:#f44336}\n.mat-tab-group.mat-background-warn .mat-tab-label,.mat-tab-group.mat-background-warn .mat-tab-link,.mat-tab-nav-bar.mat-background-warn .mat-tab-label,.mat-tab-nav-bar.mat-background-warn .mat-tab-link{color:#fff}\n.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,.mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,.4)}\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron{border-color:#fff}\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,.4)}\n.mat-tab-group.mat-background-warn .mat-ripple-element,.mat-tab-nav-bar.mat-background-warn .mat-ripple-element{background-color:rgba(255,255,255,.12)}\n.mat-toolbar{background:#f5f5f5;color:rgba(0,0,0,.87)}\n.mat-toolbar.mat-primary{background:#673ab7;color:#fff}\n.mat-toolbar.mat-accent{background:#ffd740;color:rgba(0,0,0,.87)}\n.mat-toolbar.mat-warn{background:#f44336;color:#fff}\n.mat-tooltip{background:rgba(97,97,97,.9)}\n.mat-snack-bar-container{background:#323232;color:#fff}\n.mat-simple-snackbar-action{color:#ffd740}\nmat-card mat-toolbar span {\n  color: white; }\n.welcome-message {\n  margin: 0 12px 0 12px;\n  height: auto; }\n"

/***/ }),

/***/ "./src/app/project-list/project-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_service__ = __webpack_require__("./src/app/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_search_project_search_component__ = __webpack_require__("./src/app/project-search/project-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__new_project_new_project_component__ = __webpack_require__("./src/app/new-project/new-project.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_bundle_project_bundle_component__ = __webpack_require__("./src/app/project-bundle/project-bundle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__welcome_text_welcome_text_component__ = __webpack_require__("./src/app/welcome-text/welcome-text.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_file_saver__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(_componentFactoryResolver, _projectService) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._projectService = _projectService;
        this.toggle = true;
        this.currentCommponent = null;
        // Indicators for whether one of the cards is selected
        this.browse_active = false;
        this.single_active = false;
        this.multiple_active = false;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.openWelcomeText();
    };
    ProjectListComponent.prototype.setComponentBlock = function (inputComponent) {
        var factory = this._componentFactoryResolver.resolveComponentFactory(inputComponent);
        this.ComponentContainer.clear();
        var componentRef = this.ComponentContainer.createComponent(factory);
    };
    ProjectListComponent.prototype.downloadCsv = function () {
        this._projectService.getCsv()
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_6_file_saver__["saveAs"])(blob, 'test.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () {
        });
    };
    ProjectListComponent.prototype.downloadFile = function (data) {
        var blob = new Blob([data], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    ProjectListComponent.prototype.openWelcomeText = function () {
        this.setComponentBlock(__WEBPACK_IMPORTED_MODULE_5__welcome_text_welcome_text_component__["a" /* WelcomeTextComponent */]);
    };
    ProjectListComponent.prototype.openBrowseProject = function () {
        this.setComponentBlock(__WEBPACK_IMPORTED_MODULE_2__project_search_project_search_component__["a" /* ProjectSearchComponent */]);
        this.browse_active = true;
        this.single_active = false;
        this.multiple_active = false;
    };
    ProjectListComponent.prototype.openCreateSingleProject = function () {
        this.setComponentBlock(__WEBPACK_IMPORTED_MODULE_3__new_project_new_project_component__["a" /* NewProjectComponent */]);
        this.browse_active = false;
        this.single_active = true;
        this.multiple_active = false;
    };
    ProjectListComponent.prototype.openCreateMultipleProjects = function () {
        this.setComponentBlock(__WEBPACK_IMPORTED_MODULE_4__project_bundle_project_bundle_component__["a" /* ProjectBundleComponent */]);
        this.browse_active = false;
        this.single_active = false;
        this.multiple_active = true;
    };
    ProjectListComponent.prototype.toggleChange = function () {
        this.toggle = !this.toggle;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('componentBlock', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], ProjectListComponent.prototype, "ComponentContainer", void 0);
    ProjectListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-list',
            template: __webpack_require__("./src/app/project-list/project-list.component.html"),
            styles: [__webpack_require__("./src/app/project-list/project-list.component.scss")],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__new_project_new_project_component__["a" /* NewProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_5__welcome_text_welcome_text_component__["a" /* WelcomeTextComponent */]
            ],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"],
            __WEBPACK_IMPORTED_MODULE_1__project_service__["a" /* ProjectService */]])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/project-search/project-search.component.css":
/***/ (function(module, exports) {

module.exports = ".project_search_container {\n    width: 100%;\n}"

/***/ }),

/***/ "./src/app/project-search/project-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div \n  fxLayout=\"row\"\n  fxLayoutAlign='center'>\n  <mat-card fxFlex=\"35\">\n    <mat-form-field\n      class=\"project_search_container\">\n      <input\n        matInput\n        #searchBox \n        id=\"search-box\"\n        placeholder=\"Search projects\" \n        (keyup)=\"search(searchBox.value)\"\n        class=\"form-control\"\n        />\n    </mat-form-field>\n    <mat-card-actions>\n      <button mat-button (click)='downloadCsv()'>test csv download</button>\n    </mat-card-actions>\n  </mat-card>\n</div>\n\n\n<div\n  fxLayout='row'\n  fxLayoutAlign=\"center\">\n  <div\n    fxFlex=\"98\"\n    fxLayout='row' \n    fxLayoutAlign=\"start start\"\n    fxLayoutGap=\"8px\"\n    fxLayoutWrap>\n    <div\n      *ngFor=\"let project of projects | async\">\n      <app-project-card\n        [project]=\"project\" \n        (projectChange)='changeCsvList($event)'>\n      </app-project-card>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/project-search/project-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_file_saver__ = __webpack_require__("./node_modules/file-saver/FileSaver.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_service__ = __webpack_require__("./src/app/project.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjectSearchComponent = /** @class */ (function () {
    function ProjectSearchComponent(_projectService) {
        this._projectService = _projectService;
        this.searchClickEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.csvProjects = [];
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    ProjectSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projects = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this._projectService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of([]);
        });
    };
    ProjectSearchComponent.prototype.searchClick = function (project) {
        this.searchClickEvent.emit(project);
    };
    ProjectSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    ProjectSearchComponent.prototype.changeCsvList = function (ev) {
        var index = this.csvProjects.indexOf(ev, 0);
        if (index > -1) {
            this.csvProjects.splice(index, 1);
        }
        else {
            this.csvProjects.push(ev);
        }
    };
    ProjectSearchComponent.prototype.downloadCsv = function () {
        this._projectService.getCsv(this.csvProjects)
            .subscribe(function (res) {
            var blob = new Blob([res], { type: 'text/csv' });
            Object(__WEBPACK_IMPORTED_MODULE_1_file_saver__["saveAs"])(blob, 'test.csv');
        }, function (error) {
            console.log('Error downloading the file.');
        }, function () {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProjectSearchComponent.prototype, "searchClickEvent", void 0);
    ProjectSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-search',
            template: __webpack_require__("./src/app/project-search/project-search.component.html"),
            styles: [__webpack_require__("./src/app/project-search/project-search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__project_service__["a" /* ProjectService */]])
    ], ProjectSearchComponent);
    return ProjectSearchComponent;
}());



/***/ }),

/***/ "./src/app/project-table/project-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mat-table-container\" title>\n  <table td-data-table>\n    <th td-data-table-column class=\"mat-checkbox-column\">\n      <mat-checkbox\n        #checkBoxAll\n        [disabled]=\"!hasData\"\n        [indeterminate]=\"isAnySelected() && !isAllSelected()\"\n        [checked]=\"isAllSelected() && hasData\"\n        (keyup.enter)=\"selectAll(checkBoxAll.checked)\"\n        (keyup.space)=\"selectAll(checkBoxAll.checked)\"\n        (keydown.space)=\"blockEvent($event)\"\n        (click)=\"selectAll(checkBoxAll.checked)\">\n      </mat-checkbox>\n    </th>\n    <th td-data-table-column\n      *ngFor=\"let column of columns\"\n      [name]=\"column.name\">\n      <span [matTooltip]=\"column.tooltip\">{{column.label}}</span>\n    </th>\n    <tr \n      td-data-table-row\n      *ngFor='let project of projectObservable | async'>\n      <td td-data-table-cell class=\"mat-checkbox-cell\">\n        <mat-pseudo-checkbox\n          [state]='isProjectSelected(project) ? \"checked\" : \"unchecked\"'\n          (click)='select(project)'>\n        </mat-pseudo-checkbox>\n      </td>\n      <td td-data-table-cell>\n        {{project.name}}\n        <span\n          class=\"right-button\"\n          *ngIf=\"project.errors.length > 0\">\n          <button mat-button matTooltip='Errors found. Click to view.' (click)='openErrorDialog(project)'>\n            <mat-icon color=\"warn\">\n              warning\n            </mat-icon>\n          </button>\n        </span>\n      </td>\n      <td td-data-table-cell>\n        <div *ngIf='project.description; else ElseBlock'>\n          <span>\n            {{project.description}}\n          </span>\n        </div>\n        <ng-template #ElseBlock>\n          <span class=\"md-body-1\">\n            No description\n          </span>\n        </ng-template>\n      </td>\n      <td td-data-table-cell>\n        <span class=\"md-body-1\">\n          {{project.parts.length}}\n        </span>\n      </td>\n      <td td-data-table-cell>\n        <span>\n          <button mat-button\n            [routerLink]=\"['/projects/'+project.id]\">\n            <mat-icon>\n              mode_edit\n            </mat-icon>\n          </button>\n        </span>\n      </td>\n    </tr>\n  </table>\n</div>"

/***/ }),

/***/ "./src/app/project-table/project-table.component.scss":
/***/ (function(module, exports) {

module.exports = ".mat-table-container {\n  display: block;\n  max-width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch; }\n\ntable.td-data-table.mat-selectable tbody > tr.td-data-table-row {\n  -webkit-transition: background-color 0.2s;\n  transition: background-color 0.2s; }\n\ntable.td-data-table.mat-selectable .td-data-table-column:first-child,\ntable.td-data-table.mat-selectable th.td-data-table-column:first-child,\ntable.td-data-table.mat-selectable td.td-data-table-cell:first-child {\n  width: 20px;\n  padding: 0 24px; }\n\ntable.td-data-table.mat-selectable .td-data-table-column:nth-child(2),\ntable.td-data-table.mat-selectable th.td-data-table-column:nth-child(2),\ntable.td-data-table.mat-selectable td.td-data-table-cell:nth-child(2) {\n  padding-left: 0px; }\n\n[dir='rtl'] table.td-data-table.mat-selectable .td-data-table-column:nth-child(2), [dir='rtl']\ntable.td-data-table.mat-selectable th.td-data-table-column:nth-child(2), [dir='rtl']\ntable.td-data-table.mat-selectable td.td-data-table-cell:nth-child(2) {\n  padding-right: 0px;\n  padding-left: 28px; }\n\ntable.td-data-table td.mat-checkbox-cell,\ntable.td-data-table th.mat-checkbox-column {\n  width: 18px;\n  font-size: 0 !important; }\n\ntable.td-data-table td.mat-checkbox-cell mat-pseudo-checkbox,\n  table.td-data-table th.mat-checkbox-column mat-pseudo-checkbox {\n    width: 18px;\n    height: 18px; }\n\n/deep/ table.td-data-table td.mat-checkbox-cell mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after, /deep/\n    table.td-data-table th.mat-checkbox-column mat-pseudo-checkbox.mat-pseudo-checkbox-checked::after {\n      width: 11px !important;\n      height: 4px !important; }\n\ntable.td-data-table td.mat-checkbox-cell mat-checkbox /deep/ .mat-checkbox-inner-container,\n  table.td-data-table th.mat-checkbox-column mat-checkbox /deep/ .mat-checkbox-inner-container {\n    width: 18px;\n    height: 18px;\n    margin: 0; }\n"

/***/ }),

/***/ "./src/app/project-table/project-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_error_dialog_project_error_dialog_component__ = __webpack_require__("./src/app/project-error-dialog/project-error-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectTableComponent = /** @class */ (function () {
    function ProjectTableComponent(dialog) {
        this.dialog = dialog;
        this.projectObservableChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.projectList = [];
        this.selectedProjects = [];
        this.columns = [
            { name: 'name', label: 'Project name' },
            { name: 'description', label: 'Description' },
            { name: 'parts', label: 'Number of parts' },
            { name: 'actions', label: 'Actions' },
        ];
        this.hasData = false;
    }
    ProjectTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectSubscription = this.projectObservable.subscribe(function (res) {
            _this.hasData = true;
            _this.projectList = res;
        });
    };
    ProjectTableComponent.prototype.select = function (project) {
        /*
          Toggle select on a single project row and
          emit the new select list
        */
        var index = this.getProjectIdx(project);
        if (index > -1) {
            this.selectedProjects.splice(index, 1);
        }
        else {
            this.selectedProjects.push(project);
        }
        this.projectObservableChange.emit(this.selectedProjects);
    };
    ProjectTableComponent.prototype.selectAll = function (checked) {
        var _this = this;
        /*
          Toggle select on all projects and emit the new list
        */
        if (this.hasData) {
            if (checked) {
                this.selectedProjects = [];
            }
            else {
                this.projectList.map(function (project) {
                    if (!_this.isProjectSelected(project)) {
                        _this.selectedProjects.push(project);
                    }
                });
            }
        }
        this.projectObservableChange.emit(this.selectedProjects);
    };
    ProjectTableComponent.prototype.isProjectSelected = function (project) {
        /*
          Returns a boolean indicating whether the project
          is present in the selectedProjects list
        */
        return this.getProjectIdx(project) > -1;
    };
    ProjectTableComponent.prototype.isAllSelected = function () {
        var _this = this;
        /*
          Returns true if ALL projects in the table are selected
        */
        return this.projectList.every(function (el) { return _this.isProjectSelected(el); });
    };
    ProjectTableComponent.prototype.isAnySelected = function () {
        var _this = this;
        /*
          Returns true if ANY project in the table is selected
        */
        return this.projectList.some(function (el) { return _this.isProjectSelected(el); });
    };
    ProjectTableComponent.prototype.getProjectIdx = function (project) {
        /*
          Finds the id of the project in the selected array
          based on the id of the project itself.
        */
        return this.selectedProjects.map(function (el) { return el.id; }).indexOf(project.id);
    };
    ProjectTableComponent.prototype.openErrorDialog = function (project) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__project_error_dialog_project_error_dialog_component__["a" /* ProjectErrorDialogComponent */], {
            data: {
                errorArray: project.errors,
                project_name: project.name
            }
        });
    };
    ProjectTableComponent.prototype.blockEvent = function ($ev) {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"])
    ], ProjectTableComponent.prototype, "projectObservable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProjectTableComponent.prototype, "projectObservableChange", void 0);
    ProjectTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-table',
            template: __webpack_require__("./src/app/project-table/project-table.component.html"),
            styles: [__webpack_require__("./src/app/project-table/project-table.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialog */]])
    ], ProjectTableComponent);
    return ProjectTableComponent;
}());



/***/ }),

/***/ "./src/app/project-visualizer/project-visualizer.component.html":
/***/ (function(module, exports) {

module.exports = "<iframe #frame id='iframeId' [src]=\"url | safe\" (load)=\"resize($event)\" frameborder=\"0\">\n  <p> <a [href]=\"url | safe\">\n    Click if vector viewer doesn't load\n  </a> </p>\n</iframe>\n"

/***/ }),

/***/ "./src/app/project-visualizer/project-visualizer.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/project-visualizer/project-visualizer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SafePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectVisualizerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = /** @class */ (function () {
    // This is pretty horific in terms of security, so change when possible
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'safe' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafePipe);
    return SafePipe;
}());

var ProjectVisualizerComponent = /** @class */ (function () {
    function ProjectVisualizerComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.toggle = false; // this is to reload the iframe when project is changed
    }
    ProjectVisualizerComponent.prototype.ngOnInit = function () {
        this.vectorURL();
    };
    ProjectVisualizerComponent.prototype.ngOnChanges = function (changes) {
        this.vectorURL();
    };
    ProjectVisualizerComponent.prototype.vectorURL = function () {
        this.toggle = false;
        this.url = 'https://ice.ebdrup.biosustain.dtu.dk';
        this.url += '/static/swf/vv/VectorViewer.swf?entryId=';
        this.url += this.project.ice_id;
        this.url += '&sessionId=' + localStorage.getItem('ice_token');
        this.toggle = true;
    };
    ProjectVisualizerComponent.prototype.projectChange = function () {
    };
    ProjectVisualizerComponent.prototype.resize = function ($ev) {
        var el = $ev.srcElement;
        el.height = '1000px';
        el.width = '100%';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ProjectVisualizerComponent.prototype, "project", void 0);
    ProjectVisualizerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-project-visualizer',
            template: __webpack_require__("./src/app/project-visualizer/project-visualizer.component.html"),
            styles: [__webpack_require__("./src/app/project-visualizer/project-visualizer.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ProjectVisualizerComponent);
    return ProjectVisualizerComponent;
}());



/***/ }),

/***/ "./src/app/project.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__base_api__ = __webpack_require__("./src/app/base-api.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProjectService = /** @class */ (function (_super) {
    __extends(ProjectService, _super);
    function ProjectService(_authHttp, _router) {
        return _super.call(this, _authHttp, _router, 'projects') || this;
    }
    ProjectService.prototype.create = function (project) {
        var res = this._authHttp
            .post(this.getFullUrl(), JSON.stringify(project), { headers: this.composeHeader() })
            .map(function (el) { return el.json(); });
        return res;
    };
    ProjectService.prototype.getCsv = function (projectList) {
        var idxList;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'text/csv');
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        if (projectList) {
            idxList = projectList.map(function (el) { return el.id; });
        }
        else {
            idxList = [1, 2];
        }
        var csvResp = this._authHttp
            .get(this.getFullUrl() + 'csv/' + '?project=' + JSON.stringify(idxList), { headers: headers,
            params: params })
            .map(function (res) { return res['_body']; })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["a" /* Observable */].throw(err.json()); });
        return csvResp;
    };
    ProjectService.prototype.getGenbank = function (project) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var csvResp = this._authHttp
            .get(this.getFullUrl() + project.id + '/genbank/', { headers: headers })
            .map(function (res) { return res['_body']; })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["a" /* Observable */].throw(err.json()); });
        return csvResp;
    };
    ProjectService.prototype.update = function (project) {
        var id = project.id;
        var res = this._authHttp
            .put(this.getFullUrl() + (id + "/"), JSON.stringify(project), { headers: this.composeHeader() })
            .map(function (el) { return el.json(); });
        return res;
    };
    ProjectService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], ProjectService);
    return ProjectService;
}(__WEBPACK_IMPORTED_MODULE_7__base_api__["a" /* BaseAPI */]));



/***/ }),

/***/ "./src/app/report-detail/report-detail.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/report-detail/report-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  report-detail works!\n</p>\n"

/***/ }),

/***/ "./src/app/report-detail/report-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReportDetailComponent = /** @class */ (function () {
    function ReportDetailComponent() {
    }
    ReportDetailComponent.prototype.ngOnInit = function () {
    };
    ReportDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-report-detail',
            template: __webpack_require__("./src/app/report-detail/report-detail.component.html"),
            styles: [__webpack_require__("./src/app/report-detail/report-detail.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ReportDetailComponent);
    return ReportDetailComponent;
}());



/***/ }),

/***/ "./src/app/rxjs-extensions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_throw__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
// Observable class extensions


// Observable operators









/***/ }),

/***/ "./src/app/seq-record-list/seq-record-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/seq-record-list/seq-record-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"row\">\n  <div class=\"col-md-2\">\n  </div>\n  <div class=\"col-md-8\">\n    <div class=\"app-content\">\n  \n    <div class=\"row\">\n       <div class=\"col-md-6\">\n        <app-seq-record-search \n          (searchClickEvent)=\"searchClickSeq($event)\">\n        </app-seq-record-search>\n      </div>\n      <div class=\"col-md-12\">\n        <app-part-search\n          (searchClickEvent)=\"searchClickPart($event)\">\n        </app-part-search>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12 panel panel-default\">\n        <div class=\"panel-header\">\n          <h2>Create new part</h2>\n        </div>\n        <div class=\"panel-body\">\n          <app-part-uploader\n            [(selectedPart)]=\"selectedPart\">\n          </app-part-uploader>\n          \n          <app-sequence-selector \n            [seqRecord]=\"selectedSeqRecord\"\n            [part]=\"selectedPart\">\n          </app-sequence-selector>        \n        </div>\n  \n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h2>Upload new genbank files</h2>\n        <app-seq-record-uploader (sendNotification)=updateList($event)></app-seq-record-uploader>\n      </div>\n    </div>\n\n    </div>\n  </div>\n  <div class=\"col-md-2\">\n  </div>\n</div>\n -->"

/***/ }),

/***/ "./src/app/seq-record-list/seq-record-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeqRecordListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SeqRecordListComponent = /** @class */ (function () {
    function SeqRecordListComponent() {
    }
    // seqrecords: SeqRecord[] = [];
    // seqrecordsSearch: Observable<SeqRecord>;
    // selectedSeqRecord: SeqRecord;
    // @ViewChild(SeqRecordSearchComponent) seqSearch: SeqRecordSearchComponent;
    // parts: Part[] = [];
    // partsSearch: Observable<Part>;
    // selectedPart: Part;
    // constructor(
    //   private seqRecordService: SeqRecordService,
    //   private partService: PartService
    // ) { }
    SeqRecordListComponent.prototype.ngOnInit = function () {
    };
    SeqRecordListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seq-record-list',
            template: __webpack_require__("./src/app/seq-record-list/seq-record-list.component.html"),
            styles: [__webpack_require__("./src/app/seq-record-list/seq-record-list.component.css")]
        })
    ], SeqRecordListComponent);
    return SeqRecordListComponent;
}());



/***/ }),

/***/ "./src/app/seq-record-search/seq-record-search.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/seq-record-search/seq-record-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"search-component\" class=\"panel panel-default\">\n  <div class=\"panel-header\">\n    <h2>Search sequence records</h2>\n  </div>\n  <div class=\"panel-body\">\n    <input #searchBox \n      id=\"search-box\"\n      (keyup)=\"search(searchBox.value)\"\n      class=\"form-control\"\n      />\n    <br>\n    <ul class=\"list-group active\">\n      <li *ngFor=\"let seq of seqrecords | async\" (click)=\"searchClick(seq)\" class=\"search-result list-group-item\" data-toggle=\"pill\">\n          {{seq.name}}\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/seq-record-search/seq-record-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeqRecordSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__seq_record_service__ = __webpack_require__("./src/app/seq-record.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SeqRecordSearchComponent = /** @class */ (function () {
    function SeqRecordSearchComponent(seqRecordService) {
        this.seqRecordService = seqRecordService;
        this.searchClickEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]('');
    }
    SeqRecordSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.seqrecords = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.seqRecordService.search(term); })
            .catch(function (error) {
            console.log(error);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of([]);
        });
    };
    SeqRecordSearchComponent.prototype.searchClick = function (seqRecord) {
        this.searchClickEvent.emit(seqRecord);
    };
    SeqRecordSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
    ], SeqRecordSearchComponent.prototype, "seqrecords", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], SeqRecordSearchComponent.prototype, "searchClickEvent", void 0);
    SeqRecordSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-seq-record-search',
            template: __webpack_require__("./src/app/seq-record-search/seq-record-search.component.html"),
            styles: [__webpack_require__("./src/app/seq-record-search/seq-record-search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__seq_record_service__["a" /* SeqRecordService */]])
    ], SeqRecordSearchComponent);
    return SeqRecordSearchComponent;
}());



/***/ }),

/***/ "./src/app/seq-record.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeqRecordService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_api__ = __webpack_require__("./src/app/base-api.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SeqRecordService = /** @class */ (function (_super) {
    __extends(SeqRecordService, _super);
    function SeqRecordService(_authHttp, _router) {
        return _super.call(this, _authHttp, _router, 'seqrecords') || this;
    }
    SeqRecordService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], SeqRecordService);
    return SeqRecordService;
}(__WEBPACK_IMPORTED_MODULE_5__base_api__["a" /* BaseAPI */]));



/***/ }),

/***/ "./src/app/sequence-selector/sequence-selector.component.css":
/***/ (function(module, exports) {

module.exports = ".visualisation_sequence {\n    overflow-x: scroll;\n}"

/***/ }),

/***/ "./src/app/sequence-selector/sequence-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<div #sequence class='sequence'>\n\n</div>"

/***/ }),

/***/ "./src/app/sequence-selector/sequence-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SequenceSelectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SequenceSelectorComponent = /** @class */ (function () {
    function SequenceSelectorComponent() {
    }
    //  @Input() seqRecord: SeqRecord;
    //  @Input() part: Part;
    //  @Input() project: Project;
    //  @ViewChild('sequence') element: ElementRef;
    //  private htmlElement; // Host HTMLElement
    //  private host; // D3 object referencing host dom object
    //  private svg; // SVG in which we will print our chart
    //  private margin; // Space between the svg borders and the actual chart graphic
    //  private width; // Component width
    //  private height; // Component height
    //  private fontSize = 12;
    //  private handleCircle;
    //  private tooltipGroup;
    //  // Virtual scroll is the actual coordinates shown in render
    //  // Render coordinates are relative to the virtual scroll
    //  private virtualScrollStart: number;
    //  private virtualScrollEnd: number;
    //  private markBar;
    //  private extraMarkBar;
    //  private dragBarStart;
    //  private dragBarEnd;
    //  private renderMarkBar;
    //  private renderFeatArr;
    //  private dispFeat;
    //  private controlGroup;
    //  private sequenceGroup;
    //  private markerGroup;
    //  private featureGroup;
    //  public sequence;
    //  private newSelection: number = null;
    //  private dragStart;
    //  constructor() { }
    //  ngOnChanges(): void {
    //    // Update graphical part
    //    this.htmlElement = this.element.nativeElement;
    //    this.host = D3.select(this.element.nativeElement);
    //    // Update shown sequence:
    //    if (this.seqRecord) {
    //      // Replace this with the entire sequence always being sent
    //      this.sequence = this.seqRecord.sequence;
    //      this.virtualScrollStart = this.part.start_pos;
    //      this.virtualScrollEnd = this.part.start_pos + 40;
    //      this.controlGroup.selectAll('*').remove();
    //      this.createFeatTooltip();
    //      this.insertCircleControl();
    //      this.updateMarker();
    //      this.drawSequence();
    //      this.featureGroup.selectAll('*').remove();
    //      this.SetupFeatures();
    //      this.drawFeatures();
    //      this.updateFeatures();
    //    };
    //  }
    SequenceSelectorComponent.prototype.ngOnInit = function () {
        //    this.setup();
        //    this.buildSVG();
        //    this.setupGroups();
        //    this.insertMarker();
        //    this.insertScrollControl();
    };
    SequenceSelectorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sequence-selector',
            template: __webpack_require__("./src/app/sequence-selector/sequence-selector.component.html"),
            styles: [__webpack_require__("./src/app/sequence-selector/sequence-selector.component.css")]
        })
    ], SequenceSelectorComponent);
    return SequenceSelectorComponent;
}());



/***/ }),

/***/ "./src/app/user-information.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInformationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserInformationService = /** @class */ (function () {
    function UserInformationService(_authHttp) {
        this._authHttp = _authHttp;
    }
    UserInformationService.prototype.updateIceLoginInformation = function (credentials) {
        var ret = this._authHttp.put('/rest/api/ice-user/', credentials)
            .map(function (res) { return res.json(); });
        return ret;
    };
    UserInformationService.prototype.getIceLoginInformation = function () {
        var ret = this._authHttp.get('/rest/api/ice-user/')
            .map(function (res) { return res.json(); });
        return ret;
    };
    UserInformationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["AuthHttp"]])
    ], UserInformationService);
    return UserInformationService;
}());



/***/ }),

/***/ "./src/app/welcome-text/welcome-text.component.html":
/***/ (function(module, exports) {

module.exports = "<p>This is the User Cloning Primer Suggestion tool developed for researchers at Novo Nordisk Foundation Center For Biosustainability.</p>\n<br>\n<p>The tool is based on the AMUSER tool developen by Hans Jasper Genee, Mads Tvillinggaard Bonde, Frederik Otzen Bagger, Jakob Berg Jespersen, Morten O. A. Sommer, Rasmus Wernersson, and Lars Rønn Olsen. AMUSER and citation information is available <a href=\"http://www.cbs.dtu.dk/services/AMUSER/\">here</a></p>\n<br>\n<p>To start using the tool, pick one of the three options below and follow the onscreen instructions.</p>\n<br>\n<p>For bug reports or suggestions for improvement please contact <a href=\"mailto:chravn@biosustain.dtu.dk\" target=\"_top\">Christian Ravn</a></p>"

/***/ }),

/***/ "./src/app/welcome-text/welcome-text.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/welcome-text/welcome-text.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeTextComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WelcomeTextComponent = /** @class */ (function () {
    function WelcomeTextComponent() {
    }
    WelcomeTextComponent.prototype.ngOnInit = function () {
    };
    WelcomeTextComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-welcome-text',
            template: __webpack_require__("./src/app/welcome-text/welcome-text.component.html"),
            styles: [__webpack_require__("./src/app/welcome-text/welcome-text.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WelcomeTextComponent);
    return WelcomeTextComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map