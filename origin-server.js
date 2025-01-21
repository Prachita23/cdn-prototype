const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "static")));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Origin server running on port ${PORT}`);
});