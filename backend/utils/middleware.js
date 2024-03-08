// Logs the request method and path along with the current timestamp for monitoring and debugging.
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

// Handles requests to unknown routes by sending a 404 response with a custom error message.
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Centralizes error handling, capturing various errors and sending corresponding HTTP responses.
// It specifically handles 'CastError' and 'ValidationError' with custom messages.
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "internal server error" });
  }

  next(error);
};

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
};