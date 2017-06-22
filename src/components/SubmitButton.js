import React from 'react';
import axios from 'axios';
import { convertToRaw } from 'draft-js';


class SubmitButton extends React.Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit = () => {
    const { editorState, openModal } = this.props;
    const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const essayId = document.getElementById("essayId").innerHTML;
    let isFail = false;

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
      <div className="save-essay">
        <div className="submit-button">
          <button onClick={this.submit}>
            저장하기
          </button>
        </div>
        <div className="auto-save-time">
          {this.props.autoSaveTime}
        </div>
      </div>
    );
  }
}

export default SubmitButton;
