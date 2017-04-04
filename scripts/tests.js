QUnit.test('8.10', function(assert) {
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    });

    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    });
    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);
});

QUnit.test('8.32', function(assert) {
    var db = new App.DataStore();
    var myTruck = new App.Truck('7', db);

    myTruck.createOrder({
        emailAddress: 'me@goldfinder.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    myTruck.printOrders();
    assert.deepEqual(myTruck.getAllOrders(), {
        'me@goldfinder.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinder.com'
        },
        'dr@no.com': {
            'coffee': 'decaf',
            'emailAddress': 'dr@no.com'
        },
        'm@bond.com': {
            'coffee': 'earl grey',
            'emailAddress': 'm@bond.com'
        }
    });
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    myTruck.printOrders();
    assert.deepEqual(myTruck.getAllOrders(), {
        'me@goldfinder.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinder.com'
        }
    });
});
