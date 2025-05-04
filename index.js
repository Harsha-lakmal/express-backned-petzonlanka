const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passport/passport-config"); // Adjust path as needed

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Session Setup (must come before passport.session)
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI); // Clean, no deprecated options
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Routes
const authRoutes = require("./routers/AuthRoutes");
const userRoutes = require("./routers/UserRouters");
const petTypeRouters = require("./routers/PetTypeRouters");
const petDetailsRouters = require("./routers/PetDetislRouters");
const vlogRouters = require("./routers/VlogRouters");
const passportRouters = require("./routers/PassportRouters");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pet", petTypeRouters);
app.use("/api/pets", petDetailsRouters);
app.use("/api/vlog", vlogRouters);
app.use("/api/passport", passportRouters);

// Start Server
connectDB().then(() => {
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
});
