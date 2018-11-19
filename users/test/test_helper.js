const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users-test');
mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });