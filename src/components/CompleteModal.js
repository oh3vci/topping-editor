import React from 'react';
import { convertToRaw } from 'draft-js';
import axios from 'axios';


export default class CompleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.complete = this.complete.bind(this);
  }

  complete = () => {
    const { editorState, title } = this.props;

    const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const essayId = document.getElementById("essayId").innerHTML;

    axios({
      method: 'post',
      url: '/editor/complete',
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
      alert("첨삭이 완료되었습니다!");
      window.location.href = "/mypage2";
    })
    .catch((error) => {
      this.props.closeModal();
      alert("알 수 없는 오류가 발생했습니다!");
    });
  }

  render() {
    const { closeModal } = this.props;

    return (
      <div className="backdrop-modal">
        <div className="complete-modal">
          <div className="modal-subtitle">
            첨삭완료
          </div>
          <div className="modal-contents">
            <div className="complete-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="47.137px" height="47px" viewBox="0 0 47.137 47" enableBackground="new 0 0 47.137 47">
                <g>
                	<polyline fillRule="evenodd" clipRule="evenodd" fill="none" stroke="#17c6e2" strokeWidth="3" strokeMiterlimit="10" points="13.788,22.813 21.718,33.174 33.349,13.826"/>
                	<circle fill="none" stroke="#17c6e2" strokeMiterlimit="10" cx="23.568" cy="23.501" r="22.532"/>
                	<circle fill="none" stroke="#17c6e2" strokeWidth="0.8755" strokeMiterlimit="10" cx="23.567" cy="23.501" r="19.726"/>
                </g>
              </svg>
            </div>
            <div className="complete-inform">
              첨삭을 완료 하시겠습니까?
            </div>
            <div className="complete-inform-detail">
              한 번 첨삭완료를 하시면 더 이상 수정하실 수 없습니다!
            </div>
            <div className="modal-close">
              <button onClick={this.complete}>
                예
              </button>
              <button onClick={closeModal}>
                아니요
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
