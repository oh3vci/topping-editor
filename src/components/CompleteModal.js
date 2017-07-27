import React, { Component } from 'react';

export default class CompleteModal extends Component {

  render() {
    const { modalIsOpen, closeModal } = this.props;

    if(!modalIsOpen) {
      return null;
    }

    return (
      <div className="backdrop-modal">
        <div className="complete-modal">
          <div className="modal-subtitle">
            저장하기
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
              저장되었습니다
            </div>
            <div className="complete-inform-detail">
              저장된 글은 마이페이지 > 작업중인 문서에서 확인 가능합니다</div>
            <div className="complete-link">
              <a href="https://www.topp-ing.com/mypage2">바로가기</a>
            </div>
            <div className="modal-close">
              <button onClick={closeModal}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
