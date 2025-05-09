const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const vlogSchema = new Schema({
  vlogId: { type: Number },
  desc: { type: String, required: true },
  VlogerName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  img: {
    data: Buffer,
    contentType: String,
  },
});

vlogSchema.plugin(AutoIncrement, { inc_field: "vlogId" });

const Vlog = mongoose.model("Vlog", vlogSchema);

module.exports = Vlog;
