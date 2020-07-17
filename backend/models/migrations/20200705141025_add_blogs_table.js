exports.up = function (knex) {
  return knex.schema.createTable("blogs", (t) => {
    t.increments().index();

    t.string("name", 30).notNullable();

    t.text("content");

    t.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("blogs");
};
