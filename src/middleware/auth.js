const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || '';
 
  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }
  next();
};

module.exports = authenticate;
