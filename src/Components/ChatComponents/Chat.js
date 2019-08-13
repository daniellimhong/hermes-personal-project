import React, { Component } from "react";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import MessageList from "./MessageList/MessageList";
import SendContainer from "./SendContainer/SendContainer";
import SideBar from "./SideBar/SideBar";
import axios from "axios";
import "./Chat.scss";
//* Sockets
import socketIOclient from "socket.io-client";
const socket = socketIOclient("http://localhost:4000"); 

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: [],
      chatId: 0 //* chatId state makes most sense here!
    };
  }

  componentDidMount() {
    axios.post("/api/user_session").then(res => {
      this.props.setUser(res.data);
    });
    this.getUserProfile();
  }

  getUserProfile = () => {
    axios.get("/api/me").then(res => {
      this.setState({
        userProfile: res.data
      });
    });
  };

  render() {
    console.log(this.state.userProfile, this.state.chatId);
    const { user } = this.props;
    const { userProfile, chatId } = this.state;

    let mappedRooms = userProfile.map((room, index) => { //! each button can now change state of chatId
      return (
        <div key={index} className="Rooms">
          <ul>
            <li>
              <button
                className="Chat-title"
                onClick={() => {
                  socket.emit('leave', chatId);
                  socket.emit("join", room["chat_id"]);
                  this.setState({
                    chatId: room["chat_id"]
                  });
                  alert("In chat: " + room["chat_name"] + " - #" + room["chat_id"])
                }}
              >
                {room["chat_name"] + " - id: #" + room["chat_id"]}
              </button>
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div className="Chat-container">
        <div>
          {this.props.user ? (
            <div>
              <SideBar
                username={user.username}
                userId={user.user_id}
                userProfile={userProfile}
                socket={socket}
                mappedRooms={mappedRooms}
                getUserProfileFn={this.getUserProfile}
              />
              <MessageList 
              socket={socket} 
              chatId={chatId}
              userId={user.user_id}
              />
              <SendContainer 
              username={user.username} 
              socket={socket}
              chatId={chatId}
              userId={user.user_id}
              />
            </div>
          ) : (
            <div onClick={() => {
              this.props.history.push("/");
            }} 
            className="Error-messsage-1">Uh-oh, looks looks like something went wrong here! Press on this to log back in!</div>
          )}{" "}
          {/* FIX FOR CONDITIONAL RENDERING FOR USER */}
        </div>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  setUser
};

const connectInvoked = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default connectInvoked(Chat);
