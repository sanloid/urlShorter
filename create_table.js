const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: "rogue.db.elephantsql.com",
  port: 5432,
  user: "aafaivmv",
  password: "ze0lW7JsJtJ-h0oYxwx2_fjyHcUbQ3dP",
  database: "aafaivmv",
});

pool.connect((err, client, done) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query(
    "CREATE TABLE IF NOT EXISTS links (id SERIAL PRIMARY KEY, original_url TEXT NOT NULL, short_url TEXT NOT NULL UNIQUE)",
    (err, result) => {
      done();
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      console.log("Table links successfully created");
    }
  );
});
