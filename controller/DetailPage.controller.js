sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("foodsalesproject.controller.controller.DetailPage", {
        onInit() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("DetailPage").attachPatternMatched(this.onPatternMatched, this);
        },
        onPatternMatched:function(oEvent)
        {
            var sData = oEvent.getParameter("arguments");
            var oTableData = JSON.parse(sData.data);
            var jModel = new sap.ui.model.json.JSONModel(oTableData);
            this.getView().setModel(jModel);
            
           
        },
      });
    }
  );
  