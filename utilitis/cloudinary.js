import cloudinary from 'cloudinary';
import { configDotenv } from 'dotenv';

configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const cloudinaryUpload = async file => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto', // Automatically detect file type (image, video, etc.)
    });
    return { url: result.secure_url }; // Return the secure URL after uploading
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message); // Throw the error for proper handling
  }
};
