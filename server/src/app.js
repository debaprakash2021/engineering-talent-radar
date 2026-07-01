const express = require("express");
const cors = require("cors");

const jobRoutes = require("./api/routes/job.routes");

const app = express();

/* -----------------------------
   Global Middlewares
------------------------------ */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* -----------------------------
   Health Check Route
------------------------------ */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Engineering Talent Radar API is running",
  });
});

/* -----------------------------
   API Routes
------------------------------ */

app.use("/api/jobs", jobRoutes);

/* -----------------------------
   404 Handler
------------------------------ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -----------------------------
   Global Error Handler
------------------------------ */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;