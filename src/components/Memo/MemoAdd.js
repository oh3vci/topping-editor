import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import modifier from './modifiers';
import setKey from '../../utils/keyGenerator';
import { getVisibleSelectionRect } from 'draft-js';


const toolbarHeight = 42;

const getRelativeParent = (element) => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

export default class MemoAdd extends Component {
  // Start the popover closed
  state = {
    content: '',
    open: false,
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
    } else if (e.keyCode === 27) {
      this.closePopover();
    }
  }
/*
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
      const toolbarElement = ReactDOM.findDOMNode(this.props.inlineToolbarElement);
      this.setPosition(toolbarElement);
      setTimeout(() => {
        setTimeout(() => this.inputElement.focus(), 0);
        this.setState({ open: true, });
      }, 0);
    }
  };
*/
  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      let content = this.props.content;

      let position;

      const relativeParent = getRelativeParent(this.inputElement.parentElement);
      const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);
      position = {
        top: (selectionRect.top - relativeRect.top) - toolbarHeight,
        left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
      this.setState({ position });
      setTimeout(() => {
        setTimeout(() => this.inputElement.focus(), 0);
        this.setState({ open: true });
        if (content) {
          this.setState({ content: content });
        }
      }, 0);
    }
  }

  closePopover = () => {
    this.setState({
      content: '',
      open: false
    });

    this.preventNextClose = false;
  };

  addMemo = () => {
    const { editorState, onChange } = this.props;
    const { content } = this.state;
    const memoKey = setKey();

    onChange(modifier(editorState, content, memoKey));

    this.setState({
      content: '',
    });

    this.closePopover();
  };

  changeText = (evt) => {
    this.setState({ content: evt.target.value });
  };


  render() {
    const { open, position } = this.state;
    const popoverClassName = open ?
      "addMemoPopover" :
      "addMemoClosedPopover";

    return (
      <div className="addMemo">
        <div
          className={popoverClassName}
          onClick={this.onPopoverClick}
          style={position}
        >
          <input
            maxLength="300"
            ref={(element) => { this.inputElement = element; }}
            type="text"
            className="addMemoInput"
            onKeyDown={(e) => this.onKeyDown(e)}
            onChange={this.changeText}
            placeholder="메모를 입력해주세요"
            value={this.state.content}
          />
          <span
            className="addMemoCloseButton"
            onClick={this.closePopover}
          >
            x
          </span>
        </div>
      </div>
    );
  }
}
