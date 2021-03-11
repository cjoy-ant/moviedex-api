require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = 8000;
const movies = require("./movies-data-small.json");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

app.get("/movie", handleGetMovie);

function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  // next();
}

function handleGetMovie(req, res) {
  const { genre, country, avg_vote } = req.query;
}

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
