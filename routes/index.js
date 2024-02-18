const { postUser, login } = require("../controllers/userController"); //+

const routerUsers = require("./usersRoute");

const routerMovies = require("./moviesRoute");

module.exports = {
  routerUsers,
  routerMovies,
  postUser,
  login,
};
