require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const socketsManager = require("./controller/socketsManager");



const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { login, register, userSession, logout } = require('./controller/userController');
const { getUserInfo, getChatMessages, addNewMessage } = require('./controller/chatController');

app.use(express.json());

//* Massive connecting project to POSTGRESQL

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Hermes Database Connected");
  });


// Setting up socket controller
socketsManager(io, app);

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
// io.sockets.on("connection", socket => {
//   console.log(socket.id)
//   socket.on('message', userMessage => {
//     const { username, message } = userMessage
//     io.emit("message", `${username}: ${message}`)
//   })
// });


//* User Endpoints
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/user_session", userSession);
app.get("/api/logout", logout);

//* Chat Endpoints
app.get("/api/me", getUserInfo); //! WILL SEND BACK ALL USER INFO (user info + chatroom) [initally only chatroom]
app.get("/api/:chat_id", getChatMessages);
// app.post("", createNewChat);
// app.post("/:chat_id/messages", addNewMessage);

//* Delete chat?


//! User Settings Endpoints
//* Update Profile Picture
//* Update Location
//* Delete Account
//? Update dark mode or color scheme

//? After MVP: Friends List!

server.listen(SERVER_PORT, () =>
  console.log(`Hermes Server listening on port ${SERVER_PORT}`)
);
