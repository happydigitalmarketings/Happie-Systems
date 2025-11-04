import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: {
      type: String,
      enum: ["Dell", "HP", "Lenovo"],
      required: [true, "brand is required"],
    },
    price: { type: Number, required: true },
    onlinePrice: { type: Number, required: true },
    dealerPrice: { type: Number, required: true },
    imageFile: { type: String, required: true },
    paymentMode: {
      type: String,
      enum: ["EMI", "COD", "PAID"],
      required: [true, "Payment mode is required"],
    },
    dealerName: {
      type: String,
      enum: ["Prime Computers", "JP Computers", "FlipCart Computers", "AK Infotech"],
      required: [true, "Dealer name is required"],
    },
    availableStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ IMPORTANT FIX FOR VERCEL + HOT RELOAD
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;