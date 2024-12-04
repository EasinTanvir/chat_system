const { prismaCli } = require("../prismaCli");

module.exports = {
  getAllConversations: async (req, res, next) => {
    try {
      const user = await prismaCli.conversations.findMany();

      res.status(200).json({ users: user });
    } catch (err) {
      const errors = new HttpError("fetch user failed", 500);
      return next(errors);
    }
  },

  addNewConversation: async (req, res, next) => {
    const { receiverId } = req.body;
    const currentUser = req.user;

    try {
      const conversation = await prismaCli.conversations.create({
        data: {
          sender: currentUser.id,
          receiver: receiverId,
        },
      });

      res.status(200).json({ conversation });
    } catch (err) {
      const errors = new HttpError("fetch user failed", 500);
      return next(errors);
    }
  },
};
