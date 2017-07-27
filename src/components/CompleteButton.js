import React from 'react';

export default class CompleteButton extends React.Component {

  render() {
    return (
      <div className="complete-button" onClick={this.props.openModal}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
          <g>
            <g>
              <polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="25.006,25.324 12.13,20.977 39.742,10.396 29.846,37.873"/>
              <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25.006" y1="25.324" x2="29.846" y2="37.873"/>
            </g>
            <line fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="25.006" y1="25.324" x2="39.742" y2="10.396"/>
          </g>
        </svg>
      </div>
    );
  }
}
