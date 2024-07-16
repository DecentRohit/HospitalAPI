import mongoose from "mongoose";
export const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Adjust the regex based on your phone number format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  report: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    default: []
  }]
}, { timestamps: true });

//Patient is name of collection and telling that its for patientSchema
export const patientModel = mongoose.model('Patient', patientSchema);