const PetDetails = require("../model/PetDetailsModel.js");
const multer = require("multer");

const addPet = async (req, res, next) => {
  try {
    const { name, description, type, price, stock } = req.body;

    if (!name || !description || !type || !price || !stock) {
      return res.status(400).json({
        error: "All fields are required. Please try again.",
      });
    }

    const newPetDetails = new PetDetails({
      name,
      description,
      type,
      price,
      stock,
    });

    const savedPet = await newPetDetails.save();

    res.status(200).json({
      message: "Pet saved successfully.",
      petId: savedPet.petId, // Return the generated petId
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred. Pet not saved.",
    });
  }
};


const updatePet = async (req, res, next) => {
  try {
    const { petId, name, description, type, price, stock } = req.body;

    if (!petId) {
      res.status(400).json({
        error: "Pet id is Found ",
      });
    }

    const result = await PetDetails.updateOne(
      { petId: petId },
      { $set: { name, description, type, price, stock } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Pet is not fonud",
      });
    }

    res.status(200).json({
      message: "Pet is update succesFully",
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
};

const deletePet = async (req, res, next) => {
  try {
    const { petId } = req.body;

    if (!petId) {
      return res.status(400).json({
        error: "Pet id  is  required",
      });
    }

    const result = await PetDetails.deleteOne({ petId: petId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Pet is not found ",
      });
    }

    res.status(200).json({
      message: "Pet delete succesFully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Not delete Pet & Try Again ",
    });
  }
};

const getPets = async (req, res, next) => {
  try {
    const pets = await PetDetails.find();

    res.status(200).json({
      message: "Pets retrieved successfully",
      pets: pets,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving pets",
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const petId = req.params.petId;
    console.log("pet id:", petId);

    if (!petId) {
      return res.status(400).json({ error: "Pet ID is required" });
    }

    const pet = await PetDetails.findOne({ petId: Number(petId) });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    pet.img = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await pet.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getImage = async (req, res) => {
  try {
    const petId = req.params.petId;
    console.log("Fetching image for pet id:", petId);

    if (!petId) {
      return res.status(400).json({ error: "Pet ID is required" });
    }

    const pet = await PetDetails.findOne({ petId: Number(petId) });

    if (!pet || !pet.img || !pet.img.data) {
      return res.status(404).json({ error: "Image not found for this pet" });
    }

    res.set("Content-Type", pet.img.contentType);
    res.send(pet.img.data);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addPet = addPet;
exports.updatePet = updatePet;
exports.deletePet = deletePet;
exports.getPets = getPets;
exports.uploadImage = uploadImage;
exports.getImage  =  getImage ; 
