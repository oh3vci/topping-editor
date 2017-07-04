import React from 'react';

class ExitButton extends React.Component {

  render() {
    return (
      <div className="exit-essay">
        <div className="exit-button">
          <button onClick={this.props.openModal}>
            나가기
          </button>
        </div>
      </div>
    );
  }
}

export default ExitButton;
