import React from 'react';
import axios from 'axios';

export default class OriginButton extends React.Component {

  constructor(props) {
    super(props);

    this.showOrigin = this.showOrigin.bind(this);
  }

  showOrigin = () => {
    const essayId = document.getElementById("essayId").innerHTML;

    axios({
      method: 'post',
      url: '/editor/origin',
      data: {
        "essayId": essayId
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/multipart/form-data; charset=UTF-8'
      }
    })
    .then((response) => {

    })
    .catch((error) => {

    });
  }

  render() {
    return (
      <div className="origin-button" data-button-tooltip="원본보기" onClick={this.showOrigin}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M14.859 12.916h14.523l6.105 6.579v19.859H14.859z"/>
            <path d="M29.382 12.916v6.579h6.105M19.038 26.787H31.16M19.038 30.343H31.16M19.038 33.812H31.16M25.255 12.917a2.938 2.938 0 1 0-5.86-.322v8.146h.002l-.002.038c0 1.088.89 1.971 1.986 1.971s1.985-.883 1.985-1.971l-.001-.038h.001v-5.397"/>
          </g>
        </svg>
      </div>
    );
  }
}
