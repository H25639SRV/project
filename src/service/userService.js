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

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);
  // A simple query

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?,?,?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = async () => {
  let users = [];
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });

  // connection.query(
  // "select * from users",
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //       return users;
  //     }
  //     users = results;
  //     console.log(">>run get user list: ", users);
  //     return users;
  //   }
  // query database
  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (error) {
    console.log(">>>check error: ", error);
  }

  // );
};
module.exports = {
  createNewUser,
  getUserList,
};
