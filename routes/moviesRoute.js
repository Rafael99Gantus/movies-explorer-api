const router = require("express").Router();
const { postMovieValidation, moviesIdValidation } = require("../middlewares/celebrate");
const {
  getMovies, postMovies, deleteMovies,
} = require("../controllers/moviesController");
const auth = require("../middlewares/auth");

router.get("/", auth, getMovies); // +
router.post("/", auth, postMovieValidation, postMovies); // +
router.delete("/:movieId", auth, moviesIdValidation, deleteMovies); // +

module.exports = router;
