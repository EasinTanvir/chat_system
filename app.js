const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const HttpError = require("./helper/HttpError");
require("./passport/passport-config");
const { socketSetup } = require("./middleware/socket");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "session",
});

app.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.use((req, res, next) => {
  const errors = new HttpError("No routes found", 404);
  return next(errors);
});
app.use((error, req, res, next) => {
  return res
    .status(error.code || 500)
    .json({ message: error.message || "Someting went wrong" });
});

socketSetup(server);

module.exports = { app, server };
