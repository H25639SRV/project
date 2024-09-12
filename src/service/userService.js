// Get the client
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

//ma hoa pass
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?,?,?)",
      [email, hashPass, username]
    );
  } catch (error) {
    console.log(">>>check error", error);
  }
};

const getUserList = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (error) {
    console.log(">>>check error: ", error);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>>check error: ", error);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "select * from users WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(">>>check error: ", error);
  }
};

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "update users set email = ?, username = ? where id = ?",
      [email, username, id]
    );
    return rows;
  } catch (error) {
    console.log(">>>check error: ", error);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
