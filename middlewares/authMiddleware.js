import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/////////////////////////////////////////////////////////////
//Basic Auth
export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req?.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No Token Attached' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await User.findById(decoded?.id).select('-password');
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authorization token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
});

////////////////////////////////////////////////////////////
///Admin Auth

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    throw new Error('You are not Admin');
  }
});
