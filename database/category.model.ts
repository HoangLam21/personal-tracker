import { Schema, Document, model, models } from "mongoose";

export interface ICategory extends Document {
    userId: Schema.Types.ObjectId;
    name: string;
    type: 'income' | 'expense';
    icon?: string;
    color?: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  
  const CategorySchema = new Schema<ICategory>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    type: { type: String, enum: ['income', 'expense'], required: true },
    icon: String,
    color: String,
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: Date
  }, { timestamps: false });
  
  const Category = models.Category || model('Category', CategorySchema);
  export default Category;
  