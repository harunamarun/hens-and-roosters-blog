module.exports = (knex, Blog) => {
  return (params) => {
    const id = params.id;
    return knex("blogs")
      .where({ id })
      .select()
      .then((blogs) => {
        if (blogs.length) return new Blog(blogs.pop());
        throw new Error(`Error finding blog ${id}`);
      });
  };
};
