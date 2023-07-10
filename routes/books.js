const express = require("express");
const bookRouter = express.Router();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "test_db",
});

bookRouter.get("/", (req, res) => {
  const statement = "select * from Book_Tb";
  db.query(statement, (error, result) => {
    if (error) {
      res.send("error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    }
  });
});

bookRouter.post("/", (req, res) => {
  const statement = `insert into Book_Tb (b_name, author, book_type , price, publishedDate, language) values ('${req.body.b_name}', '${req.body.author}', '${req.body.book_type}', ${req.body.price} , '${req.body.publishedDate}', '${req.body.language}');`;
  db.query(statement, (error, result) => {
    if (error) {
      res.send("error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(result.affectedRows);
    }
  });
});

bookRouter.put("/:id", (req, res) => {
  const statement = `update Book_Tb set price = ${req.body.price}, language = '${req.body.language}' where id = ${req.params.id}`;
  db.query(statement, (error, result) => {
    if (error) {
      res.send("error");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(result.affectedRows);
    }
  });
});

module.exports = bookRouter;
