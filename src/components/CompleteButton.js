import React from 'react';

export default class CompleteButton extends React.Component {
  render() {
    return (
      <div className="complete-button" onClick={this.props.openCompleteModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
          <g fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
            <path d="M25.006 25.324L12.13 20.977l27.612-10.581-9.896 27.477M25.006 25.324l4.84 12.549M25.006 25.324l14.736-14.928"/>
          </g>
        </svg>
        <p>완료</p>
      </div>
    );
  }
}
