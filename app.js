const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: true }));
app.use(cookieParser());

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("connected");
    console.log(`Connected to PORT: ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 5 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use("/api/", authRoutes);
