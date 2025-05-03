import { Schema, Document, model, models } from "mongoose";

export interface ITransfer extends Document {
    userId: Schema.Types.ObjectId;
    fromAccountId: Schema.Types.ObjectId;
    toAccountId: Schema.Types.ObjectId;
    amount: number;
    note?: string;
    date: Date;
    createdAt: Date;
  }
  
  const TransferSchema = new Schema<ITransfer>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fromAccountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    toAccountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    amount: Number,
    note: String,
    date: { type: Date, default: () => new Date() },
    createdAt: { type: Date, default: () => new Date() }
  }, { timestamps: false });
  
  const Transfer = models.Transfer || model('Transfer', TransferSchema);
  export default Transfer;
  