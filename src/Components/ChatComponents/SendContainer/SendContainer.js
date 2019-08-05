import React, { Component } from "react";
import Translate from "../Translate/Translate";
import MainInput from '../MainInput/MainInput';
import './SendContainer.scss'

export default class SendContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
       
    };
  }

  render() {
    const { dummyUser } = this.props
    return (
      <div className="Send-container">
        <Translate />
        <MainInput  dummyUser={dummyUser} />
      </div>
    );
  }
}
