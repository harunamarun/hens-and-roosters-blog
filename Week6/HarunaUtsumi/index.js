const express = require("express");
const app = express();
const morgan = require("morgan");

const config = require("./config");
const bodyParser = require("body-parser");

const knex = require("knex")(config.db);
const models = require("./models")(knex);
const apiRouter = require("./controllers")(models);

// /**
//  ********************************SERVER SETUP********************************
//  ****************************************************************************
//  */
app.use(morgan("dev"));

app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  next();
});

app.use("/api", apiRouter);

app.use((err, req, res) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }
  console.log("err", err);
  return res.status(500).send("Internal Error.");
});

// /**
//  ********************************START SERVER********************************
//  ****************************************************************************
//  */

app.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
