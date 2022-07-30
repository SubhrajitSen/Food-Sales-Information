sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel", "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageBox",
    'sap/base/util/deepExtend',

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Popover, JSONModel, Button, library, MessageBox, deepExtend) {
        "use strict";

        return Controller.extend("project1.controller.NewForm", {
            onInit: function (oEvent) {
                // Calling the router to advance navigation to next page
                var oRouter = this.getOwnerComponent().getRouter();
                // Attaching the data selected in the last page to be displayed in the given oage
                oRouter.getRoute("NewForm").attachPatternMatched(this.onPatternMatched, this);
                oRouter.getRoute("NewForm").attachPatternMatched(this.handleAdd, this);
            },
            onPatternMatched: function (oEvent) {
             
        
            var sData = oEvent.getParameter("arguments");
            var oTableData = JSON.parse(sData.data);
            var jModel = new sap.ui.model.json.JSONModel(oTableData);
            this.getView().setModel(jModel);
            
           
        },
            onPreviousPage: function () {
                // To navigate to previous page through a button this function is called
                this.getOwnerComponent().getRouter().navTo("MainPage");
            },
            handleEditPress: function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", true)
                this._toggleButtonsAndView(true);
            },
            handleCancel: function () {

                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);

            },

            handleSave: function () {
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                this._toggleButtonsAndView(false);

            },
            handleReset: function(){
                this.getOwnerComponent().getModel("AppCreateModel").setProperty("/settingEdit", false);
                
                this.byId("EmployeeDetails").getModel("AppCreateModel").refresh();
                this.byId("EmployeeID").getModel("AppCreateModel").refresh();
                this.byId("idCClausesSection").getModel("AppCreateModel").refresh();
            },
            _toggleButtonsAndView: function (bEdit) {
                var oView = this.getView();

                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
                oView.byId("reset").setVisible(bEdit);


            },

            getViewSettingsDialog: function (sDialogFragmentName) {
                var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {

                        oDialog.addStyleClass("sapUiSizeCompact");

                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },
            handleAdd: function () {
               
            }



        });
    });