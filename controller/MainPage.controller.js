sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',

    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel", "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageBox",
    'sap/base/util/deepExtend',
    'sap/ui/core/Fragment',

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter) {
        "use strict";

        return Controller.extend("foodsalesproject.controller.MainPage", {

            onInit: function () {
                this.localModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.localModel, "localModel");
                this.jModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(this.jModel, "jModel");


            },

            onUpload: function (e) {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
                this._get(e.getParameter("files") && e.getParameter("files")[0]);
            },
            _import: function (file) {
                var that = this;
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        var ws = workbook.Sheets["FoodSales"];
                        // workbook.SheetNames.forEach(function (sheetName) {
                        //     // Here is your object for every sheet in workbook
                        //     excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                        // });
                        var excelData = XLSX.utils.sheet_to_row_object_array(ws);
                        console.log(excelData);
                        const res = excelData.reduce((acc, curr) => {
                            if (acc.hasOwnProperty(curr.City)) {

                                acc[curr.City].City = curr.City;
                                acc[curr.City].Product += 1;
                                acc[curr.City].Quantity += curr.Quantity;
                                acc[curr.City].TotalPrice += curr.TotalPrice;
                                acc[curr.City].UnitPrice = curr.UnitPrice;


                            } else {
                                acc[curr.City] = {

                                    City: curr.City,
                                    Product: 1,
                                    Quantity: curr.Quantity,
                                    TotalPrice: curr.TotalPrice,
                                    UnitPrice: curr.UnitPrice,


                                };
                            }
                            return acc;
                        }, {});

                        console.log(res);


                        const res1 = excelData.reduce((acc, curr) => {
                            if (acc.hasOwnProperty(curr.Category)) {
                                acc[curr.Category].Category = curr.Category;
                                acc[curr.Category].Product += 1;
                                acc[curr.Category].Quantity += curr.Quantity;
                                acc[curr.Category].TotalPrice += curr.TotalPrice;
                                acc[curr.Category].Region = curr.Region;
                            } else {
                                acc[curr.Category] = {
                                    Category: curr.Category,
                                    Product: 1,
                                    Quantity: curr.Quantity,
                                    TotalPrice: curr.TotalPrice,
                                    Region: curr.Region,
                                };
                            }
                            return acc;
                        }, {});

                        console.log(res1);
                        // Setting the data to the local model 
                        that.localModel.setData({
                            items: res,
                            item: res1

                        });
                        that.localModel.refresh(true);

                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }

            },
            _get: function (file) {
                var that = this;
                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        var ws = workbook.Sheets["FoodSales"];
                        // workbook.SheetNames.forEach(function (sheetName) {
                        //     // Here is your object for every sheet in workbook
                        //     excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

                        // });
                        var excelData = XLSX.utils.sheet_to_row_object_array(ws);
                        console.log(excelData);

                        // Setting the data to the local model 
                        that.jModel.setData({
                            value: excelData
                        });
                        that.jModel.refresh(true);

                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }

            },
            onRow: function (oEvent) {
                var oSelectedRow = oEvent.getSource().getBindingContext("localModel").getObject();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("NewForm", {
                    "data": JSON.stringify(oSelectedRow)
                });
            },
            onCity: function () {
                // Getting the view with the id for navigation within the page and again calling it by page id
                this.getView().byId("navCon").to(this.getView().byId("theCity"));



            },
            onTable: function () {
                this.getView().byId("navCon").to(this.getView().byId("Table"));
            },
            onBack: function () {
                this.getView().byId("navCon").to(this.getView().byId("Table"));
            },
            onAnalytics: function () {

                this.getView().byId("navCon").to(this.getView().byId("p_Analytics"));
            },
            onCategory: function () {
                this.getView().byId("navCon").to(this.getView().byId("theCategory"));

            },
            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                var bSideExpanded = oToolPage.getSideExpanded();

                this._setToggleButtonTooltip(bSideExpanded);

                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },
            onCollapseExpandPress: function () {
                // Side navigation is defined to expand the page to show and hide the navigationListItem for the client
                var oSideNavigation = this.getView().byId('sideNavigation');
                // Expansion of navigationListItem to direct the user 
                var bExpanded = oSideNavigation.getExpanded();
                oSideNavigation.setExpanded(!bExpanded);
                var viewId = this.getView().getId();
                var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
                toolPage.setSideExpanded(!toolPage.getSideExpanded());
            },
            onClear: function (oEvent) {

                var afilter = oEvent.getParameter("selectionSet");
                afilter.forEach(function (val) {
                    val.setSelectedKey("");
                });
                var mBindingParams = this.byId("tableID2").getBinding("items");
                mBindingParams.filter();
                var mBindingParams = this.byId("tableID").getBinding("items");
                mBindingParams.filter();
                var mBindingParams = this.byId("tableID1").getBinding("items");
                mBindingParams.filter();
            },
            onSearch: function () {
                var value = this.getView().byId("City").getSelectedKey();
                var value2 = this.getView().byId("Category").getSelectedKey();
                var value1 = this.getView().byId("Region").getSelectedKey();
                var oTable = this.getView().byId("tableID2");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];
                if (value2 == 0 && value1 == 0) {
                    var oFilter = new Filter("City", 'EQ', value);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value1 == 0) {
                    var oFilter = new Filter("Category", 'EQ', value2);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value2 == 0) {
                    var oFilter = new Filter("Region", 'EQ', value1);
                    aFilters.push(oFilter)
                }
                else {
                    MessageBox("Input data is invalid");
                }
                oBinding.filter(aFilters);
            },
            onGoogle: function () {
                var value = this.getView().byId("City1").getSelectedKey();
                var value2 = this.getView().byId("Category1").getSelectedKey();
                var value1 = this.getView().byId("Region1").getSelectedKey();
                var oTable = this.getView().byId("tableID");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];
                if (value2 == 0 && value1 == 0) {
                    var oFilter = new Filter("City", 'EQ', value);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value1 == 0) {
                    var oFilter = new Filter("Category", 'EQ', value2);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value2 == 0) {
                    var oFilter = new Filter("Region", 'EQ', value1);
                    aFilters.push(oFilter)
                }
                else {
                    MessageBox("Input data is invalid");
                }
                oBinding.filter(aFilters);
            },
            onGo: function () {
                var value = this.getView().byId("City2").getSelectedKey();
                var value2 = this.getView().byId("Category2").getSelectedKey();
                var value1 = this.getView().byId("Region2").getSelectedKey();
                var oTable = this.getView().byId("tableID1");
                var oBinding = oTable.getBinding("items");
                var aFilters = [];
                if (value2 == 0 && value1 == 0) {
                    var oFilter = new Filter("City", 'EQ', value);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value1 == 0) {
                    var oFilter = new Filter("Category", 'EQ', value2);
                    aFilters.push(oFilter);
                }
                else if (value == 0 && value2 == 0) {
                    var oFilter = new Filter("Region", 'EQ', value1);
                    aFilters.push(oFilter)
                }
                else {
                    MessageBox("Input data is invalid");
                }
                oBinding.filter(aFilters);
            },
        });
    });
