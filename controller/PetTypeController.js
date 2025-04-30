const { json } = require("express");
const PetType = require("../model/PetNameType.js");

const addPetType = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Name field Not & Trg again ",
      });
    }

    const exitinPetType = await PetType.findOne({
      $or: [{ name }],
    });

    if (exitinPetType) {
      return res.status(400).json({
        error: "name is alredy in use ",
      });
    }

    const newPetType = new PetType({ name });
    await newPetType.save();

    res.status(201).json({
      message: "Pet Type is Saved ",
      petType: newPetType,
    });
  } catch (error) {
    res.status(500).json({
      error: "pet is not saved & Try Again ",
    });
  }
};

const updatePetType = async (req, res, next) => {
  try {
    const { petTypeId, name } = req.body;

    // Validate inputs
    if (!petTypeId) {
      return res.status(400).json({
        error: "Pet Type ID is required",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "Valid name is required",
      });
    }

    // Check if another PetType with the same name already exists
    const existingPetType = await PetType.findOne({
      name: name,
      petTypeId: { $ne: petTypeId },
    });

    if (existingPetType) {
      return res.status(400).json({
        error: "Name is already in use",
      });
    }

    // Update the PetType
    const result = await PetType.updateOne(
      { petTypeId: petTypeId },
      { $set: { name: name } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Pet Type not found",
      });
    }

    res.status(200).json({
      message: "Pet Type updated successfully",
    });
  } catch (error) {
    console.error("Update PetType Error:", error);
    res.status(500).json({
      error: "Server error while updating Pet Type",
    });
  }
};


const deletePetType = async (req, res, next) => {
  try {
    const { petTypeId } = req.body;

    // Validate input
    if (!petTypeId) {
      return res.status(400).json({
        error: "Pet Type ID is required",
      });
    }

    const result = await PetType.deleteOne({ petTypeId: petTypeId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Pet Type not found",
      });
    }

    res.status(200).json({
      message: "Pet Type deleted successfully",
    });

  } catch (error) {
    console.error("Delete PetType Error:", error);
    res.status(500).json({
      error: "Server error while deleting Pet Type",
    });
  }
};


const getPetType  =  async (req , res , next ) =>{
  try{
    const petTypes   = await PetType.find();

    res.status(200).json({
      message : "Pet tpyes  retrieved successfully " , 
      petTypes : petTypes  , 
    });

  }catch(error){
    res.status(500).json({
      error : "error "
    });

  }

};



exports.addPetType = addPetType;
exports.updatePetType = updatePetType;
exports.deletePetType =  deletePetType ; 
exports.getPetType =  getPetType  ; 
