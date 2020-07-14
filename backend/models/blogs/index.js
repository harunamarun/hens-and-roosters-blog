const moment = require("moment");

const Blog = function (dbBlog) {
  this.id = dbBlog.id;
  this.name = dbBlog.name;
  this.content = dbBlog.content;
  this.imageURL = dbBlog.imageURL;
  this.createdAt = new Date(dbBlog.created_at);
  this.updatedAt = new Date(dbBlog.updated_at);
};

Blog.prototype.serialize = function () {
  return {
    id: this.id,
    name: this.name,
    content: this.content,
    imageURL: this.imageURL,
    createdAt: moment(this.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(this.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
  };
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Blog),
    list: require("./list")(knex, Blog),
    get: require("./get")(knex, Blog),
    update: require("./update")(knex, Blog),
    delete: require("./delete")(knex),
  };
};
