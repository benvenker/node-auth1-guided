const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const restricted = require("../auth/auth-router");
const knexSessionStore = require("connect-session-knex")(session);
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

  store: new knexSessionStore({
    knex: require("../database/dbConfig"),
    tableName: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
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
