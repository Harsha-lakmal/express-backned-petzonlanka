const express = require("express");
const verifyToken = require("../jwt-auth/Auth.js");
const controller = require("../controller/PetDeteilsController.js");
const PetDetailsRouters = express.Router();

PetDetailsRouters.post("/createPet", verifyToken, controller.addPet);
PetDetailsRouters.put("/updatePet", verifyToken, controller.updatePet);
PetDetailsRouters.delete("/deletePet", verifyToken, controller.deletePet);
PetDetailsRouters.get("/getPets", verifyToken, controller.getPets);


module.exports = PetDetailsRouters;
