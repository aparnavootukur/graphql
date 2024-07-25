const { User } = require('../models');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const authresolvers = {
  Mutation: {
    signUp: async (_, { email, password ,mobile,name}) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) throw new Error('User already exists');
      
      const hashedPassword = await hashPassword(password);
      const user = await User.create({ email, password: hashedPassword,mobile:mobile,name:name });
      const token = generateToken(user);

      return { token, email};
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new AuthenticationError('Invalid email or password');
      
      const valid = await comparePassword(password, user.password);
      if (!valid) throw new AuthenticationError('Invalid email or password');
      
      const token = generateToken(user);
      return { token, email};
    }
  }
};

module.exports = authresolvers;
