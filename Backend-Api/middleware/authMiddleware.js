const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'my_jwt_secret';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //The token is extracted from the Authorization header by splitting the string at the space,
      // and grabbing the second part (the actual token).


      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);      
      //If the token is valid, it returns the decoded payload, 
      //which typically includes the userId and any other data embedded in the token during signing.

      // Find the user by ID and attach it to the request object
      req.user = await User.findById(decoded.userId).select('-password');
      next();
      
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
