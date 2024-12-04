const express = require("express");
const router = express.Router();
const { proteectRoutes } = require("../middleware/protectRoute");

const { addNewConversation } = require("../controllers/conversation");

router.route("/create").post(proteectRoutes, addNewConversation);

module.exports = router;
