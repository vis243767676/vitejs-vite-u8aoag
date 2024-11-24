import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cartItems: [{
    id: Number,
    title: String,
    section: String,
    quantity: Number
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export const LeadModel = mongoose.model('Lead', leadSchema);