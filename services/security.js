require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  const userForToken = {
    id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    roleId: user.roleId
  };

  const token = jwt.sign(userForToken, process.env.SECRET_TOKEN, {
    expiresIn: '10h'
  });
  return token;   
}

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
  if(!decodedToken) {
    const error = new Error('Invalid token');
    error.status = 401;
    throw error;
  }
  return decodedToken;
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);
  return result;
};

const comparePassword = async (password, receivedPassword) => {
  const result = await bcrypt.compare(password, receivedPassword);
  return result;
}


module.exports = { 
  generateToken, 
  verifyToken,
  encryptPassword,
  comparePassword 
};