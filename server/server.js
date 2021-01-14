const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cors = require('cors')  

const app = express();

app.use(cors()) //and this

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "player_db",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.post("/insert-player", (req, res) => {

  connection.query(
    `INSERT INTO players(player_name,matches,innings,highest_score,strike_rate) VALUES ('${req.body.player_name}',${req.body.matches},${req.body.innings},${req.body.highest_score},${req.body.strike_rate})`,
    (error, results, fields) => {
      if (error) {
        return res.send("Player record not added.");
      }
      res.send("Player record added.");
    }
  );
});


app.listen(5000);
