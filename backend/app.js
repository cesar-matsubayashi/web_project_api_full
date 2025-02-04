require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { login, createUser } = require("./controllers/user");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signin", login);
app.post("/signup", createUser);

app.use((req, res, next) => {
  req.user = {
    _id: "676eefc4cd0f8d19055e92c8",
  };

  next();
});

app.use("/users", users);
app.use("/cards", cards);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});
