import { Schema, Document, model, models } from "mongoose";

export interface ITransaction extends Document {
    userId: Schema.Types.ObjectId;
    categoryId: Schema.Types.ObjectId;
    amount: number;
    note?: string;
    date: Date;
    type: 'income' | 'expense';
    createdAt: Date;
    updatedAt?: Date;
  }
  
  const TransactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    amount: Number,
    note: String,
    date: { type: Date, default: () => new Date() },
    type: { type: String, enum: ['income', 'expense'], required: true },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: Date
  }, { timestamps: false });
  
  const Transaction = models.Transaction || model('Transaction', TransactionSchema);
  export default Transaction;
  