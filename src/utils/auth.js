const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Hash Password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare Passwords
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword };
