const moment = require("moment");

module.exports = (knex, Blog) => {
  return (params) => {
    const id = params.id;
    const content = params.content;
    const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

    return knex("blogs")
      .where({ id })
      .update({ content, updated_at: updatedAt })
      .then(() => {
        return knex("blogs").where({ id }).select();
      })
      .then((blogs) => new Blog(blogs.pop()))
      .catch((err) => Promise.reject(err));
  };
};
