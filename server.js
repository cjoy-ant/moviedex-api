require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = 8000;
const MOVIES = require("./movies-data-small.json");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

app.get("/movie", handleGetMovie);

function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }

  next();
}

function handleGetMovie(req, res) {
  const { genre, country, avg_vote } = req.query;
  let response = MOVIES;

  // search whether genre includes a specified string
  // case insensitive
  if (genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  // search whether country includes a specified string
  // case insensitive
  if (country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  // search for moves with avg_vote >= supplied number
  if (avg_vote) {
    response = response.filter(
      (movie) => Number(movie.avg_vote) >= Number(avg_vote)
    );
  }

  res.json(response);
}

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
