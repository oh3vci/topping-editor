import React from 'react';
import axios from 'axios';
import { convertToRaw } from 'draft-js';


export default class SaveButton extends React.Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit = () => {
    const { editorState, openModal, title, closeMemo } = this.props;
    closeMemo();
    const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const essayId = document.getElementById("essayId").innerHTML;
    let isFail = false;

    axios({
      method: 'post',
      url: '/editor/save',
      data: {
        "essayId": essayId,
        "title": title,
        raw
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/multipart/form-data; charset=UTF-8'
      }
    })
    .then((response) => {
      isFail = false;
      openModal(isFail);
    })
    .catch((error) => {
      isFail = true;
      openModal(isFail);
    });
  }

  render() {
    return (
      <div className="save-button" onClick={this.submit}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
          <g>
            <polygon fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="34.972,11.396 39.406,15.955 39.406,38.505 12.043,38.505 12.043,11.396"/>
            <rect x="16.729" y="11.396" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="18.179" height="4.369"/>
            <rect x="16.729" y="21.655" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" width="18.179" height="16.85"/>
            <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="19.454" y1="24.947" x2="32.186" y2="24.947"/>
          </g>
        </svg>
      </div>
    );
  }
}
