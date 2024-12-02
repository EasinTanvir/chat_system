const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { prismaCli } = require("../prismaCli");
const bcrypt = require("bcryptjs");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  let user;
  try {
    user = await prismaCli.user.findFirst({ where: { email } });
  } catch (err) {
    return done(err);
  }

  if (!user) {
    return done(null, false, { message: "No User Found" });
  }
  let isValid;
  try {
    isValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    return done(err);
  }

  if (isValid) {
    return done(null, user);
  } else {
    return done(null, false, { message: "Invalid Password" });
  }
};
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

//grab the user from the database
passport.serializeUser((user, done) => {
  //insert the userId into the express session
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  //find the user by the userId and put it into the req.user on the req object
  prismaCli.user
    .findUnique({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
