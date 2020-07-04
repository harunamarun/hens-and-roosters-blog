module.exports = {
  // port for server to run on
  express: {
    port: process.env.PORT || 3000
  },

  // timestamp format for our logs
  logger: {
    format: "dddd MMMM Do YYYY, h:mm:ss a"
  }
};
