import React, { Component } from "react";
import socketIOclient from "socket.io-client";
const socket = socketIOclient("http://localhost:4000");

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      returnedMessage: []
    };
    socket.on("message", returnedMessage => {
      this.setState({
        returnedMessage: [...this.state.returnedMessage, returnedMessage]
      });
    });
  }

  render() {
    const { returnedMessage } = this.state;

    return (
      <div>
        {returnedMessage.map(message => {
          return (
            <div className="message" key="{key + 1}">
              {message}
            </div>
          );
        })}
      </div>
    );
  }
}
