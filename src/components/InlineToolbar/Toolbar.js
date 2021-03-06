import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';

// TODO make toolbarHeight to be determined or a parameter
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

export default class Toolbar extends React.Component {

  state = {
    isVisible: false,
  }

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
  }

  onVisibilityChanged = (isVisible) => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    setTimeout(() => {
      let position;
      if (isVisible) {
        const relativeParent = getRelativeParent(this.toolbar.parentElement);
        const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
        const selectionRect = getVisibleSelectionRect(window);
        position = {
          // padding 크기 만큼 더해준다.
          //top: (selectionRect.top - relativeRect.top) - toolbarHeight,
          top: (selectionRect.top - relativeRect.top) + (toolbarHeight / 3),
          left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        };
      } else {
        position = { transform: 'translate(-50%) scale(0)' };
      }
      this.setState({ position });
    }, 0);
  }

  render() {
    const { store } = this.props;
    return (
      <div
        className="toolbar"
        style={this.state.position}
        ref={(toolbar) => { this.toolbar = toolbar; }}
      >
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            handleMemo={store.getItem('handleMemo')}
          />
        ))}
      </div>
    );
  }
}
