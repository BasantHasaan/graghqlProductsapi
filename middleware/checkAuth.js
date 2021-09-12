/* eslint-disable no-return-assign */
const jwt = require('jsonwebtoken');

// const config = process.env;

module.exports = (req) => {
  const authorize = req.req.headers.authorization;
  if (!authorize) {
    return (!req.isAuth);
  }
  const token = authorize.split(' ')[1];
  if (!token) {
    return req.isAuth = false;
  }
  try {
    const decoded = jwt.verify(token, 'myToken');
    return (req.isAuth = true,
    req.userId = decoded.userId);
  } catch (err) {
    return req.isAuth = false;
  }
};
