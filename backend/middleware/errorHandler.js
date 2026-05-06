const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    error.statusCode = 400;
    error.message = "Invalid ID format";
  }

  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
