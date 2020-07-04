module.exports = function(knex) {
  return {
    blogs: require("./blogs")(knex)
  };
};
