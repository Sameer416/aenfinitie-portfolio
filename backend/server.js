const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace <db_password> with your actual password
const mongoUri = 'mongodb+srv://root:root@cluster0.ljr0sfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Portfolio schema
const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  gradient: String,
  icon: String,
  tags: [{ text: String, color: String }]
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioSchema);

// GET all portfolio items
app.get('/api/portfolio', async (req, res) => {
  const items = await PortfolioItem.find();
  res.json(items);
});

// GET single portfolio item by id (for project.html)
app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// (Optional) POST new portfolio item
app.post('/api/portfolio', async (req, res) => {
  const item = new PortfolioItem(req.body);
  await item.save();
  res.json(item);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));