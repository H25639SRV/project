// Get the client
import mysql from "mysql2";
import bcrypt from "bcryptjs";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

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

const getUserList = () => {
  let users = [];
  connection.query("select * from users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("check results: ", results);
  });
};
module.exports = {
  createNewUser,
  getUserList,
};
