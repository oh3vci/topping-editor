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
      <div className="save-button" data-button-tooltip="저장하기" onClick={this.submit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M34.972 11.396l4.434 4.559v22.55H12.043V11.396z"/>
            <path d="M16.729 11.396h18.179v4.369H16.729zM16.729 21.655h18.179v16.85H16.729zM19.454 24.947h12.732"/>
          </g>
        </svg>
      </div>
    );
  }
}
