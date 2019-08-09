import React, { Component } from "react";
import UserSettings from './UserSettings/UserSettings';
import UserCard from "./UserCard/UserCard";
import RoomList from "./RoomList/RoomList";
import "./SideBar.scss"

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

//   componentDidMount() {
//     axios.post("/api/user_session").then(res => {
//       this.props.setUser(res.data);
//     });
//   }

  render() {
    const { userProfile } = this.props
    return (
    <div className="Sidebar-container">
        <UserSettings 
        userProfile={userProfile}
        />
        <UserCard 
        userProfile={userProfile}
        />
        <RoomList 
        mappedRooms={this.props.mappedRooms}
        />
 
    </div>
    )
  }
}
