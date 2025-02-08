require("dotenv").config();
const { celebrate, Joi, errors } = require("celebrate");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { login, createUser } = require("./controllers/user");
const auth = require("./middleware/auth");

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.options("*", cors());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use("/users", users);
app.use("/cards", cards);

app.get("*", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});
