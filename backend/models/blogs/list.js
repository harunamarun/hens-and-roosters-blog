module.exports = (knex, Blog) => {
  return (params) => {
    if (params.keyword !== undefined) {
      const keyword = params.keyword;
      return knex("blogs")
        .where("content", "like", `%${keyword}%`)
        .orWhere("name", "like", `%${keyword}%`)
        .select()
        .orderBy("created_at", "desc")
        .then((rows) => rows.map((row) => new Blog(row)));
    } else {
      return knex("blogs")
        .select(Blog.id)
        .orderBy("created_at", "desc")
        .then((rows) => rows.map((row) => new Blog(row)));
    }
  };
};
