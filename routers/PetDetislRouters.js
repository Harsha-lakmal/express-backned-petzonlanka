const express = require("express");
const verifyToken = require("../jwt-auth/Auth.js");
const controller = require("../controller/PetDeteilsController.js");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PetDetailsRouters = express.Router();

PetDetailsRouters.post("/createPet", verifyToken, controller.addPet);
PetDetailsRouters.put("/updatePet", verifyToken, controller.updatePet);
PetDetailsRouters.delete("/deletePet", verifyToken, controller.deletePet);
PetDetailsRouters.get("/getPets", verifyToken, controller.getPets);
PetDetailsRouters.post('/image/:petId', verifyToken, upload.single('image'), controller.uploadImage);
PetDetailsRouters.get('/image/:petId',verifyToken , controller.getImage);


module.exports = PetDetailsRouters;


