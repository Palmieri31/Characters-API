const usersService = require('../services/users');
const authsService = require('../services/auths');
const security = require('../services/security');
const res = require('express/lib/response');
const req = require('express/lib/request');

const register = async (req, res, next) => {
  try {
    const newUser = await authsService.register(req.body);
    const token = security.generateToken(newUser);
    res.status(200).json({
      success: true,
      msg: `${newUser.username} your user has been created`,
      user: newUser,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res ,next) => {
  try {
    const {email, password } = req.body;
    const existingUser = await authsService.existEmailUser(email);
    if(!existingUser) {
      const error = new Error('email doesnt exists');
      error.status = 404;
      throw error;
    }
    const match = await security.comparePassword(password, existingUser.password);

    if(match) {
      const { _id, username, email, password, roleId } = existingUser;
      const user = {_id, username, email, password, roleId};
      
      const token = security.generateToken(existingUser);
      res.status(200).json({
        accessToken: token,
        user
      });
    } else {
      const error = new Error('Invalid password or user');
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const logout = async () => {

};

module.exports = {
    register,
    login,
    logout
};