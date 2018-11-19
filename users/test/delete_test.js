const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        //Remove a bunch of records with some given criteria 
        User.remove({name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        //use a criteria to remove something, first item in a collection to match this will be removed
        User.findOneAndRemove({ name: 'Joe'}) //You could add id here, so it would be identical to the method findByIdAndRemove
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        //Find an id and use that to remove something
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});