const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api/routes");
const port = 3001;

// Parse incoming request bodies
app.use(bodyParser.json());

// Enable cross-origin resource sharing
app.use(cors());

// Initialize routes
app.use("/", routes);

app.listen(port, function () {
  console.log(`App listening on port ${port}.`);
});