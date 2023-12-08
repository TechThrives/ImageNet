import mongoose from "mongoose";

export default async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connection true");
  } catch (err) {
    console.log(err);
  }
}
