const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routers/AuthRoutes.js");
const userRoutes = require("./routers/UserRouters.js");
const petTypeRouters   =  require('./routers/PetTypeRouters.js');
const PetDetailsRouters  =  require('./routers/PetDetislRouters.js');
const VlogRouters  =  require('./routers/VlogRouters.js');

dotenv.config();

const index  =  express();
const port = process.env.PORT;
const host = process.env.HOST;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
index.use(cors(corsOptions));
index.use(express.json());

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

index.use("/api/auth", authRoutes);
index.use("/api/user", userRoutes);
index.use("/api/pet" , petTypeRouters);
index.use('/api/pets' , PetDetailsRouters); 
index.use('/api/vlog' , VlogRouters);


connectDB().then(() => {
  index.listen(port, host, () => {
    console.log(` Server running at http://${host}:${port}`);
  });
});
