const express = require("express");
module.exports = () => {
  const router = express.Router();
  router.get("/", (req, res) => res.send("Hello World!"));
  return router;
};
