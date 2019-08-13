import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Chat from "./Components/ChatComponents/Chat";
import { setUser } from "./redux/reducer";
import { connect } from "react-redux";
import "./App.css";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios.post("/api/user_session").then(res => {
      this.props.setUser(res.data);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">  
        <div className="Landing-page">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat" component={Chat}/> 
        </Switch>
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

export default connectInvoked(App);
