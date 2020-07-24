exports.up = function (knex) {
  return knex.schema.table("blogs", (t) => {
    t.text("gifURL");
  });
};

exports.down = function (knex) {
  return knex.schema.table("blogs", (t) => {
    t.dropColumn("gifURL");
  });
};
