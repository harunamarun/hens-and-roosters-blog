module.exports = (knex, Blog) => {
  return (params) => {
    const start = params.start;
    const limit = params.limit;
    const keyword = params.keyword;

    if (keyword !== undefined) {
      return knex("blogs")
        .where("content", "ilike", `%${keyword}%`)
        .orWhere("name", "ilike", `%${keyword}%`)
        .select()
        .orderBy("created_at", "desc")
        .limit(limit)
        .offset(start)
        .then((rows) => rows.map((row) => new Blog(row)))
        .catch((err) => {
          console.log(err);
          return Promise.reject(err);
        });
    } else {
      return knex("blogs")
        .select(Blog.id)
        .orderBy("created_at", "desc")
        .limit(limit)
        .offset(start)
        .then((rows) => rows.map((row) => new Blog(row)))
        .catch((err) => {
          console.log(err);
          return Promise.reject(err);
        });
    }
  };
};
