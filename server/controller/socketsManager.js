
const socketsManager = (io, app) => {

io.sockets.on("connection", socket => {
    console.log(socket.id)
    
    //! Original socket message emit
    socket.on('message',userMessage => {
      const { username, message, chatId, userId } = userMessage;

        const db = app.get("db");
  
        db.add_new_message([userId, chatId, message])
        .then(newMessage => {
            console.log("newMessage:", newMessage);
        })
    
      io.in(`${chatId}`).emit('message', `${username} | ${message}`);
      
    
    });

    socket.on('join', chatId => {
      socket.join(chatId);
      console.log(`Joined room #${chatId}`)
    });
    
    socket.on('leave', chatId => {
      socket.leave(chatId);
      console.log(`Left room #${chatId}`)
    });
  });
}

  module.exports = socketsManager;