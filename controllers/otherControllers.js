const http2 = require("http2");

const Movies = require("../models/movies");
// const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");

const ERROR_404 = "Не найдено";

module.exports.setLike = async (req, res, next) => {
  try {
    const cardId = await Movies.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(new NotFoundError({ message: ERROR_404 }));
    res.status(http2.constants.HTTP_STATUS_OK).send(cardId);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteLike = async (req, res, next) => {
  try {
    const cardId = await Movies.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(new NotFoundError({ message: ERROR_404 }));
    res.status(http2.constants.HTTP_STATUS_OK).send(cardId);
  } catch (err) {
    next(err);
  }
};

// module.exports.patchMyAvatar = async (req, res, next) => {
//   try {
//     const { avatar } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { avatar },
//       { new: true, runValidators: true },
//     ).orFail(new NotFoundError({ message: ERROR_404 }));
//     res.status(http2.constants.HTTP_STATUS_OK).send(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// };
