import { Coupon } from '../models/couponModel.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utilitis/validate-id.js';

/////////////////////////////////////////////////////
///////////CREATE COUPON

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const created = await Coupon.create(req.body);
    res.json(created);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////
///////UPDATE COUPON

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const updatedcoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
///////////////////////////////////////////////////////
///////GET A COUPON
export const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const findCoupon = await Coupon.findById(id);
    res.json(findCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////////////////////////
///////////GET ALL COUPONS

export const getCoupons = asyncHandler(async (req, res) => {
  try {
    const findCoupons = await Coupon.find();
    res.json(findCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////
///////DELETE COUPON

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deleted = await Coupon.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    throw new Error(error);
  }
});
