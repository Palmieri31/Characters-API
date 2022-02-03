const Role = require('../models/role');

const getByName = async (name) => {
  const role = await Role.findOne({ name });
  return role;
};

module.exports = {
  getByName,
};
