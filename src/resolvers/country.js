const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    log: ['query', 'info']
});

const getCountries = async () => {
    const country = await prisma.country.findMany();
    return country;
};

const addCountry = async (_,data) => {
    try {
        console.log('addCountry', data)
        const country = await prisma.country.create({data});
        console.log("sssss",country)
        return country;
    } catch (error) {
        console.log('============addCountry=================', error);
        return error
    }
}

const getCountry = async (id) =>{
    return await prisma.country.findUnique({where: {id}})
}
module.exports = {
    getCountries,
    addCountry,
    getCountry
};
