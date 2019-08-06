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
    this.translationToInput = this.translationToInput.bind(this);
  }

  translationToInput(){
      this.setState({
          message: this.props.output
      })
  }

  render() {
    const { message } = this.state;
    const { username } = this.props;
    // console.log(username);
    return (
      <div>
          <button
          onClick={this.translationToInput}
          >send down</button>
        <form
          onSubmit={e => {
            e.preventDefault();
            socket.emit("message", { message, username });
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
            placeholder="Type message here..."
          />
          <button 
          className="Send-button">
            <img src={sendIcon} alt="send" />
          </button>
        </form>
      </div>
    );
  }
}
