import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DataBase connected`);
  } catch (error) {
    console.log(`Error Connecting Database`);
  }
};
export default connectDb;
