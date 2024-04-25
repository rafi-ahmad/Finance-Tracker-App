// config.js
require("dotenv")

module.exports = {
  port: process.env.PORT || 5000, // Port for the server
  secret: process.env.API_KEY, // Secret key for JWT
  mongoURI: process.env.ATLAS_URI, // MongoDB connection URI
};
