const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  exportUsersToCSV,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/search", searchUsers);
router.get("/export-csv", exportUsersToCSV);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
