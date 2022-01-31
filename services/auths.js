const UsersRepository = require ('../repositories/users');
const security = require ('../services/security');
const User = require('../models/user');

const existEmailUser = async (email) => {
    const user = await UsersRepository.getByEmail(email);
    return user;
}

const register = async (user) => { 
    const existingUser = await existEmailUser(user.email);
    if(existingUser) {
        const error = new Error('the email already exists');
        error.status = 404;
        throw error;
    }
    const hashedPassword = await security.encryptPassword(user.password);

    const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId
    });

    const userCreated = await UsersRepository.create(newUser);
    return userCreated;
}

module.exports = {
    existEmailUser,
    register
}