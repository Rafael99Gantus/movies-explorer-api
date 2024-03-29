/* eslint-disable max-len */
const http2 = require("http2");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");
const BadRequestError = require("../utils/BadRequest");

const { JWT_SECRET, NODE_ENV } = process.env;

const ERROR_404 = "Пользователь не найден";

module.exports.patchMe = async (req, res, next) => {
  try {
    console.log("getMe");
    const { _id } = req.user;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { name, email },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError({ message: ERROR_404 }));
    res.status(http2.constants.HTTP_STATUS_OK).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.postUser = async (req, res, next) => {
  console.log("postUser");
  console.log(process.env.JWT_SECRET);
  const {
    name, email, password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User
    .create({
      name, email, password: hashedPassword,
    })
    // eslint-disable-next-line no-shadow
    .then((newUser) => res.status(http2.constants.HTTP_STATUS_CREATED).send({
      name: newUser.name,
      email: newUser.email,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Не удалось добавить пользователя"));
      }
      return next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new UnauthorizedError("Пользователь с таким email не найден"));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError("Неверный пароль"));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "Придумать ключ");
    res.status(http2.constants.HTTP_STATUS_OK).send({ token, id: user._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Не удалось войти"));
    }
    return next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    console.log("getMe");
    const userId = req.user._id;
    const me = await User.findById(userId);
    if (!me) {
      throw new NotFoundError(`${ERROR_404}`);
    }
    res.status(http2.constants.HTTP_STATUS_OK).json({
      name: me.name,
      email: me.email,
    });
  } catch (err) {
    next(err);
  }
};
