const db = require("../connection");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("resource");
}

function findById(id) {
  if (id) {
    return db("resource").where({ id }).first();
  } else {
    return null;
  }
}

async function add(newResource) {
  const [id] = await db("resource").insert(newResource);
  return findById(id);
}
