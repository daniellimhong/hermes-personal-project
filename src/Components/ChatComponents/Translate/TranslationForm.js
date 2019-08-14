import React, { Component } from "react";
import "../SendContainer/SendContainer.scss"


export default class TranslationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textToTranslate: "",
      langauge: "km"
    };
    this.translate = this.translate.bind(this);
  }

  translate(e) {
    e.preventDefault();
    let textToTranslate = this.refs.textToTranslate.value;
    let langauge = this.refs.language.value;
    this.props.translate(textToTranslate, langauge);
    this.refs.textToTranslate.value = "";
    };

  render() {
    const { output } = this.props
    return (
      <div>
        <form className="Translate-form" onSubmit={this.translate}>
          <input 
          className="Translate-input"
          type="text" 
          placeholder="Text to translate" 
          ref="textToTranslate"
          />
        
        <input 
        className="Translate-output"
        type="text"
        placeholder="Output"
        value={output}
        autoComplete="off"
        />

          <select className="Ln-selector" ref="language">
            <option value="km">Khmer</option>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="zh">Chinese (Manderin)</option>
            <option value="tl">Tagalog</option>
            <option value="vi">Vietnamese</option>
            <option value="ceb">Cebuano</option>
            <option value="th">Thai</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
            <option value="it">Italian</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="ru">Russian</option>
          </select>
          <input className="Translate-button" type="submit" value="Translate" />
          
        </form>
      </div>
    );
  }
}
