import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// --- FIX 1: CORS MUST COME BEFORE ANYTHING ELSE ---
app.use(cors({
  origin: "https://e-commerce-web-app-frontend-six.vercel.app",   // <-- FIXED
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Auth"],
  credentials: true
}));

// Preflight
app.options("*", cors());

// --- FIX 2: Correct JSON parser ---
app.use(express.json());


// home testing route
app.get("/", (req, res) => res.json({ messge: "This is home route" }));

// Routers
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", paymentRouter);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "MERN_E_Commerce" })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 1000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
