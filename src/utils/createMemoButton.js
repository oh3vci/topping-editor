import React, { Component } from 'react';

export default ({ children }) => (
  class memoButton extends Component {

    activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.handleMemo();
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
      return (
        <div
          className="buttonWrapper"
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className="button"
            onClick={this.activate}
            type="button"
            children={children}
          />
        </div>
      );
    }
  }
);
