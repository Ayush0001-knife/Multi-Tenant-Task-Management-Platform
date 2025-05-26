const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config(); 

const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT;


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
