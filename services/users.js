const security = require('./security');
const usersRepository = require('../repositories/users');

const getById = async (id) => {
    return await usersRepository.getById(id);
}

module.exports = {
    getById
};