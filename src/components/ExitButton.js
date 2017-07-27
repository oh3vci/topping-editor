import React from 'react';

export default class ExitButton extends React.Component {

  render() {
    return (
      <div className="exit-button" onClick={this.props.openExitModal}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
          <g>
            <polygon fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="11.205,10.541 23.232,14.211 23.232,39.359 11.205,35.532"/>
            <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M11.205,35.299"/>
            <polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="32.448,28.387 32.448,35.299 23.232,35.299"/>
            <polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="11.205,35.299 11.205,10.541 32.448,10.541 32.448,16.281"/>
            <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="40.297" y1="22.373" x2="29.051" y2="22.373"/>
            <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M37.173,19.093"/>
            <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M37.173,18.86"/>
            <polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="36.888,18.86 40.321,22.373 36.888,25.886"/>
          </g>
        </svg>
      </div>
    );
  }
}
