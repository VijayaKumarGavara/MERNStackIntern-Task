const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorHandler);

module.exports = app;
