import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import articleRoutes from "./routes/articles.routes.js";
import formattedRoutes from "./routes/formattedArticles.routes.js";

dotenv.config();
const app = express();
const allowedOrigins = [
  "https://beyondchat-scrapping.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/formatted-articles", formattedRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log("Server running on", process.env.PORT)
  );
});
