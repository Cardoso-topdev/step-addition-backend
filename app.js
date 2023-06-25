require('dotenv').config();
const express = require('express');
const db = require("./models");
const cors = require("cors");

const app = express();
const port = 3001;

var corsOptions = {
  origin: "http://localhost:3000"
};
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/entries.routes")(app);

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});