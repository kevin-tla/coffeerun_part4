(function(window) {
    'use strict';
    var App = window.App || {};

    var $ = window.jQuery;

    var currentSliderValue;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        /*
        Prefixing variables with '$' refers to elements select using jQuery
              Does not return refereneces to DOM elements, but returns a single
              Object that contains references to the selected elemnet
              Object contains special methods to manipulate the collection of references
                  known as “jQuery-wrapped selection” or “jQuery-wrapped collection
        */
        this.$formElement = $(selector);
        /*
        .length property tells how many elements were matched
        */
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {




        console.log('Setting submit handler for form');
        /*
        event.preventDefault() makes sure the user is not sent to a different page after sending a form
        on(<name of event>, <callback to run>), works like addEventListener
        */
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            /*
            $(this) allow the object to be able to get the serializeArray which gets data from form
                returns data in an array of objects
            */
            var data = {};

            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });



            //Gold Challenge
            /*var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName('close')[0];
            var yesmodal = document.getElementById('yesdisplay');

            yesmodal.onclick = function() {
                modal.style.display = 'none';
                showDetails();
            };

            //Exiting out of the modal
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };

            span.onclick = function() {
                modal.style.display = 'none';
            };


            $('input').bind('input propertychange', function() {
                $('#output').html($(this).val());
            });




            if (data.strength == 100 && data.size == 'coffee-zilla' && data.flavor != '' && data.emailAddress != '') {



                modal.style.display = 'block';

                //  document.getElementById('modalMsg').value =
                //      'Achievement Unlock! Good job! Does this work? Hell naw. That\'s some strong coffee';

                //  document.getElementById('modalMsg') = 'poop \n\n\n\n';


            }*/



            //By adding the .this( ), iv the order is fulfilled then it will focus back
            console.log(data);
            fn(data).then(function() {

                //Resets the info put in form
                this.reset();

                /*
                  Same as autofocus, but after resets, goes back to the first form elements[0]
                  elements[] property is an array of the form's field
                */
                this.elements[0].focus();
            }.bind(this));
        });
    };



    //Display the value of the slider as the person click and drags
    FormHandler.prototype.displaySlide = function() {

        //To display when it loads up
        document.getElementById('displayme').value = 30;

        var mouse = document.getElementById('strengthLevel');
        var color;
        mouse.addEventListener('mousemove', function() {
            var visual = document.getElementById('displayme');

            if (mouse.value < 40) {
                //weak
                color = 'green';
            } else if (mouse.value < 75) {
                //regular , orange
                color = '#FFA500';
            } else {
                //strong
                color = 'red';
            }

            visual.value = mouse.value;

            //Part of Silver Challenge Assignment 7
            currentSliderValue = mouse.value;
            visual.style.color = color;
        });

    };


    /*
    Function validates as you type in the values
    'on' method adds a lister
    'setCustomValidity' is where you put in the changed message you want to output
    */

    FormHandler.prototype.addInputHandler = function(fn, fn1) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                //if (fn1(true/*emailAddress*/)) {
                    event.target.setCustomValidity(message);
            /*    } else {
                    message = emailAddress + ' is already registered!';
                    event.target.setCustomValidity(message);
                }
            } else {

                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            */}
        });
    };

    //For Silver Challenge Assignment 7
    FormHandler.prototype.addInputHandlerSilverChallenge = function(fn1, fn2) {
        console.log('Listener to validate slider + coffee is up');

        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var coffeeisdecaf = event.target.value;
            var message = '';




            //Checks to see if the inputted value is 'decaf', if isnt does not do anything
            if (fn1(coffeeisdecaf)) {
                if (fn1(coffeeisdecaf) && fn2(currentSliderValue)) {
                    console.log('Looking for coffee strength now...');
                    event.target.setCustomValidity('');
                } else {
                    message = 'Decaf coffee should have a lower caffeine level.';
                    event.target.setCustomValidity(message);

                }
            }


        });

    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
