const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14); //encrypts password and gives time complexity
  const [id] = await db("users").insert(user); // insert user into database
  return findById(id); //looks for the id
}

function findBy(filter) {
  return db("users") //returns the users db
    .select("id", "username", "password") //selects the different tables
    .where(filter);
}

function findById(id) {
  return db("users") //returns the db
    .select("id", "username") //select id, username
    .where({ id }) //where the id is
    .first(); //first one
}

module.exports = {
  add,
  findBy,
  findById
};
