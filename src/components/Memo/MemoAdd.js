import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import linkifyIt from 'linkify-it';
import modifier from './modifiers';

const linkify = linkifyIt();

export default class MemoAdd extends Component {
  // Start the popover closed
  state = {
    url: '',
    open: false,
    memoError: false
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onPopoverClick = () => {
    this.preventNextClose = true;
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.addMemo();
    }
  }

  setPosition = (toolbarElement) => {
    const position = {
      top: toolbarElement.offsetTop,
      left: toolbarElement.offsetLeft,
      width: toolbarElement.offsetWidth,
      transform: 'translate(-50%) scale(1)',
      transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
    };
    this.setState({ position });
  }

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      // eslint-disable-next-line react/no-find-dom-node
      const toolbarElement = ReactDOM.findDOMNode(this.props.inlineToolbarElement);
      console.log(toolbarElement);
      this.setPosition(toolbarElement);
      setTimeout(() => {
        setTimeout(() => this.inputElement.focus(), 0);
        this.setState({ open: true, });
      }, 0);
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({ open: false });
    }

    this.preventNextClose = false;
  };

  addMemo = () => {
    const { editorState, onChange } = this.props;
    const { url } = this.state;
    if (linkify.test(url)) {
      this.setState({ memoError: false });
      onChange(modifier(editorState, url));
      this.closePopover();
    } else {
      this.setState({ memoError: true });
    }
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  }

  render() {
    const popoverClassName = this.state.open ?
      "addMemoPopover" :
      "addMemoClosedPopover";

    const inputClassName = this.state.memoError ?
      "addMemoInput addMemoInputError" :
      "addMemoInput";

    return (
      <div className="addMemo">
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
          style={this.state.position}
        >
          <input
            ref={(element) => { this.inputElement = element; }}
            type="text"
            placeholder="메모를 입력해주세요 …"
            className={inputClassName}
            onChange={this.changeUrl}
            onKeyDown={(e) => this.onKeyDown(e)}
            value={this.state.url}
          />
          <button
            className="addMemoConfirmButton"
            type="button"
            onClick={this.addMemo}
          >
            +
          </button>
          <button
            className="addMemoConfirmButton"
            type="button"
            onClick={this.closePopover}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}
