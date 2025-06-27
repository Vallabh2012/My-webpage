const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

mongoose.connect("mongodb+srv://Vallabh2012:Vallabh1205@rayewar.uthjkln.mongodb.net/rayewar?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String
});
const User = mongoose.model("User", UserSchema);

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;
  const user = new User({ username, email, password, phone });
  await user.save();
  res.json({ message: "Signup successful!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ message: "Login successful!" });
  } else {
    res.json({ message: "Wrong username or password" });
  }
});

app.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));


