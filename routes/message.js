const express = require("express");
const router = express.Router();
const { proteectRoutes } = require("../middleware/protectRoute");

const { addNewMessage, getCurrentMessages } = require("../controllers/message");

router.route("/:conversationId").get(proteectRoutes, getCurrentMessages);
router.route("/create").post(proteectRoutes, addNewMessage);

module.exports = router;
