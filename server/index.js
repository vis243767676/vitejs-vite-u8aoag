import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { LeadModel } from './models/lead.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new LeadModel(req.body);
    await lead.save();
    res.status(201).json({ message: 'Lead saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving lead' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});