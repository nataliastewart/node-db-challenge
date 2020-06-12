const db = require("../connection");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("project");
}

function findById(id) {
  if (id) {
    return db("project").where({ id }).first();
  } else {
    return null;
  }
}

async function add(newProject) {
  const [id] = await db("project").insert(newProject);
  return findById(id);
}
