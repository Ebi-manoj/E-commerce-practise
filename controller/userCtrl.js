import { generateToken } from '../config/jwt.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // create User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // user Already exist
    throw new Error('User Already Exist');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // checking user exists
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error('Invalid credintials');
  }
});

// Get all users

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get single User

export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});
// Update a user

export const updateuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete a User

export const delteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.json(deleteuser);
  } catch (error) {
    throw new Error(error);
  }
});
