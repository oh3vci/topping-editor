import React from 'react';

export default class SaveTime extends React.Component {

  render() {
    return (
      <div className="auto-save-time">
        {this.props.autoSaveTime}
      </div>
    );
  }

}
