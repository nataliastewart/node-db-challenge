exports.up = function (knex) {
  return knex.schema
    .createTable("project", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
      tbl.boolean("completed").notNullable();
    })
    .createTable("resource", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.string("description");
    })
    .createTable("task", (tbl) => {
      tbl.increments();
      tbl.string("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("project", "resource", "task");
};
