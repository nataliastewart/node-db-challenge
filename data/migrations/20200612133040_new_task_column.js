exports.up = function (knex) {
  return knex.schema.createTable("newtask", (tbl) => {
    tbl.increments();
    tbl.string("description").notNullable();
    tbl.text("notes");
    tbl.boolean("completed").notNullable();
    tbl
      .integer("project_id")
      .unsigned()
      .references("project.id")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("newtask");
};
