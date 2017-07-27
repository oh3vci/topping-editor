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
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="47.137px" height="47px" viewBox="0 0 47.137 47" enableBackground="new 0 0 47.137 47">
                <g>
                	<polyline fillRule="evenodd" clipRule="evenodd" fill="none" stroke="#17c6e2" strokeWidth="3" strokeMiterlimit="10" points="13.788,22.813 21.718,33.174 33.349,13.826"/>
                	<circle fill="none" stroke="#17c6e2" strokeMiterlimit="10" cx="23.568" cy="23.501" r="22.532"/>
                	<circle fill="none" stroke="#17c6e2" strokeWidth="0.8755" strokeMiterlimit="10" cx="23.567" cy="23.501" r="19.726"/>
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
