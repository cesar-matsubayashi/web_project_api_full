const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }

  return helpers.error("string.uri");
};

router.get("/", getCards);

router.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);

router.delete("/:id", celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

router.put("/:id/likes", celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), likeCard);

router.delete("/:id/likes", celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
