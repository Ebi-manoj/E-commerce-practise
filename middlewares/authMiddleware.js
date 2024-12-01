import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    } catch (error) {
      throw new Error('Authorizations expires');
    }
  } else {
    throw new Error('there is no token attached');
  }
});
