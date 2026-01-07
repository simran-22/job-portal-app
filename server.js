
require("dotenv").config();

const express = require("express");
const User = require('./models/user');
console.log(User)
require("dotenv").config();
const connectDB = require("./db");

connectDB();


const app = express();
//Middleware
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

// use routes
app.use("/app", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// post route
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Data recieved succesfully",
    data: req.body,
  });
});

app.listen(3000, () => {
  console.log("Hello window");
});
