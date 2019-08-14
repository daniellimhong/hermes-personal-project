import React, { Component } from "react";
import SettingsIcon from "../../../icons/settings.svg";
import axios from "axios";
import "./UserSettings.scss";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
      formOpened: false,
      profilePic: ""
    };
  }

  updateProfilePic = e => {
    e.preventDefault();
    axios.put("/api/updatePic", {
      profile_picture: this.state.profilePic,
      user_id: this.props.userId
    });
    this.props.getUserProfileFn();
  };

  toggleSettings = () => {
    this.setState(prevState => {
      return {
        modalOpened: !prevState.modalOpened
      };
    });
  };

  toggleForm = () => {
    this.setState(prevState => {
      return {
        formOpened: !prevState.formOpened
      };
    });
  };

  universalChangeHandler = (property, value) => {
    this.setState({
      [property]: value
    });
  };

  render() {
    const { profilePic } = this.state;
    const { userProfile, getUserProfileFn } = this.props;
    console.log(this.state.profilePic)

    let mappedRoomsToDelete = userProfile.map((room, index) => {
      return (
        <div key={index} className="Rooms">
          <ul>
            <li>
              <button
                className="ToDelete"
                onClick={e => {
                  e.preventDefault();
                  let chatId = room["chat_id"];
                  let userId = userProfile[index].user_id;
                  axios
                    .delete(`/api/deleteChat/${userId}/${chatId}`)
                    .then(() => {
                      getUserProfileFn();
                      this.setState({
                        modalOpened: false
                      });
                      alert("Chat has been deleted!");
                      // console.log(`User id: ${userProfile[index].user_id} & Chat id: ${room["chat_id"]}`)
                    });
                }}
              >
                {"Delete " + room["chat_name"] + " - id: #" + room["chat_id"]}
              </button>
            </li>
          </ul>
        </div>
      );
    });

    console.log(this.state.modalOpened);
    return (
      <div className="UserSettings-container">
        <div className="Settings-button">
          <img
            className="Settings-img"
            src="https://img.icons8.com/ios-filled/50/000000/settings.png"
            alt="settings"
            onClick={this.toggleSettings}
          />
        </div>

        <div className={this.state.modalOpened ? "show2" : "dontShow"}>
          <div className="Delete-chat-box">
            <h4 className="Settings-header">Click the following chat rooms to delete:</h4>
            {mappedRoomsToDelete}
          </div>

          <div className="Update-user-box">
            <form>
              <input
                className="Update-input"
                name="profilePic"
                value={profilePic}
                placeholder="New Profile Picture Link"
                onChange={event =>
                  this.universalChangeHandler(
                    event.target.name,
                    event.target.value)}
              />
              <button
              className="Update-pic"
              onClick={event => this.updateProfilePic(event)}>Update Picture</button>
            </form>
          </div>

          <button className="Close-settings" onClick={this.toggleSettings}>Close Settings</button>
        </div>
      </div>
    );
  }
}
