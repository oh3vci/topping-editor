import React from 'react';
import ExitButton from './ExitButton';
import SaveTime from './SaveTime';
import SaveButton from './SaveButton';
import OriginButton from './OriginButton';
import CompleteButton from './CompleteButton';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    }
  }

  componentWillMount() {
    window.onscroll = () => {
      if (window.scrollY >= 120) {
        this.setState({
          active: true,
        })
      } else {
        this.setState({
          active: false,
        })
      }
    }
  }


  render() {
    const { openExitModal, title, autoSaveTime, editorState, openModal, closeMemo } = this.props;
    const classes = 'navtoolbar' + (this.state.active ? ' fixed' : '');

    return (
      <div
        className={classes}
      >
        <ExitButton
          openExitModal={openExitModal}
        />
        <CompleteButton />
        <OriginButton />
        <SaveButton
          title={title}
          editorState={editorState}
          openModal={openModal}
          closeMemo={closeMemo}
        />
        <SaveTime
          autoSaveTime={autoSaveTime}
        />
      </div>
    );
  }
}
