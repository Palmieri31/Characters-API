const rolesRepository = require('../repositories/roles');

const getByName = async (roleName) => rolesRepository.getByName(roleName);

module.exports = {
  getByName,
};
