sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "foodsalesproject/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("foodsalesproject.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var XLSXScript = document.createElement('script');
                XLSXScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
                document.head.appendChild(XLSXScript);

                this.setModel(new JSONModel(models.ConfigModel()), "AppCreateModel");
            }
        });
    }
);