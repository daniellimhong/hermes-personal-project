import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import "./Register.scss";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      typedUser: "",
      password: "",
      email: ""
    };
    // this.register = this.register.bind(this);
  }

  register = () => {
    axios
      .post("/api/register", {
        username: this.state.typedUser,
        password: this.state.password,
        email: this.state.email
      })
      .then(res => {
        this.props.setUser(res.data);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  goToLogin = () => {
    this.props.history.push("/");
  }

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { typedUser, password, email } = this.state;
    return (
      <div className="Register-body">
        <h2 className="Title">Create New Account</h2>
        <div className="Register-container">
          <input
          className="Input"
            name="typedUser"
            value={typedUser}
            onChange={event =>
              this.universalChangeHandler(event.target.name, event.target.value)
            }
            placeholder="username"
          />
          <input
          className="Input"
            name="email"
            value={email}
            onChange={event =>
              this.universalChangeHandler(event.target.name, event.target.value)
            }
            placeholder="email"
          />
          <input
          className="Input"
            type="password"
            name="password"
            value={password}
            onChange={event =>
              this.universalChangeHandler(event.target.name, event.target.value)
            }
            placeholder="password"
          />
          <div>
            <button className="Button" onClick={this.register}>Register</button>
            <nav className="Nav">
              <section>
              <p>Already a user? </p>
              <p className="Login-here" onClick={this.goToLogin}>Login here</p>
              </section>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
//! Notes: need to create if statements to account for username errors (username already taken)
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

export default connectInvoked(Register);
