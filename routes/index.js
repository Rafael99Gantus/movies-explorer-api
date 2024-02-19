const express = require("express");

const { signUpValidation, signInValidation } = require("../middlewares/celebrate"); //+
const { postUser, login } = require("../controllers/userController"); //+

const routerUsers = require("./usersRoute");
const routerMovies = require("./moviesRoute");

const NotFoundError = require("../utils/NotFoundError");

const ERROR_404 = "Страница не найдена, некорректный запрос";

const router = express();

router.post("/signin", signInValidation, login);
router.post("/signup", signUpValidation, postUser);

router.use("/users", routerUsers);
router.use("/movies", routerMovies);

router.use("*", (req, res, next) => {
  next(new NotFoundError(`${ERROR_404}`));
});

module.exports = router;
