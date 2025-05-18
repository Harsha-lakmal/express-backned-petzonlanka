const User = require("../model/UserModel.js");
const mongoose = require("mongoose");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving users",
    });
  }
};

const addUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({
          error: "All fields (name, email, password, role) are required",
        });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      return res.status(409).json({
        error:
          existingUser.email === email
            ? "Email already in use"
            : "Name already in use",
      });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, role } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const existingUser = await User.findOne({
      $and: [{ $or: [{ email }, { name }] }, { _id: { $ne: id } }],
    });

    if (existingUser) {
      return res.status(409).json({
        error:
          existingUser.email === email
            ? "Email already in use"
            : "Name already in use",
      });
    }

    const result = await User.updateOne(
      { _id: id },
      { $set: { name, email, password, role } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while updating the user: " + error.message,
      });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "An error occurred while deleting the user: " + err.message,
      });
  }
};




const uploadImageForProfile = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("user id:", id);

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    user.imgProfile = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await user.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Server error" });
  }
};



  
const getProfileImage = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await User.findById(id);

    if (!user || !user.imgProfile || !user.imgProfile.data) {
      return res.status(404).json({ error: "Profile image not found" });
    }

    res.set('Content-Type', user.imgProfile.contentType);
    return res.send(user.imgProfile.data);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const uploadImageForCover = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("User ID:", id);

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    user.imgCover = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await user.save();

    res.status(200).json({ message: "Cover image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading cover image:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getCoverImage = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await User.findById(id);

    if (!user || !user.imgCover || !user.imgCover.data) {
      return res.status(404).json({ error: "Cover image not found" });
    }

    res.set('Content-Type', user.imgCover.contentType);
    return res.send(user.imgCover.data);
  } catch (error) {
    console.error("Error fetching cover image:", error);
    res.status(500).json({ error: "Server error" });
  }
};





exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.addUser = addUser;
exports.uploadImageForProfile  =  uploadImageForProfile  ; 
exports.getProfileImage  =  getProfileImage ; 
exports.uploadImageForCover  =  uploadImageForCover ; 
exports.getCoverImage =  getCoverImage ; 
