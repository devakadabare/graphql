const resolvers = require('../resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const PersonAttr = `
    id: ID
    name: String
    address1: String
    address2: String
    city: String
    state: String
    userId: Int
    user: User
    country: Country
`;

const AddPersonAttr = `
    name: String
    address1: String
    address2: String
    city: String
    state: String
    email: String
    contact: String
    role: Role
    countryId: Int
`;

const UserAttr =`
    id: ID
    email: String
    contact: String
    role: Role
    status: String
`;

const CountryAttr =`
    id: ID
    name: String
    code: String
    isoCode: String
`;

const CountryContextAttr =`
    name: String
    code: String
    isoCode: String
`;


const typeDefs = `

    type Person {
        ${PersonAttr}
    }

    type User {
        ${UserAttr}
    }

    type Country {
        ${CountryAttr}
    }

    enum Role {
        ADMIN
        DOCTOR
        PARENT
        CHILDREN
        HOSPITAL_ADMIN
        VACCINATION_CENTER_ADMIN
    }

    type Query {
        getPerson(id: ID!): Person
        getUser(id: ID!): User
        getCountries:[Country]
        getCountry(id: ID!): Country
    }

    type Mutation {
        addPerson(${AddPersonAttr}): Person
        addCountry(${CountryContextAttr}): Country
        
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });