const rolesRepository = require('../repositories/roles');

const getByName = async (roleName) => {
    return await rolesRepository.getByName(roleName);
};

modlule.exports = {
    getByName
};