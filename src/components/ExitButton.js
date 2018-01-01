import React from 'react';

export default class ExitButton extends React.Component {

  render() {
    return (
      <div className="exit-button" onClick={this.props.openExitModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M11.205 10.541l12.027 3.67v25.148l-12.027-3.827zM32.448 28.387v6.912h-9.216"/>
            <path d="M11.205 35.299V10.541h21.243v5.74M40.297 22.373H29.051M36.888 18.86l3.433 3.513-3.433 3.513"/>
          </g>
        </svg>
        <p>나가기</p>
      </div>
    );
  }
}
