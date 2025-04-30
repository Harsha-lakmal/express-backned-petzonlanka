const User = require("../model/UserModel.js");

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
      return res.status(400).json({ error: "All fields (name, email, password, role) are required" });
    }

    const existingUser = await User.findOne({ 
      $or: [{ email }, { name }] 
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: existingUser.email === email 
          ? "Email already in use" 
          : "Name already in use" 
      });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
};


 
const updateUser = async (req, res, next) => {
  try {
    const { id, name, email, password, role } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const existingUser = await User.findOne({
      $and: [
        { $or: [{ email }, { name }] }, 
        { id: { $ne: id } }
      ]
    });

    if (existingUser) {
      return res.status(409).json({
        error: existingUser.email === email
          ? "Email already in use"
          : "Name already in use"
      });
    }

    const result = await User.updateOne(
      { id: id },
      { $set: { name, email, password, role } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user" });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await User.deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.addUser = addUser;
