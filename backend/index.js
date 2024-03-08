// Import the Express application
const app = require("./app");

// Node.js core module to create an HTTP server
const http = require("http");

// Configuration settings, including the server port
const config = require("./utils/config");

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Start the server listening on the specified port
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});