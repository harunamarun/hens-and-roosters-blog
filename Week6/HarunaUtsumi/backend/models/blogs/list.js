module.exports = (knex, Blog) => {
  return () => {
    return knex("blogs")
      .select(Blog.id)
      .orderBy("created_at", "desc")
      .then((rows) => rows.map((row) => new Blog(row)));
  };
};
