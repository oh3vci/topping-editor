import React, { Component } from 'react';

export default class CompleteModal extends Component {
  constructor(props) {
    super(props);
  }

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
              <svg version="1.1" onClick={this.submit} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <path d="M12,1.437C6.169,1.437,1.438,6.169,1.438,12c0,5.831,4.732,10.563,10.563,10.563
                  c5.83,0,10.563-4.732,10.563-10.563C22.563,6.169,17.83,1.437,12,1.437z M18.363,7.31l-6.896,10.426
                  c-0.161,0.246-0.431,0.398-0.718,0.424c-0.025,0-0.042,0-0.068,0c-0.27,0-0.524-0.111-0.701-0.313l-4.259-4.766
                  c-0.347-0.389-0.313-0.99,0.076-1.336c0.389-0.346,0.988-0.313,1.335,0.076l3.439,3.862l6.219-9.405
                  c0.287-0.439,0.871-0.558,1.311-0.271C18.531,6.288,18.65,6.871,18.363,7.31z"/>
              </svg>
            </div>
            <div className="complete-inform">
              저장되었습니다
            </div>
            <div className="complete-inform-detail">
              저장된 글은 마이페이지 - 작업중인 문서에서 확인 가능합니다</div>
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
