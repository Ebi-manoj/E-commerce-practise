import cloudinary from 'cloudinary';
import { configDotenv } from 'dotenv';

configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUpload = async file => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        resolve({ url: result.secure_url });
      }
    );
  });
};
