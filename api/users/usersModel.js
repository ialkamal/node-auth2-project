const db = require("../../data/dbConfig");

function getUsers() {
  return db("users");
}

function getUsersByDepartment(department) {
  return db("users").where({ department });
}

async function find(username) {
  const [user] = await db("users").where({ username });
  return user;
}

async function addUser(user) {
  const [id] = await db("users").insert(user);
  return { id, ...user };
}

module.exports = { getUsers, getUsersByDepartment, find, addUser };
