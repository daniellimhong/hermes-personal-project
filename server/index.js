require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { login, register, userSession, logout } = require('./controller/userController');

app.use(express.json());

//* Massive connecting project to POSTGRESQL
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Hermes Database Connected");
  });

//* Sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

//* Sockets (Could use Socket Manager later on)
io.sockets.on("connection", socket => {
  console.log(socket.id)

  socket.on('message', userMessage => {
    const { username, message } = userMessage
    // const { message } = userMessage
    io.emit("message", `${username}: ${message}`)
    // io.emit("message", `${message}`)
    // console.log(`${message}`)
  })
})
//! change dummyUser to username later

//* User Endpoints
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/user_session", userSession);
app.get("/api/logout", logout)

server.listen(SERVER_PORT, () =>
  console.log(`Hermes Server listening on port ${SERVER_PORT}`)
);
