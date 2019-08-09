module.exports = {
  //* GET all user chatrooms/info
  getUserInfo: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

     db.get_chat_rooms(user_id) //? Check SQL files
      .then(foundChatrooms => { //! change name
          console.log(foundChatrooms)
        res.status(200).send(foundChatrooms);
      })
      .catch(err => console.log(err));
  },
  //* GET all messages of chatroom
  getChatMessages: (req, res, next) => {
      const db = req.app.get("db");
      const { chat_id  } = req.params;

      db.get_chat_messages(chat_id)
      .then(foundMessages => {
          console.log(foundMessages);
          res.status(200).send(foundMessages);
      })
      .catch(err => console.log(err));
  },
  //* Post new message
  addNewMessage: (req, res, next) => {
      const db = req.app.get("db");
      const { user_id } = req.session.user;
      const { chat_id } = req.params;
      const { content } = req.body;

      db.add_new_message([user_id, chat_id, content])
      .then(newMessage => {
          console.log(newMessage);
          res.status(200).send(newMessage);
      })
      .catch(err => console.log(err));
  }
 
};
