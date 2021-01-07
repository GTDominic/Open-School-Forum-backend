const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rankinit = require("./app/controllers/rank.controller");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  rankinit.initialize();
}).catch(() => {
  console.log("Couldn't connect to the database.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Open-School-Forum backend working!" });
});

//Use routes
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});