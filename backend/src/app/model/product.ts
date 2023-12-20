import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    gtin: { type: Number, required: true, index: true },
    name: { type: String, required: true, index: true },
    image: { type: String },
    brandName: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true, index: true },
    price: { type: Number, required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("products", ProductSchema);
