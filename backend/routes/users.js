const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/user");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
