const PetDetails = require("../model/PetDetailsModel.js");

const addPet = async (req, res, next) => {
  try {
    const { name, description, type, price, stock } = req.body;

    if (!name || !description || !type || !price || !stock) {
      return res.this.status(400).json({
        error: "All feild  & Try Again ",
      });
    }

    const newPetDetails = new PetDetails({
      name,
      description,
      type,
      price,
      stock,
    });

    await newPetDetails.save();

    res.status(200).json({
      message: "Saved ",
    });
  } catch (error) {
    res.status(500).json({
      error: "error not saved ",
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


exports.addPet = addPet;
exports.updatePet = updatePet;
exports.deletePet = deletePet;
exports.getPets =  getPets ; 
