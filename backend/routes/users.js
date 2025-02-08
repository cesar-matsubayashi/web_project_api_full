const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/user");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }

  return helpers.error("string.uri");
};

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:id", celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = router;
