const {
    getPerson,
    addPerson
} = require('./person');

const {
    getUser
} = require('./user');

const {
    getCountries,
    addCountry
} = require('./country');

module.exports = {
    Query: {
        getPerson,
        getCountries,
        getUser
    },
    Mutation: {
        addPerson,
        addCountry,
    }
}



