const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user");
const { proteectRoutes } = require("../middleware/protectRoute");

router.route("/all").get(proteectRoutes, getAllUsers);

module.exports = router;
