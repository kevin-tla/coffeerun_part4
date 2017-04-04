/*//Gold Challenge - Assignment 6
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}*/


//Gold Challenge Assignment 6
/*function showDetails() {
    'use strict';
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
}*/
(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    //var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

    //For JSON server
    var SERVER_URL = 'http://localhost:3002/coffeeorders/';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);


    var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    //Gold Challenge Assignment 6 - Initially hide details
    //hideDetails();


    /*
    bind( ) is used to guarantee that you get myTruck
    .then( ) to make sure that functions are dependent on the function before it
        second argument is for error checking, pop-up msg pops up if unable to submit through alert( )
    */
    formHandler.displaySlide();
    formHandler.addSubmitHandler(function(data) {
        return myTruck.createOrder.call(myTruck, data)
            .then(function() {
                    checkList.addRow.call(checkList, data);
                },
                function() {
                    alert('Server unreachable. Try again later.');
                }
            );
    });

    formHandler.addInputHandler(Validation.isCompanyEmail, Validation.isAvailable);
    formHandler.addInputHandlerSilverChallenge(Validation.isDecaf, Validation.isStrength);

    myTruck.printOrders(checkList.addRow.bind(checkList));
    //what is this?
    /*
    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', {
        addValidators: true,
        lazyCustomMessages: true
    });*/
    console.log(formHandler);


})(window);
