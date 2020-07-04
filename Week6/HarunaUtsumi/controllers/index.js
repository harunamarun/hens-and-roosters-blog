const express = require("express");

const router = express.Router();

const blogRouter = require("./blog");

module.exports = models => {
  router.use("/blogs", blogRouter(models));
  return router;
};