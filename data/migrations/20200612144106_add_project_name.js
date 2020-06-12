exports.up = function (knex) {
  return knex.schema.table("newtask", (tbl) => {
    tbl
      .integer("project_name")
      .unsigned()
      .references("project.name")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
  });
};

exports.down = function (knex) {
  return knex.schema.table("newtask", (tbl) => {
    tbl.dropColumn("project_name");
  });
};
