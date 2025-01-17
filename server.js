const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const submissionRoutes = require("./routes/submissions");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/user-submissions",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Routes
app.use("/api/submissions", submissionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
