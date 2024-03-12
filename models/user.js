const mongoose = require("mongoose");

const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: [2, "Минимальная длинна текста 2 символа"],
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: {
      value: true,
      message: "Поле email обязательное",
    },
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: "Поле password обязательное",
    },
    select: false,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("user", userSchema);
