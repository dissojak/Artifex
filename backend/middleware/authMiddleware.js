
const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const JWT_SECRET="abc123";

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-pw');
      // console.log("this is protection: ",req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
