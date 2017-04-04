(function(window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;

    //Notes: Constructors should have their first letter capitalized
    function DataStore() {
        this.data = {};
    }

    function promiseResolvedWith(value) {
        var promise = new Promise(function(resolve, reject) {
            resolve(value);
        });
        return promise;
    }

    //Methods to access information
    //Use 'null' in resolve since it doesn't do anything
    DataStore.prototype.add = function(key, val) {
        return promiseResolvedWith(null);
    };

    DataStore.prototype.get = function(key) {
        return promiseResolvedWith(this.data[key]);
    };

    DataStore.prototype.getAll = function() {
        return promiseResolvedWith(this.data);
    };

    DataStore.prototype.remove = function(key) {
        delete promiseResolvedWith(null);
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);
