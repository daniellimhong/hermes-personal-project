import React, { Component } from "react";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import MessageList from './MessageList/MessageList'
import SendContainer from './SendContainer/SendContainer';
// import "./Chat.scss";


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dummyUser: "daniel" //dummy username
    };
  }

  render() {
    return (
      <div className="Chat-container">
        <div>
          <MessageList />
          <SendContainer dummyUser={this.state.dummyUser}/>
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
