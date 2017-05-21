import React from 'react';
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import { Button, Icon } from 'semantic-ui-react'

class SubmitButton extends React.Component {

  submit = () => {
    const { editorState } = this.props;
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
      alert("저장이 완료되었습니다.");
    })
    .catch((error) => {
      alert("저장이 실패하였습니다.");
    });
  }

  render() {
    return (
      <div className="submit_button">
        <button onClick={this.submit}>
          저장하기
        </button>
      </div>
    );
  }
}

export default SubmitButton;
