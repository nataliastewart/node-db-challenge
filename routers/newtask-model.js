const db = require("../connection");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("newtask");
}

function findById(id) {
  if (id) {
    return db("newtask").where({ id }).first();
  } else {
    return null;
  }
}

async function add(addedTask) {
  const [id] = await db("newtask").insert(addedTask);
  return findById(id);
}
