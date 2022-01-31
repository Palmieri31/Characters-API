const Role = require('../models/role');

const getByName = async (name) => {
    const role = await Role.findOne({name: name});
}

module.exports = {
    getByName
};