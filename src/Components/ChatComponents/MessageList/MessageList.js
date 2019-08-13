import React, { Component } from "react";
import '../Chat.scss'
import ReactDOM from 'react-dom';
import axios from "axios";

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

  componentWillUpdate(){
    //* Cancels out auto scroll when already scrolled up
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight; 
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
    };

    //*Auto-scroll
    if (this.shouldScrollToBottom){
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
    
  }

  render() {
    const { returnedMessages } = this.state;
    console.log(this.state.returnedMessages)
    return (
      <div className="Message-list">
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
