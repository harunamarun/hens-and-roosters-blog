module.exports = (knex, Blog) => {
  return () => {
    return knex("blogs")
      .select(Blog.id)
      .then(rows => rows.map(row => new Blog(row)));
  };
};
