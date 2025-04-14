import mongoose from 'mongoose';

const connectDB = async () => {
  let MONGO_URI;

  if (process.env.MONGO_URI && process.env.MONGO_DB_NAME) {
    MONGO_URI = process.env.MONGO_URI;
  } else if (
    process.env.USER_NAME &&
    process.env.USER_PWD &&
    process.env.DB_URL
  ) {
    MONGO_URI = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`;
  } else {
    throw new Error('Provide MongoDB connection information.');
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB: ${MONGO_URI}`);
  } catch (error) {
    console.error('Failed to connect MongoDB:', error);
  }
};

export default connectDB;
