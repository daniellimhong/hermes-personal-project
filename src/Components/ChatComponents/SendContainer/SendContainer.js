import React, { Component } from "react";
import axios from 'axios';
import Translate from "../Translate/Translate";
import MainInput from '../MainInput/MainInput';
import './SendContainer.scss'
const key = "trnsl.1.1.20190715T185811Z.89bba455db86641f.8bb7c95b0cf73a709dbc33c47ddeb76c2dfa1f72";


export default class SendContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
       output: ""
    };
    this.translate = this.translate.bind(this);
  }

  translate(textToTranslate, language){
    axios
    .get("https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+'&lang='+language+'&text='+textToTranslate)
    .then(res => {
        let output = res.data.text[0]
        this.setState({
            output
        });
    }).catch((error) => console.log(error))
}

  render() {
    const { username } = this.props
    // console.log(username)

    return (
      <div className="Send-container">
        <Translate 
        translate={this.translate} 
        output={this.state.output} 
        />
        <MainInput  
        username={username} 
        output={this.state.output}
        socket={this.props.socket}
        chatId={this.props.chatId}
        userId={this.props.userId}
        />
      </div>
    );
  }
}
