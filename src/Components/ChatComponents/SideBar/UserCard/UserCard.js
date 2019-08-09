import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserIcon from "../../../icons/default-user.svg";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
    this.logout = this.logout.bind(this);
  }

  // componentDidMount(){
  //! Get user profile info here?
  // }

  logout() {
    axios.get("/api/logout").then(res => {
      this.props.setUser(null);
      this.props.history.push("/");
    });
  }
  //! Show profile picture now, if null, show a default picture instead,
  render() {
    // console.log(
    //   this.props.user,
    //   this.props.userProfile,
    // );
    const { userProfile } = this.props;
    

    return (
      <div>
        UserCard Component
        <div className="img">
          {/* {
            (userProfile[0].profile_profile = null ? (
              <img src={UserIcon} alt="default-user" />
            ) : 
            ( //! figure out how to show profile pic
              <img src={UserIcon} alt="user-picture" />
            ))
          }  */}
        </div>
        <h3>User: {this.props.user.username}</h3>
        <button onClick={this.logout}>Sign out</button>
      </div>
    );
  }
}
//! Show profile picture, name here

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
