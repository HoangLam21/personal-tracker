import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  passwordHash?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, sparse: true },
    phoneNumber: { type: String, required: true, unique: true, sparse: true },
    passwordHash: { type: String },
    avatar: { type: String, required: false },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date }
  },
  { timestamps: false }
);

const User = models.User || model("User", UserSchema);
export default User;
