const router = require("express").Router();
const { patchMeValidation } = require("../middlewares/celebrate");
const { getMe, patchMe } = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/me", auth, getMe);
router.patch("/me", auth, patchMeValidation, patchMe);

module.exports = router;
