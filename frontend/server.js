/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.listen(8080, () => console.log("App listening on port 8080!"));
