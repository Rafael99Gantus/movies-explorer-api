const http2 = require("http2");

const Movies = require("../models/movies");

const NotFoundError = require("../utils/NotFoundError");

const ERROR_404 = "Карточка не найдена";

module.exports.getMovies = async (req, res, next) => {
  try {
    const cards = await Movies.find({ owner: req.user._id });
    res.status(http2.constants.HTTP_STATUS_OK).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.getMoviesId = async (req, res, next) => {
  try {
    const movieId = await Movies.findById(req.params.movieId).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).send(movieId);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMovies = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movies.deleteOne({ _id: movieId }).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).json(movieId);
  } catch (err) {
    next(err);
  }
};

module.exports.postMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const newCard = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(http2.constants.HTTP_STATUS_OK).send(newCard);
  } catch (err) {
    next(err);
  }
};
