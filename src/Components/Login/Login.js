import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   user: null,
      typedUser: "",
      password: "",
      loading: false
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({
      loading: true
    });
    axios
      .post("/api/login", {
        username: this.state.typedUser,
        password: this.state.password
      })
      .then(res => {
        this.props.setUser(res.data);
        this.props.history.push("/chat");
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { typedUser, password } = this.state;
    // console.log('From redux ===>', this.props.user)

    return (
      <div className="Login-container">
        <input
          name="typedUser"
          value={typedUser}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="username"
        />
        <input
          name="password"
          value={password}
          type="password"
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="password"
        />
        <div>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState){
    return reduxState
}

const mapDispatchToProps = {
    setUser
}

const connectInvoked = connect(
    mapReduxStateToProps,
    mapDispatchToProps
);

export default withRouter(connectInvoked(Login));