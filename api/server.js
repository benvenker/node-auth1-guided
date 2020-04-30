const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const restricted = require("../auth/auth-router");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");

const server = express();

const sessionConfig = {
  name: "chocolate-chip",
  secret: "mysepshulsecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false, // should be true in prod
  saveUninitialized: false,
};

// Global Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
