import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { cloudinaryUpload } from '../utilitis/cloudinary.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.jpeg');
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'unsupported file format',
      },
      false
    );
  }
};

export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

export const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];

  try {
    await Promise.all(
      req.files.map(async file => {
        const processedFile = `public/images/products/${file.filename}`;

        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(processedFile);

        try {
          const result = await cloudinaryUpload(processedFile, 'products');
          req.body.images.push(result.url);
        } catch (cloudinaryError) {
          throw cloudinaryError;
        }

        try {
          await fs.unlink(file.path);
          await fs.unlink(processedFile);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      })
    );

    next();
  } catch (error) {
    throw new Error(error);
  }
};
export const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  try {
    await Promise.all(
      req.files.map(async file => {
        const processedFile = `public/images/blogs/${file.filename}`;
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(processedFile);
        const result = await cloudinaryUpload(processedFile, 'blogs');
        req.body.images.push(result.url);
        await fs.unlink(file.path);
        await fs.unlink(processedFile);
      })
    );
    next();
  } catch (error) {
    throw new Error(error);
  }
};
