const HttpError = require("../helper/HttpError");
const { prismaCli } = require("../prismaCli");

module.exports = {
  getAllConversations: async (req, res, next) => {
    const currentUser = req.user;

    try {
      const conversations = await prismaCli.conversations.findMany({
        where: {
          OR: [{ senderId: currentUser.id }, { receiverId: currentUser.id }],
        },
        include: {
          sender: true,
          receiver: true,
          Message: true,
        },
      });

      res.status(200).json({ conversations });
    } catch (err) {
      const errors = new HttpError("Fetch conversations failed", 500);
      return next(errors);
    }
  },
  getSingleConversation: async (req, res, next) => {
    const { id } = req.params;

    try {
      const conversation = await prismaCli.conversations.findUnique({
        where: {
          id,
        },
        include: {
          sender: true,
          receiver: true,
          Message: true,
        },
      });

      res.status(200).json({ conversation });
    } catch (err) {
      const errors = new HttpError("Fetch conversations failed", 500);
      return next(errors);
    }
  },

  addNewConversation: async (req, res, next) => {
    const { receiverId } = req.body;
    const currentUser = req.user;

    try {
      const conversation = await prismaCli.conversations.create({
        data: {
          senderId: currentUser.id,
          receiverId: receiverId,
        },
      });

      await prismaCli.user.update({
        where: { id: currentUser.id },
        data: {
          friends: {
            push: { userId: currentUser.id, friendId: receiverId },
          },
        },
      });
      await prismaCli.user.update({
        where: { id: receiverId },
        data: {
          friends: {
            push: { userId: receiverId, friendId: currentUser.id },
          },
        },
      });

      res.status(200).json({ conversation });
    } catch (err) {
      const errors = new HttpError("Creating conversation failed", 500);
      return next(errors);
    }
  },
};
