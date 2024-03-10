import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_CLIENT ? process.env.MONGO_CLIENT : "",
    );

    console.log("mongoDb connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
