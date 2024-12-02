const HttpError = require("../helper/HttpError");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { prismaCli } = require("../prismaCli");

module.exports = {
  login: async (req, res, next) => {
    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (err) {
        const errors = new HttpError("Internal Server Error", 500);
        return next(errors);
      }

      if (info) {
        const errors = new HttpError(info.message, 500);
        return next(errors);
      }

      req.login(user, { session: true }, async (err) => {
        if (err) {
          const errors = new HttpError("LogIn Failed", 500);
          return next(errors);
        }

        res.status(200).json({
          message: "Login successful",
          info: {
            id: user.id,
            userName: user.userName,
          },
        });
      });
    })(req, res, next);
  },
  register: async (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!password || password.trim().length < 6) {
      const errors = new HttpError("Password must be 6 character", 500);
      return next(errors);
    }
    let existingUser;

    try {
      existingUser = await prismaCli.user.findFirst({ where: { email } });
    } catch (err) {
      const errors = new HttpError("fetch user failed", 500);
      return next(errors);
    }
    if (existingUser) {
      const errors = new HttpError("Sorry email already taken", 500);
      return next(errors);
    }

    let hashPass;
    try {
      hashPass = await bcrypt.hash(password, 12);
    } catch (err) {
      const errors = new HttpError("Internal Server Error", 500);
      return next(errors);
    }
    let createUser;
    try {
      createUser = await prismaCli.user.create({
        data: {
          email,
          userName,
          password: hashPass,
        },
      });
    } catch (err) {
      const errors = new HttpError("Create user failed", 500);
      return next(errors);
    }

    res.status(200).json({ message: "Register Successful" });
  },
};
