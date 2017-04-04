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
        },

        isAvailable: function(email) {

          //  var server = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
            var server = 'http://localhost:3002/coffeeorders';
            var remoteDS = new App.RemoteDataStore(server);
            var match = false;

            remoteDS.getAll(function(serverResponse) {
                for (var i in serverResponse) {
                    if (i == email) {
                        console.log('Match');
                        match = true;
                    } else {
                        console.log('No Match');
                    }
                }
                console.log('Inside function: ' + match);

            }.bind(match));

            console.log('Did it function: ' + match);



            return match;





            //console.log('many: ');
            //console.log('i skip u');
            //console.log(keys);



            /*var remoteDS = new App.RemoteDataStore('http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders/');
            var list = true;
            $.get(remoteDS.serverUrl, function(serverResponse) {


                for (var key in serverResponse) {
                    console.log(key);
                    console.log(email);
                    if (key == email) {
                        list = false;
                    }
                }
            });
            console.log(list);

            return list;*/

        }

    };


    App.Validation = Validation;
    window.App = App;
})(window);
