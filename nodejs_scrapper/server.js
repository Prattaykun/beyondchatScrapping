require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(express.json());
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
