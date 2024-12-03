const HttpError = require("../helper/HttpError");

module.exports = {
  proteectRoutes: async (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      const errors = new HttpError("Unauthorized", 401);
      return next(errors);
    }
  },
};
