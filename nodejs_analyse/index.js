import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import articleRoutes from "./routes/articles.routes.js";
import formattedRoutes from "./routes/formattedArticles.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/formatted-articles", formattedRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log("Server running on", process.env.PORT)
  );
});
