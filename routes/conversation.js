const express = require("express");
const router = express.Router();
const { proteectRoutes } = require("../middleware/protectRoute");

const {
  addNewConversation,
  getAllConversations,
  getSingleConversation,
} = require("../controllers/conversation");

router.route("/all").get(proteectRoutes, getAllConversations);
router.route("/:id").get(proteectRoutes, getSingleConversation);
router.route("/create").post(proteectRoutes, addNewConversation);

module.exports = router;
