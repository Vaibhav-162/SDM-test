const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/books");

const app = express();
app.use(express.json());

app.use(cors("*"));
app.use("/books", bookRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log("Server has started at 4000 !!!");
});
