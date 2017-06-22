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
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <path d="M11.999,1.438C6.166,1.438,1.438,6.167,1.438,12s4.729,10.562,10.562,10.562S22.563,17.834,22.563,12
                	S17.832,1.438,11.999,1.438z M18.688,17.008l-1.683,1.682L12,13.684l-5.007,5.006l-1.683-1.682L10.318,12L5.312,6.994l1.682-1.683
                	L12,10.318l5.008-5.006l1.682,1.682L13.683,12L18.688,17.008z"/>
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
