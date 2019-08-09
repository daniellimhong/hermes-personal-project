import React, { Component } from "react";
import '../Chat.scss'
import axios from "axios";

//! ComponentDidMount the messages 
//! pass down state of ChatId to render specific chatroom

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      returnedMessages: []
    };
    
    this.props.socket.on("message", returnedMessages => {
      this.setState({
        returnedMessages: [...this.state.returnedMessages, returnedMessages]
      });
    });
  }

  componentDidUpdate(prevProps){
    if (prevProps.chatId !== this.props.chatId) {
      axios.get(`/api/${this.props.chatId}`)
      .then(res => {
// change to strimgs - need to map
        let messages =  res.data.map(userData => {
          return userData.username + " | " + userData.content
        });
        this.setState({
          returnedMessages: messages
        })
        console.log(res.data);
      })
    }
  }

  render() {
    const { returnedMessages } = this.state;
    console.log(this.state.returnedMessages)
    return (
      <div>
        {returnedMessages.map(message => {
          return (
            <div className="message">
              {message}
            </div>
          );
        })}
      </div>
    );
  }
}
