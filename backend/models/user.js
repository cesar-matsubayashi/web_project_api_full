const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const regex =
          /(http(s)?):\/\/[(www\.)?\w._\-~:/?%#\[\]@!$&'()*+,;=]{2,}/;
        return regex.test(v);
      },
      message: "O link informado não é válido",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
