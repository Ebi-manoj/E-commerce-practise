import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';
import { validateId } from '../utilitis/validate-id.js';

/////////////////////////////////////////////////////////////////////
/////////CREATE A PRODUCT

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////////
//////////GET A PRODUCT

export const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////
/////////GET ALL PRODUCTS

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////
/////UPDATE A PRODUCT

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'product not found' });

    Object.assign(product, req.body);

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////
///////DELETE A PRODUCT

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json({ message: 'user Deleted', User: deleteProduct });
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////////////////////////////////////////
////////////FILTERING AND QUERYING

export const filterDocuments = asyncHandler(async (req, res) => {
  console.log(req.query);

  try {
    const {
      title,
      priceMax,
      priceMin,
      category,
      brand,
      color,
      page = 1,
      limit = 3,
      sort = '-createdAt',
    } = req.query;
    const match = {
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(category && { category }),
      ...(brand && { brand }),
      ...(color && { color }),
      ...(priceMax || priceMin
        ? {
            price: {
              ...(priceMax && { $lte: Number(priceMax) }),
              ...(priceMin && { $gte: Number(priceMin) }),
            },
          }
        : {}),
    };

    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortField = sort.replace('-', '');
    const skip = (page - 1) * limit;

    const pipiline = [
      { $match: match },
      { $sort: { [sortField]: sortOrder } },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $project: {
          title: 1,
          slug: 1,
          description: 1,
          price: 1,
          category: 1,
          brand: 1,
          color: 1,
        },
      },
    ];

    const products = await Product.aggregate(pipiline);
    const totalCount = await Product.countDocuments(match);

    res.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////////////////
//////////////////ADD RATINGS TO THE PRODUCT

export const addRatings = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;
  const { star, comment } = req.body;
  validateId(productId);

  try {
    const product = await Product.findById(productId);
    ////check already rated or not
    const alreadyRated = product.ratings.find(
      rating => rating.postedby.toString() === userId.toString()
    );
    if (alreadyRated) {
      alreadyRated.star = star;
      alreadyRated.comment = comment;
    } else {
      product.ratings.push({ star, comment, postedby: userId });
    }

    // update total ratings
    const totalStars = product.ratings.reduce(
      (acc, curr) => acc + curr.star,
      0
    );
    const totalratings = product.ratings.length;
    product.totalRatings = Number(totalStars / totalratings).toFixed(2);

    await product.save();
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

/////////////////////////////////////////////////////
///////////UPLOAD IMAGES

export const uploadProductImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const findProduct = await Product.findById(id);
    findProduct.images.push(req.body.images);
    await findProduct.save();
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
