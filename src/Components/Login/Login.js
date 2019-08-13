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
      password: ""
    };
    // this.login = this.login.bind(this);
  }

  login = () => {
    axios
      .post("/api/login", {
        username: this.state.typedUser,
        password: this.state.password
      })
      .then(res => {
        this.props.setUser(res.data);
        this.props.history.push("/chat");
      });
  };

  goToRegister = () => {
    this.props.history.push("/register");
  };

  universalChangeHandler(property, value) {
    this.setState({
      [property]: value
    });
  }

  render() {
    const { typedUser, password } = this.state;
    // console.log('From redux ===>', this.props.user)

    return (
      <div className="Login-body">
        <div className="Header-container">
          <h2 className="Main-header">Hermes</h2>
        </div>
        <div className="Text-container">
        <p className="Landing-description">
            On-the-fly chatrooms with translation features. Goodbye, language
            barriers.
          </p>
        </div>
        <div className="Login-container">
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
            name="password"
            value={password}
            type="password"
            onChange={event =>
              this.universalChangeHandler(event.target.name, event.target.value)
            }
            placeholder="password"
          />
          <div>
            <button className="Button" onClick={this.login}>Login</button>
            <nav className="Nav">
              <section>
              <p>New user? </p>
              <p className="Register-here" onClick={this.goToRegister}>Register here</p>
              </section>
            </nav>
          </div>

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

export default withRouter(connectInvoked(Login));
