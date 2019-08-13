import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../SideBar.scss";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user: {} Original state, looks like I dont neet it!
      chatName: "",
      chatId: "",
      newChatId: ""
    };
  }

  logout = () => {
    axios
    .get("/api/logout").then(res => {
      this.props.setUser(null);
      this.props.history.push("/");
    });
  };

  createChat = (e) => {
    e.preventDefault();
    axios
    .post("/api/newChat", {
      chat_name: this.state.chatName
    })
    .then(res => {
      // console.log(res.data)
      this.setState({
        newChatId: res.data[0].chat_id
      })
    })
    .catch( err => console.log(err))
  };

  addChat = (e) => {
    e.preventDefault();
    axios
    .post("/api/userAddChat", {
      chat_id: this.state.chatId,
      user_id: this.props.user.user_id
    })
    .then(res => {
      // console.log(res.data)
      this.props.getUserProfileFn();
    });
  };

  universalChangeHandler = (property, value) => {
    this.setState({
      [property]: value
    });
  };
  
  render() {
    const { user, userProfile } = this.props;
    const { chatName, chatId, newChatId } = this.state;
  
    // console.log("this is the current state:", chatName, chatId)
    // console.log(this.state.newChatId)
    // if (this.props.userProfile[0]){
    // console.log(this.props.userProfile[0].profile_picture)
    // }
   
    return (
      
        <div className="User-card">
        { 
        this.props.userProfile[0] ?
         <img 
         className="User-picture"
         src={this.props.userProfile[0].profile_picture}
         alt="pic"
         /> 
         :
         <></>
        }
        <h3 className="Username">{user.username}</h3> <button className="AllUserButton" onClick={this.logout}>Sign out</button>
       
        <form className="Create-chat-form">
          <input 
          className="Add-chat-name-input"
          name="chatName"
          value={chatName}
          onChange={event =>
          this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="New Chat Name"
          />

          <button className="AllUserButton" onClick={e => this.createChat(e)}>Create New Chat</button>

          <input 
          name="newChatId"
          value={newChatId}
          placeholder="ID"
          style={{width: "40px"}}
          onChange={event => 
          this.universalChangeHandler(event.target.name, event.target.value)
          }/>

        </form>
           {/* User Add Chat Modal */}
        <form className="Add-chat-form">
          <input 
          id=""
          name="chatId"
          value={chatId}
          onChange={event =>
          this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="Add Existing Chat ID"
          />

          <button className="AllUserButton" onClick={e => this.addChat(e)}>Join Chat</button>
        </form>
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

export default withRouter(connectInvoked(UserCard));
