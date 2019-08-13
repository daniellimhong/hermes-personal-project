import React, { Component } from 'react';
import TranslationForm from './TranslationForm';
import "../SendContainer/SendContainer.scss"


export default class Translate extends Component {
    render(){
        console.log(this.props.output)
        return (
            <div>
                <TranslationForm 
                translate={this.props.translate} 
                output={this.props.output}
                />
            </div>
        )
    }
}