exports.up = function (knex) {
  return knex.schema.table("blogs", (t) => {
    t.text("imageURL");
  });
};

exports.down = function (knex) {
  return knex.schema.table("blogs", (t) => {
    t.dropColumn("imageURL");
  });
};
