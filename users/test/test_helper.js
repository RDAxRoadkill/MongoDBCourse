const mongoose = require('mongoose');

//Reference to ES6 promises
mongoose.Promise = global.Promise;

//One call, so connection stays open during our tests and wait till we have a connection.
before((done) => {
    mongoose.connect('mongodb://localhost/users-test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});


//Added done() to make sure this function is run before any other tests run
beforeEach((done) => {
    //Clean up each collection before the test runs
    mongoose.connection.collections.users.drop(() => {
        done(); //Callback to done, once called the tests for this collection will run
    });
});