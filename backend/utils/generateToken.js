const jwt = require('jsonwebtoken');

const JWT_SECRET="abc123";
const NODE_ENV="development";
exports.generateToken = (res, userId) => {
  const token = jwt.sign({ userId },JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
