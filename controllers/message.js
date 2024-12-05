const HttpError = require("../helper/HttpError");
const { prismaCli } = require("../prismaCli");

module.exports = {
  addNewMessage: async (req, res, next) => {
    const { receiverId, text, conversationId } = req.body;
    const currentUser = req.user;

    try {
      const message = await prismaCli.message.create({
        data: {
          senderId: currentUser.id,
          receiverId: receiverId,
          text,
          conversationId,
        },
      });

      res.status(200).json({ message });
    } catch (err) {
      const errors = new HttpError("Creating conversation failed", 500);
      return next(errors);
    }
  },
  getCurrentMessages: async (req, res, next) => {
    const { conversationId } = req.params;

    try {
      const messages = await prismaCli.message.findMany({
        where: {
          conversationId,
        },
      });

      res.status(200).json({ messages });
    } catch (err) {
      const errors = new HttpError("Creating conversation failed", 500);
      return next(errors);
    }
  },
};
