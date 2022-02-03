const usersRepository = require('../repositories/users');

const getById = async (id) => usersRepository.getById(id);

module.exports = {
  getById,
};
