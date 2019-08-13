module.exports = {
  //* GET all user chatrooms/info
  getUserInfo: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

     db.get_chat_rooms(user_id) //? Check SQL files
      .then(foundChatrooms => { //! change name
          // console.log(foundChatrooms)
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

  createNewChatRoom: (req, res, next) => {
    const db = req.app.get("db");
    const { chat_name } = req.body;

    db.create_chat_room(chat_name)
    .then(newChat => {
      console.log(chat_name)
      console.log(newChat);
      res.status(200).send(newChat);
    })
    .catch(err => console.log(err))
  },

  userAddChat: (req, res, next) => {
    const db = req.app.get("db");
    const { chat_id } = req.body;
    const { user_id } = req.session.user;

    db.insert_user_to_chat_room([chat_id, user_id])
    .then(newInsert => {
      console.log(newInsert);
      res.status(200).send(newInsert);
    }).catch(err => console.log(err))
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
  },

  //* Delete Chat Room
  deleteChatRoom: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id, chat_id } = req.params;

    db.delete_chat_room([user_id, chat_id]).then( () => {
      res.status(200).send(console.log(`User #${user_id} sucessfully deleted chat #${chat_id}`))
      console.log(user_id, chat_id)
    })
    
  }
 
};
