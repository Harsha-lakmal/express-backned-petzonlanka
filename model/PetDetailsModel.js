const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const petDetailsSchema = new Schema({
  petId: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String
  }
});

petDetailsSchema.plugin(AutoIncrement, { inc_field: 'petId' });

const PetDetails = mongoose.model('PetDetails', petDetailsSchema);

module.exports = PetDetails;
