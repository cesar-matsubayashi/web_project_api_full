const router = require("express").Router();
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
