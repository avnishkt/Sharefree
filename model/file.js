const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uuid: { type: String, required: true },
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // Assuming 'Person' is the name of the 'person' model
    required: false,
},
  sender: { type: String, required: false },
  receiver: {
    type:String,
    required:false
  },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
