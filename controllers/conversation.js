const { prismaCli } = require("../prismaCli");

module.exports = {
  getAllConversations: async (req, res, next) => {
    try {
      const user = await prismaCli.user.findMany();

      res.status(200).json({ users: user });
    } catch (err) {
      const errors = new HttpError("fetch user failed", 500);
      return next(errors);
    }
  },
};
