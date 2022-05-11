const url = require("url");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
    });
    const extensionname = "/" + params.get("extension")
    params.delete("extension")
    params.append(API_KEY_NAME, API_KEY)

    console.log(params)

    await axios.get(`${API_BASE_URL + extensionname}?${params}`).then((response) => {
      res.json(response.data)
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
