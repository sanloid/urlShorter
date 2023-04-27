const express = require("express");
const path = require("path");
const { Client } = require("pg");
const shortid = require("shortid");
require("dotenv").config();

const client = new Client({
  host: "rogue.db.elephantsql.com",
  port: 5432,
  user: "aafaivmv",
  password: "ze0lW7JsJtJ-h0oYxwx2_fjyHcUbQ3dP",
  database: "aafaivmv",
});

client.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/links", (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  client.query(
    "INSERT INTO links (original_url, short_url) VALUES ($1, $2)",
    [originalUrl, shortUrl],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ shortUrl });
      }
    }
  );
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;

  client.query(
    "SELECT original_url FROM links WHERE short_url = $1",
    [shortUrl],
    (err, result) => {
      if (err || !result.rows.length) {
        res.sendFile(path.join(__dirname, "public", "404.html"));
      } else {
        res.redirect(result.rows[0].original_url);
      }
    }
  );
});

app.listen(3000, () => console.log("Server started on port 3000"));
