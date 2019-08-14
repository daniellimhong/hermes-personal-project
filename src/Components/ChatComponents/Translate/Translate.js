import React, { Component } from 'react';
import TranslationForm from './TranslationForm';
import "../SendContainer/SendContainer.scss"


export default class Translate extends Component {
    render(){
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