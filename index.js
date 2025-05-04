const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passport/passport-config"); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

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

connectDB().then(() => {
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
});
