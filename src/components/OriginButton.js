import React from 'react';
import axios from 'axios';

export default class OriginButton extends React.Component {

  constructor(props) {
    super(props);

    this.getCookie = this.getCookie.bind(this);
    this.showOrigin = this.showOrigin.bind(this);
  }

  getCookie = (name) => {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  showOrigin = () => {
    const originEssayId = document.getElementById("originEssayId").innerHTML;
    let csrftoken = this.getCookie("csrftoken");

    let form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = "/reader";
    form.style.display = "none";

    let input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "csrfmiddlewaretoken";
    input1.value = csrftoken;

    let input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "essayId";
    input2.value = originEssayId;

    form.appendChild(input1);
    form.appendChild(input2);

    document.body.appendChild(form);

    form.submit();
  }

  render() {
    return (
      <div className="origin-button" onClick={this.showOrigin}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M14.859 12.916h14.523l6.105 6.579v19.859H14.859z"/>
            <path d="M29.382 12.916v6.579h6.105M19.038 26.787H31.16M19.038 30.343H31.16M19.038 33.812H31.16M25.255 12.917a2.938 2.938 0 1 0-5.86-.322v8.146h.002l-.002.038c0 1.088.89 1.971 1.986 1.971s1.985-.883 1.985-1.971l-.001-.038h.001v-5.397"/>
          </g>
        </svg>
        <p>원본보기</p>
      </div>
    );
  }
}
