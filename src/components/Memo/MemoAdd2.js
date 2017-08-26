import React, { Component } from 'react';
import modifier from './modifiers';
import setKey from '../../utils/keyGenerator';
import { getVisibleSelectionRect } from 'draft-js';
import Draggable from 'react-draggable';


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

export default class MemoAdd2 extends Component {
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

  openPopover = (memoContent) => {
    if (!this.state.open) {
      this.preventNextClose = true;
      let content = memoContent;

      let position;

      const relativeParent = getRelativeParent(this.inputElement.parentElement);
      const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);
      position = {
        top: (selectionRect.top - relativeRect.top) + toolbarHeight / 2,
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
        <div
          className={"edit-memo " + popoverClassName}
          ref={(element) => {
            this.toolbar = element;
          }}
        >
          <div className="memo-header">
            <div className="memo-icon">
            </div>
            <div className="memo-title">
              MEMO
            </div>
            <div className="memo-close" onClick={this.closePopover}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 357 357">
                <path d="M357 35.7L321.3 0 178.5 142.8 35.7 0 0 35.7l142.8 142.8L0 321.3 35.7 357l142.8-142.8L321.3 357l35.7-35.7-142.8-142.8z"/>
              </svg>
            </div>
          </div>

            <textarea
              maxLength="300"
              ref={(element) => { this.inputElement = element; }}
              type="text"
              className="addMemoInput"
              onKeyDown={(e) => this.onKeyDown(e)}
              onChange={this.changeText}
              placeholder="메모를 입력해주세요"
              value={this.state.content}
            />

          <div className="memo-button">
            <div className="memo-button-wrapper">
              <button className="memo-delete-button" onClick={this.addMemo}>확인</button>
            </div>
          </div>
        </div>
    );
  }
}
