(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@[A-Za-z]+\.[A-Za-z]{2,}$/.test(email);
        },

        //Silver Challenge Assignment 7
        isDecaf: function(coffee) {
            return 'decaf' === coffee.toLowerCase();

        },
        isStrength: function(strength) {
            return strength < 20;


        }

    };


    App.Validation = Validation;
    window.App = App;
})(window);
