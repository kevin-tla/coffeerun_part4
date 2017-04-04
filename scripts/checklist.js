(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }


    }

    CheckList.prototype.addClickHandler = function(fn) {
        this.$element.on('click', 'input', function(event) {
            var email = event.target.value;
            fn(email)
                .then(function() {
                    this.removeRow(email);
                }.bind(this));
        }.bind(this));
    };

    CheckList.prototype.addRow = function(coffeeOrder) {
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);
        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };


    //Must use ' ' because there are special chars present in the string
    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        var $label = $('<label></label>');

        //Binds customer to coffee order
        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            //for Assignment 8 for db.json
            value: coffeeOrder.id
            
          //  value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';


        //append( ) connects the elements together
        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        //Makes the property available as an instance
        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);
