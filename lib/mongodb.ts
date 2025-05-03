import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    // 1 = connected
    return mongoose;
  }

  return mongoose.connect(MONGODB_URI!, {
    bufferCommands: false,
  });
}
