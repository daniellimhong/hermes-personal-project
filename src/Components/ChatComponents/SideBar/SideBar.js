import React, { Component } from "react";
import UserSettings from "./UserSettings/UserSettings";
import UserCard from "./UserCard/UserCard";
import RoomList from "./RoomList/RoomList";
import "./SideBar.scss";
import MenuIcon from "../../icons/menu.svg";

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleSideBar = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      };
    });
  };

  render() {
    console.log(this.state.isOpen)
    const { userProfile } = this.props;
    return (
      <div className="Toggle-sidebar">
        <button className="Menu-button">
        <img className="Menu-img" src={MenuIcon} onClick={this.toggleSideBar} alt="" />
        </button>
        <div className={this.state.isOpen ? "show" : ""}>
          <div className="Sidebar-container">
          <UserSettings 
          userProfile={userProfile} 
          getUserProfileFn={this.props.getUserProfileFn}
          userId={this.props.userId}
          />
          <UserCard 
          userProfile={userProfile} 
          getUserProfileFn={this.props.getUserProfileFn}/>
          <RoomList mappedRooms={this.props.mappedRooms} />
          </div>
        </div>
      </div>
    );
  }
}
