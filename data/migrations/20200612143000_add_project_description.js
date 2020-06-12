exports.up = function (knex) {
  return knex.schema.table("newtask", (tbl) => {
    tbl
      .integer("project_description")
      .unsigned()
      .references("project.description")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.table("newtask", (tbl) => {
    tbl.dropColumn("project_description");
  });
};
