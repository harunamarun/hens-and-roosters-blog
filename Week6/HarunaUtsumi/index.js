
const express = require('express')
const app = express()
const morgan = require("morgan");

const config = require("./config");
const bodyParser = require("body-parser");

const apiRouter = require("./controllers")();


// /**
//  ********************************SERVER SETUP********************************
//  ****************************************************************************
//  */
app.use(morgan("dev"));

app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }
  return res.status(500).send("Internal Error.");
});

// /**
//  ********************************START SERVER********************************
//  ****************************************************************************
//  */

app.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
