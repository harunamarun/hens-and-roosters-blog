const moment = require("moment");

module.exports = (knex) => {
  return params => {
    const name = params.name;
    const content = params.content;
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const createdAt = moment().format("YYYY-MM-DD hh:mm:ss");

    return knex("blogs")
      .insert({ name, content, "updated_at": updatedAt, "created_at": createdAt })
      .catch((err) => {
        console.log(err)
        return Promise.reject(err)});
  };
};
