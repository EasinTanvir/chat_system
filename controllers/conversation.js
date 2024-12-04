const HttpError = require("../helper/HttpError");
const { prismaCli } = require("../prismaCli");

module.exports = {
  getAllConversations: async (req, res, next) => {
    const currentUser = req.user;

    try {
      const conversations = await prismaCli.conversations.findMany({
        where: {
          OR: [
            { sender: currentUser.id }, // If the user is the sender
            { receiver: currentUser.id }, // If the user is the receiver
          ],
        },
        include: {
          senderId: true,
          receiverId: true,
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
          senderId: true,
          receiverId: true,
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
      // Create a new conversation
      const conversation = await prismaCli.conversations.create({
        data: {
          sender: currentUser.id,
          receiver: receiverId,
        },
      });

      // Update the current user's friends array to include the receiverId
      await prismaCli.user.update({
        where: { id: currentUser.id },
        data: {
          friends: {
            push: { userId: currentUser.id, friendId: receiverId },
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
