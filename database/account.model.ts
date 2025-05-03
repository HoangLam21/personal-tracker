import { Schema, Document, model, models } from "mongoose";

export interface IAccount extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt?: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    balance: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: Date,
  },
  { timestamps: false }
);

const Account = models.Account || model("Account", AccountSchema);
export default Account;
