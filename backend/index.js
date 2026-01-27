const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pet_health", {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema
const petSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    age: Number,
    weight: Number,
    vaccinations: [
      {
        name: String,
        date: Date
      }
    ]
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Pet Health Tracker Backend is running");
});

// ✅ GET ALL PETS
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD NEW PET
app.post("/pets", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE PET
app.delete("/pets/:id", async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
