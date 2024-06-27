import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
  console.log('Received Token:', token); // Log token to verify

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, 'abhishek', (err, user) => {
    if (err) {
      console.error('Token Verification Error:', err); // Log error for debugging
      return next(errorHandler(403, 'Forbidden'));
    }
    req.user = user;
    next();
  });
};
