sap.ui.define([], function () {
    "use strict";
    return {
        twoDecimal: function(value){
           const value = Math.random();
           const round = (value, digits) => {
               const factor = Math. pow(10, digits);
               value += Math.sign(value) * Number.EPSILON;
               return Math.round(value * factor) / factor;
           };
           
            console.log(value);
            console.log(round(value , 2));
            }
        
    };
});