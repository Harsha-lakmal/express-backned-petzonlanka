const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = mongoose.Schema;

const petTypeSchema = new schema({
  petTypeId: { type: Number },
  name: { type: String, required: true, unique: true }
});

// Avoid conflict by using a different field name
petTypeSchema.plugin(AutoIncrement, { inc_field: 'petTypeId' });

const PetType = mongoose.model('PetType', petTypeSchema);
module.exports = PetType;
