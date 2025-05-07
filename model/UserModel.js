const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  { timestamps: true }
);

    
const User = mongoose.model("User", userSchema);
module.exports = User;
