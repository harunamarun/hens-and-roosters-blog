/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use("/*", express.static(path.join(__dirname, "dist/index.html")));
app.listen(8080, () => console.log("App listening on port 8080!"));
