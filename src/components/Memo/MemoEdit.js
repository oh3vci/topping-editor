import React from 'react';
import PropTypes from 'prop-types';
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

export default class MemoEdit extends React.Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    blockKey: PropTypes.string.isRequired,
    entityKey: PropTypes.string.isRequired,
    removeMemo: PropTypes.func.isRequired,
    editMemo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: {},
    };
    this.renderedOnce = false;
  }

  componentDidMount() {
    setTimeout(this.calculatePosition, 0);
  }

  shouldComponentUpdate(newProps) {
    if (this.renderedOnce) {
      const ret = (this.props.blockKey !== newProps.blockKey || this.props.entityKey !== newProps.entityKey);
      if (ret) {
        this.renderedOnce = false;
      }
      return ret;
    }
    this.renderedOnce = true;
    return true;
  }

  componentDidUpdate() {
    setTimeout(this.calculatePosition, 0);
  }

  calculatePosition = () => {
    if (!this.toolbar) {
      return;
    }
    const relativeParent = getRelativeParent(this.toolbar.parentElement);
    const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : window.document.body.getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);
    if (!selectionRect) {
      return;
    }
    const position = {
      top: (selectionRect.top - relativeRect.top) - toolbarHeight,
      left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
      transform: 'translate(-50%) scale(1)',
    };
    this.setState({ position });
  };

  removeMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeMemo(this.props.blockKey, this.props.entityKey);
  };

  editMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.editMemo(this.props.blockKey, this.props.entityKey);
  };

  closeMemo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeMemo();
  }


  render() {
    let content = this.props.content;

    return (
      <Draggable>
        <div
          className="edit-memo"
          style={this.state.position}
          ref={(element) => {
            this.toolbar = element;
          }}
        >
          <div className="memo-close" onClick={this.closeMemo}>X</div>
          <div
            className="memo-content"
            title={this.props.content}
          >
            {content}
          </div>
          <div className="memo-button">
            <div className="memo-button-wrapper">
              <button className="memo-delete-button" onClick={this.removeMemo}>삭제</button>
              <button className="memo-edit-button" onClick={this.editMemo}>수정</button>
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}
