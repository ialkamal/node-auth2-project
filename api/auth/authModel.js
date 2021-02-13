const db = require("../../data/dbConfig");

async function find(username) {
  const [user] = await db("users").where({ username });
  return user;
}

async function addUser(user) {
  const [id] = await db("users").insert(user);
  return { id, ...user };
}

module.exports = { find, addUser };
