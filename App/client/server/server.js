const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const addRoute = require("./add");
const removeRoute = require("./remove");
const updateRoute = require("./update");
const readRoute = require("./read");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(addRoute);
app.use(removeRoute);
app.use(updateRoute);
app.use(readRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
