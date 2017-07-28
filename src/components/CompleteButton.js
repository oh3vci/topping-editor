import React from 'react';
import axios from 'axios';

export default class CompleteButton extends React.Component {

  constructor(props) {
    super(props);

    this.complete = this.complete.bind(this);
  }

  complete = () => {
    const essayId = document.getElementById("essayId").innerHTML;

    axios({
      method: 'post',
      url: '/editor/complete',
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
      <div className="complete-button" data-button-tooltip="첨삭완료" onClick={this.complete}>  
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M25.006 25.324L12.13 20.977l27.612-10.581-9.896 27.477M25.006 25.324l4.84 12.549M25.006 25.324l14.736-14.928"/>
          </g>
        </svg>
      </div>
    );
  }
}
