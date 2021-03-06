const moment = require("moment");

module.exports = (knex, Blog) => {
  return (params) => {
    const name = params.name;
    const content = params.content;
    const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const imageURL = params.imageURL;
    const gifURL = params.gifURL;

    return knex("blogs")
      .insert(
        {
          name,
          content,
          imageURL,
          gifURL,
          updated_at: updatedAt,
          created_at: createdAt,
        },
        "id"
      )
      .then((id) => {
        return knex("blogs")
          .where({ id: Number(id) })
          .select();
      })
      .then((blogs) => new Blog(blogs.pop()))
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
};
