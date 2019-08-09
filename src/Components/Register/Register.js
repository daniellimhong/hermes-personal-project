import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
// import "./Login.scss";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      typedUser: "",
      password: "",
      email: ""
    };
    this.register = this.register.bind(this);
  }

  register() {
    axios
      .post("/api/register", {
        username: this.state.typedUser,
        password: this.state.password,
        email: this.state.email
      })
      .then(res => {
        this.props.setUser(res.data);
        this.props.history.push("/");
      });
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { typedUser, password, email } = this.state;
    return (
      <div className="Register-container">
        <input
          name="typedUser"
          value={typedUser}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="username"
        />
        <input
          name="email"
          value={email}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={event =>
            this.universalChangeHandler(event.target.name, event.target.value)
          }
          placeholder="password"
        />
        <div>
          <button onClick={this.register}>Register</button>
        </div>
      </div>
    );
  }
}
//! Notes: need to create if statements to account for username errors (username already taken)
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

export default connectInvoked(Register);