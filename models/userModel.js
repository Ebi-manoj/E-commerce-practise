import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: {
      type: Array,
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    address: [{ type: ObjectId, ref: 'Address' }],
    wishlist: [{ type: ObjectId, ref: 'Wishlist' }],
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
