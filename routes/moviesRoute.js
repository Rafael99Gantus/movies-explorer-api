const router = require("express").Router();
const { postMovieValidation, moviesIdValidation } = require("../middlewares/celebrate");
const {
  getMovies, getMoviesId, postMovies, deleteMovies,
} = require("../controllers/moviesController");
const auth = require("../middlewares/auth");
// const { setLike, deleteLike } = require("../controllers/otherControllers");

router.get("/", auth, getMovies); // +
router.post("/", auth, postMovieValidation, postMovies); // +
router.delete("/:movieId", auth, moviesIdValidation, deleteMovies); // +
// router.get("/:cardId", auth, getMoviesId);
// router.put("/:cardId/likes", auth, moviesIdValidation, setLike);
// router.delete("/:cardId/likes", auth, moviesIdValidation, deleteLike);

module.exports = router;
