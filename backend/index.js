import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
});

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false; // <-- IMPORTANT: prevents repeated DB connections on Vercel

// ✅ Connect MongoDB Function
async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
}

// ✅ Test Route
app.get("/", async (req, res) => {
  await connectDB();
  res.send("Welcome to Listing Product Backend ✅");
});

// ✅ Product Route
app.get("/api/products", async (req, res) => {
  try {
    await connectDB(); // ✅ ensures DB is connected before querying

    const products = await Product.find();

  
    console.log("products:", products);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;