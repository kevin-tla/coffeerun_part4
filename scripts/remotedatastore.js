(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }



    RemoteDataStore.prototype.add = function(key, val) {
        //POST commands from HTML, it now knows who to talk to, what to say, and what to do w/the info
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    //Purpose: to get all coffee order and then pass it onto cb (callback function)
    //Regular code:

    /*
    RemoteDataStore.prototype.getAll = function(cb) {
        return $.get(this.serverUrl, function(serverResponse) {
            console.log(serverResponse);
            if (cb) {
                cb(serverResponse);
            }
        });

    };
    */

    RemoteDataStore.prototype.getAll = function(cb) {
        return $.get(this.serverUrl , function(serverResponse) {
            console.log(serverResponse);
            if (cb) {
                cb(serverResponse);
            }
        });

    };


    //Silver Challenge ch 13
    RemoteDataStore.prototype.usedata = function(serverResponse, use, email) {
        for (var i in serverResponse) {
            if (i == email) {
                console.log('Match');
                use.test = true;
            } else {
                console.log('No Match');
            }
        }
    };





    //get info from server
    RemoteDataStore.prototype.get = function(key, cb) {
        return $.get(this.serverUrl  + key, function(serverResponse) {
            console.log(serverResponse);
            if (cb) {
                cb(serverResponse);
            }
        });
    };

    //delete entries from server
    //no actualy $.delete so much use $.ajax to do the work,
    //"type: 'DELETE'" is the important part of this function
    RemoteDataStore.prototype.remove = function(key) {

      console.log(this.serverUrl + key);
        return $.ajax(this.serverUrl  + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
