const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routers/AuthRoutes.js");
const userRoutes = require("./routers/UserRouters.js");

dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

connectDB().then(() => {
  app.listen(port, host, () => {
    console.log(` Server running at http://${host}:${port}`);
  });
});
