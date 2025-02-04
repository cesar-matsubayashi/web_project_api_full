const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send(users))
    .catch((err) => res.status(err.statusCode).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.send(user))
      .catch(() => {
        res.status(500).send({ message: "Erro interno no servidor" });
      })
  );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("ID do usuário não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE).send({ message: "Dados inválidos" });
      }

      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE).send({ message: "Dados inválidos" });
      }

      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};
