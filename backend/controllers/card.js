const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE).send({ message: "Dados inválidos" });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const error = new Error("Permissão negada");
        error.statusCode = 403;
        error.name = "ForbiddenRequest";
        throw error;
      }

      return Card.findByIdAndDelete(req.params.id);
    })
    .then((deleted) => {
      res.send(deleted);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      if (err.name === "ForbiddenRequest") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Recurso requisitado não encontrado");
      error.statusCode = 404;
      error.name = "DocumentNotFound";
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFound") {
        return res.status(err.statusCode).send({ message: err.message });
      }

      return res.status(500).send({ message: "Erro interno no servidor" });
    });
};
