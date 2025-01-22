const express = require("express");
const NodeCache = require("node-cache");
const axios = require("axios");

const app = express();
const cache = new NodeCache({ stdTTL: 60 }); // Cache expires in 60 seconds

app.get("/*", async (req, res) => {
  const cacheKey = req.url; // Use the request URL as cache key
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Cache hit");
    return res.send(cachedData); // Send cached response and exit
  }

  console.log("Cache miss");

  try {
    // Fetch from origin server
    const originUrl = `http://localhost:4000${req.url}`;
    const response = await axios.get(originUrl, { responseType: "arraybuffer" });
    const data = response.data;

    // Cache the response
    cache.set(cacheKey, data);

    // Set the content type and send the response
    res.set("Content-Type", response.headers["content-type"]);
    return res.send(data);
  } catch (error) {
    console.error("Error fetching from origin:", error.message);

    // Send an error response if something goes wrong
    if (!res.headersSent) {
      res.status(500).send("Error fetching from origin server.");
    }
  }
});

app.listen(3000, () => {
  console.log("CDN Edge server running on http://localhost:3000");
});