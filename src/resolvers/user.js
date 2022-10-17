const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    log: ['query', 'info']
});

const getUser = async (_, { id }) => {
    console.log('getUser', id)
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    console.log(user)
    return user;
};

const addUser = async (data) => {
    try {
        console.log('addUser', data)
        const user = await prisma.user.create({data});
        console.log("addUser",user)
        return user;
    } catch (error) {
        console.log('============addUser=================', error);
        return error
    }
}

module.exports = {
    getUser,
    addUser
};
