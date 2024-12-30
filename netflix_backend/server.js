const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/netflix")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err);
  });

app.use("/api/user",userRoutes);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
