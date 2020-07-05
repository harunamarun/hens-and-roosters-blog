module.exports = (knex) => {
  return (params) => {
    const id = params.id;

    return knex("blogs").where({ id }).del();
  };
};
