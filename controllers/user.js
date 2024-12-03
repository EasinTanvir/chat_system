const HttpError = require("../helper/HttpError");
const { prismaCli } = require("../prismaCli");

module.exports = {
  getAllUsers: async (req, res, next) => {
    const currentUser = req.user;
    try {
      const users = await prismaCli.user.findMany({
        where: {
          id: {
            not: currentUser.id,
          },
        },
      });

      res.status(200).json({ users });
    } catch (err) {
      const errors = new HttpError("fetch user failed", 500);
      return next(errors);
    }
  },
};
