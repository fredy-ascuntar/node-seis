const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "prueba7",
  multipleStatements: "true",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    //return
  } else {
    console.log("Connected");
  }
});

module.exports = connection;
