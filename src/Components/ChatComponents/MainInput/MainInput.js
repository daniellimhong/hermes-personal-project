import React, { Component } from "react";
import socketIOclient from "socket.io-client";
import sendIcon from '../../icons/sent-mail.svg'
import "../SendContainer/SendContainer.scss"

const socket = socketIOclient("http://localhost:4000");

export default class MainInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: ""
    };
  }

  render() {
    const { message } = this.state;
    const { dummyUser } = this.props;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            socket.emit("message", { message, dummyUser });
            this.setState({
              message: ""
            });
          }}
        >
          <input
            className="Main-send-input"
            autoFocus={true}
            id="message"
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            value={message}
          />
          <button 
          className="Send-button">
            Send
            {/* <img src={sendIcon} alt="send" /> */}
          </button>
        </form>
      </div>
    );
  }
}
