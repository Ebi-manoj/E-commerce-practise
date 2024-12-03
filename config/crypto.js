import crypto from 'crypto';

export const genrateResetToken = function () {
  return crypto.randomBytes(32).toString('hex');
};
