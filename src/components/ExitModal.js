import React, { Component } from 'react';

export default class ExitModal extends Component {
  exit = () => {
    window.location.href = "https://www.topp-ing.com/mypage2";
  }

  render() {
    const { closeModal } = this.props;

    return (
      <div className="backdrop-modal">
        <div className="exit-modal">
          <div className="modal-subtitle">
            나가기
          </div>
          <div className="modal-contents">
            <div className="exit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="47.137" height="47" viewBox="0 0 47.137 47">
                <g fill="none" stroke="#17c6e2" strokeMiterlimit="10">
                  <path clipRule="evenodd" strokeWidth="3" d="M13.788 22.813l7.93 10.361 11.631-19.348"/>
                  <circle cx="23.568" cy="23.501" r="22.532"/>
                  <circle strokeWidth=".875" cx="23.567" cy="23.501" r="19.726"/>
                </g>
              </svg>
            </div>
            <div className="exit-inform">
              문서 수정을 종료하시겠습니까?
            </div>
            <div className="modal-close">
              <button onClick={this.exit}>
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
