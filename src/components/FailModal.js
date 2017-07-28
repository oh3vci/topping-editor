import React, { Component } from 'react';

export default class FailModal extends Component {

  render() {
    const { modalIsOpen, closeModal } = this.props;

    if(!modalIsOpen) {
      return null;
    }

    return (
      <div className="backdrop-modal">
        <div className="fail-modal">
          <div className="modal-subtitle">
            저장하기
          </div>
          <div className="modal-contents">
            <div className="fail-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="47.137" height="47" viewBox="0 0 47.137 47">
                <path clip-rule="evenodd" fill="none" stroke="#6D6E70" strokeWidth=".971" strokeMiterlimit="10" d="M23.443 43.572c-4.567 0-9.14.011-13.707-.001-6.984-.021-10.831-6.687-7.345-12.749a7565.512 7565.512 0 0 1 13.812-23.92C19.714.841 27.385.834 30.9 6.892a7175.336 7175.336 0 0 1 13.991 24.221c3.209 5.583-.591 12.337-7.036 12.441-4.803.079-9.607.017-14.412.018zm.046-2.34c4.723 0 9.444.036 14.166-.01 4.845-.047 7.557-4.859 5.138-9.052-4.613-8.003-9.231-16.006-13.856-24.003-2.675-4.628-8.081-4.638-10.752-.016-4.589 7.929-9.17 15.862-13.743 23.8-2.622 4.554.098 9.262 5.351 9.274 4.564.012 9.13.003 13.696.007z"/>
                <path clip-rule="evenodd" fill="none" stroke="#6D6E70" strokeWidth=".971" strokeMiterlimit="10" d="M21.817 26.998a1.752 1.752 0 1 0 3.503 0l.656-10.736a2.409 2.409 0 1 0-4.818 0l.658 10.945M25.628 33.8a2.09 2.09 0 0 1-2.088 2.09 2.088 2.088 0 1 1 2.088-2.09z"/>
              </svg>
            </div>
            <div className="fail-inform">
              저장에 실패하였습니다!
            </div>
            <div className="fail-inform-detail">
              알 수 없는 오류가 발생하였습니다. 다시 시도해주세요
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
