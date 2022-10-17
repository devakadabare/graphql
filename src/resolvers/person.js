const { PrismaClient } = require('@prisma/client');
const {addUser} = require('./user');
const {getCountry} = require('./country')
const prisma = new PrismaClient({
    log: ['query', 'info']
});

const getPerson = async (_, { id }) => {
    console.log('hereee', id)
    const person = await prisma.person.findUnique({ where: { id: Number(id) },include:{user: true, country:true} });
    console.log(person)
    return person;
};

const addPerson = async (_,data) => {
    try {
        console.log('addPerson', data)
        const {
            name,
            address1,
            address2,
            city,
            state,
            email,
            contact,
            role,
            countryId
        } = data;
        
        const user = await addUser({email, contact: Number(contact), role})
        const person = await prisma.person.create({
            data:{
                name,
                address1,
                address2,
                city,
                state,
                userId: user.id,
                countryId,
            }
        });
        const country = await getCountry(person.countryId);    
        return {...person, user, country};
        
    } catch (error) {
        console.log('============addPerson=================', error);
        return error
    }
}

module.exports = {
    getPerson,
    addPerson
};
