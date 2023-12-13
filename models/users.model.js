import db from "../config/db.js";

const _addUser = async (username, password) => {
  // const trx = await db.transaction();
  try {
    await db("users").insert({ username, password }, ["username", "password"]);
    // .transacting(trx);
  } catch (err) {
    console.log(err);
    // await trx.rollback();
  }
};

const _getUsers = () => {
  return db("users").select("id", "username");
};

const _getUserByUsername = (username) => {
  return db("users").select("id", "username", "password").where({ username });
};

export { _addUser, _getUsers, _getUserByUsername };
