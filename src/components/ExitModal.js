import React, { Component } from 'react';

export default class ExitModal extends Component {
  exit = () => {
    window.location.href = "https://www.topp-ing.com/mypage2";
  }

  render() {
    const { closeModal } = this.props;

    return (
      <div className="backdrop-modal">
        <div className="complete-modal">
          <div className="modal-subtitle">
            나가기
          </div>
          <div className="modal-contents">
            <div className="complete-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <path d="M12,1.437C6.169,1.437,1.438,6.169,1.438,12c0,5.831,4.732,10.563,10.563,10.563
                  c5.83,0,10.563-4.732,10.563-10.563C22.563,6.169,17.83,1.437,12,1.437z M18.363,7.31l-6.896,10.426
                  c-0.161,0.246-0.431,0.398-0.718,0.424c-0.025,0-0.042,0-0.068,0c-0.27,0-0.524-0.111-0.701-0.313l-4.259-4.766
                  c-0.347-0.389-0.313-0.99,0.076-1.336c0.389-0.346,0.988-0.313,1.335,0.076l3.439,3.862l6.219-9.405
                  c0.287-0.439,0.871-0.558,1.311-0.271C18.531,6.288,18.65,6.871,18.363,7.31z"/>
              </svg>
            </div>
            <div className="complete-inform">
              문서 수정을 종료하시겠습니까?
            </div>

            <div className="modal-close">
              <button onClick={this.exit}>
                네
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
