import { generateRefreshToken, generateToken } from '../config/jwt.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utilitis/validate-id.js';
import jwt from 'jsonwebtoken';

//////////////////////////////////////////////
// create User
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

////////////////////////////////////////////
///Login user

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // checking user exists
  const findUser = await User.findOne({ email });
  console.log(await findUser.isPasswordMatched(password));

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    findUser.refreshToken = refreshToken;
    await findUser.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
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

////////////////////////////////////////////////
// Get all users

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

/////////////////////////////////////////////////////////////
// Get single User

export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateId(id);

  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});
////////////////////////////////////////////////////////
// Update a user

export const updateuser = asyncHandler(async (req, res) => {
  console.log(req.user);

  const { id } = req.user;
  validateId(id);

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

////////////////////////////////////////////////////////
// Delete a User

export const delteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);

  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.json(deleteuser);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////
// Block and unblock User

export const blockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);

    const blockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({ message: 'User Blocked', user: blockUser });
  } catch (error) {
    throw new Error(error);
  }
});

export const unBlockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);
    const unBlockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({ message: 'User Unblocked', user: unBlockUser });
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////Refresh Token Handler/////////////////////////////////////////////////

export const handlerefreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new Error('No referesh token attached');
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRETKEY);
    const user = await User.findById(decoded?.id);
    if (!user || user.refreshToken !== refreshToken)
      throw new Error('Invalid refersh Token');
    const accessToken = generateToken(user._id);
    res.json({ token: accessToken });
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////
///Logout Functionality

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', { httpOnly: true });
  res.status(200).json({ message: 'Logout succesfully' });
});
