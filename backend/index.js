import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.development",
});

const app = express();

const allowedOrigins = [
  "https://www.happysystems.in",
  "https://happie-systems-server.vercel.app",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
     allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
     optionsSuccessStatus: 200 
  })
);



app.use(express.json());

// ✅ MongoDB Connect (run only once)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Listing Product Backend ✅");
});

// ✅ Product API Routes (Mongo is already connected above)
app.use("/api", productRoutes);
// ✅ Auth API Routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;