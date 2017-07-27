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
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="47.137px" height="47px" viewBox="0 0 47.137 47" enableBackground="new 0 0 47.137 47">
                <g>
                	<g>
                		<path fillRule="evenodd" clipRule="evenodd" fill="none" stroke="#6D6E70" strokeWidth="0.9712" strokeMiterlimit="10" d="
                			M23.443,43.572c-4.567,0-9.14,0.011-13.707-0.001C2.752,43.55-1.095,36.884,2.391,30.822C6.98,22.84,11.585,14.867,16.203,6.902
                			c3.511-6.061,11.182-6.068,14.697-0.01c4.678,8.065,9.344,16.137,13.991,24.221c3.209,5.583-0.591,12.337-7.036,12.441
                			C33.052,43.633,28.248,43.571,23.443,43.572z M23.489,41.232c4.723,0,9.444,0.036,14.166-0.01
                			c4.845-0.047,7.557-4.859,5.138-9.052c-4.613-8.003-9.231-16.006-13.856-24.003c-2.675-4.628-8.081-4.638-10.752-0.016
                			c-4.589,7.929-9.17,15.862-13.743,23.8c-2.622,4.554,0.098,9.262,5.351,9.274C14.357,41.237,18.923,41.228,23.489,41.232z"/>
                	</g>
                	<path fillRule="evenodd" clipRule="evenodd" fill="none" stroke="#6D6E70" strokeWidth="0.9712" strokeMiterlimit="10" d="
                		M21.817,26.998c0,0.967,0.783,1.753,1.751,1.753c0.967,0,1.752-0.786,1.752-1.753l0.656-10.736c0-1.332-1.077-2.411-2.409-2.411
                		c-1.33,0-2.409,1.08-2.409,2.411l0.658,10.945"/>
                	<path fillRule="evenodd" clipRule="evenodd" fill="none" stroke="#6D6E70" strokeWidth="0.9712" strokeMiterlimit="10" d="
                		M25.628,33.8c0,1.153-0.935,2.09-2.088,2.09c-1.152,0-2.087-0.937-2.087-2.09c0-1.151,0.935-2.086,2.087-2.086
                		C24.693,31.713,25.628,32.648,25.628,33.8z"/>
                </g>
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
