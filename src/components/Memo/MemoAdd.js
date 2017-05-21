import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import modifier from './modifiers';
import setKey from '../../utils/keyGenerator';


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

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({ open: false });
    }

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



/*
  handleLinkInput = (e, direct = false) => {
    if (direct !== true) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      this.props.focus();
      return;
    }
    const currentBlock = getCurrentBlock(editorState);
    let selectedEntity = '';
    let memoFound = false;
    currentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      selectedEntity = entityKey;
      return entityKey !== null && Entity.get(entityKey).getType() === 'MEMO';
    }, (start, end) => {
      let selStart = selection.getAnchorOffset();
      let selEnd = selection.getFocusOffset();
      if (selection.getIsBackward()) {
        selStart = selection.getFocusOffset();
        selEnd = selection.getAnchorOffset();
      }
      if (start === selStart && end === selEnd) {
        memoFound = true;
        const { content } = Entity.get(selectedEntity).getData();
        this.setState({
          showMemoInput: true,
          memoContent: content,
        }, () => {
          setTimeout(() => {
            this.urlinput.focus();
            this.urlinput.select();
          }, 0);
        });
      }
    });
    if (!memoFound) {
      this.setState({
        showMemoInput: true,
      }, () => {
        setTimeout(() => {
          this.urlinput.focus();
        }, 0);
      });
    }
  }
*/




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
            ref={(element) => { this.inputElement = element; }}
            type="text"
            className="addMemoInput"
            onKeyDown={(e) => this.onKeyDown(e)}
            onChange={this.changeText}
            placeholder="메모를 입력해주세요…"
            value={this.state.content}
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
