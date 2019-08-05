import React, { Component } from 'react';
import axios from 'axios';
import TranslationForm from './TranslationForm';
import "../SendContainer/SendContainer.scss"
const key = "trnsl.1.1.20190715T185811Z.89bba455db86641f.8bb7c95b0cf73a709dbc33c47ddeb76c2dfa1f72";


export default class Translate extends Component {
    constructor(props){
        super(props)

        this.state = {
            output: ""
        }
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

    render(){
        console.log(this.state.output)
        return (
            <div>
                <TranslationForm translate={this.translate} output={this.state.output}/>
                {/* <p>{this.state.output}</p> */}
            </div>
        )
    }
}