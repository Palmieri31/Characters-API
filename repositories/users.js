const User = require('../models/user');

const create = async (newUser) => {
    const user = await newUser.save();
    return user;
}

const getByEmail = async (email) => {
    const user = await User.findOne({email: email});
    return user;
}

module.exports = {
    create,
    getByEmail
}