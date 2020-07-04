const express = require("express");

const router = express.Router();

const blogRouter = require("./blog");

module.exports = () => {
  router.use("/blogs", blogRouter());
  return router;
};