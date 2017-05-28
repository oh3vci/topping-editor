import React from 'react';
import axios from 'axios';
import { convertToRaw } from 'draft-js';


class SubmitButton extends React.Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  submit = () => {
    const { editorState, openModal } = this.props;
    const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const essayId = document.getElementById("essayId").innerHTML;

    axios({
      method: 'post',
      url: '/editor/save',
      data: {
          raw,
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
      openModal();
    })
    .catch((error) => {
      alert("저장에 실패했습니다!");
    });
  }


  render() {
    return (
      <div className="submit-button">
        <button onClick={this.submit}>
          저장하기
        </button>
      </div>
    );
  }
}

export default SubmitButton;
