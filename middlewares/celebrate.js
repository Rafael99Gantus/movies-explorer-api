const { celebrate, Joi } = require("celebrate");

const link = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.getUsersIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
});

module.exports.patchMeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(link),
    trailerLink: Joi.string().required().regex(link),
    thumbnail: Joi.string().required().regex(link),
    owner: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.moviesIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
});
