require("dotenv").config();

const express = require("express");
const connectDB = require("./db");

// connect DB
connectDB();

const app = express(); // ✅ app sabse pehle initialize

// middleware
app.use(express.json());


// routes
const authRoutes = require("./routes/authRoutes");
const jobRoute = require("./routes/jobRoute");

app.use("/app", authRoutes);
app.use("/app/jobs", jobRoute);



// test routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Data received successfully",
    data: req.body,
  });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
