const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe; // instance of a User

    beforeEach((done) => {
        joe = new User ({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe'})
            .then((users) => {
                console.log(users);
                //ToString needs to be called, MongoDB id is actually an objectID
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id }) //No comparision on object id, so we do not need to use .toString
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });
});