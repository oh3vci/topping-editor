import React from 'react';

export default class BlockTypeSelect extends React.Component {

  state = {
    style: {
      transform: 'translate(-50%) scale(0)',
    }
  }

  onMouseEnter = () => {
    this.setState({
      style: {
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      },
    });
  }

  onMouseLeave = () => {
    this.setState({
      style: {
        transform: 'translate(-50%) scale(0)',
      },
    });
  }

  onMouseDown = (clickEvent) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
  }

  render() {
    const { getEditorState, setEditorState } = this.props;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onClick}
      >
        <div className="blockType">
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
              <path d="M11 6h2v12h-2z" />
              <path d="M18 11v2H6v-2z" />
            </g>
          </svg>
        </div>

        <div className="spacer" />
      </div>
    );
  }
}
