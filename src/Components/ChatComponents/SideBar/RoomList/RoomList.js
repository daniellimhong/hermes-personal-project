import React, { Component } from "react";
import "../SideBar.scss";

export default class RoomList extends Component {

  render() {
    return <div>{this.props.mappedRooms}</div>;
  }
}
// ! add hover effect after mvp
// ! add preview messages, last message of the chat after mvp
// * Component Did Mount the messages and show the last message sent
