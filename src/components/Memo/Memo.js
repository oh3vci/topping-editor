import React from 'react';

// The component we render when we encounter a hyperlink in the text
export default class Memo extends React.Component {

  render() {
    const {
      offsetKey,
      entityKey,
      getEditorState,
      setEditorState,
      contentState,
      decoratedText,
      ...otherProps
    } = this.props;

    const { content, memoKey } = contentState.getEntity(this.props.entityKey).getData();

    const props = {
      className: memoKey,
      content,
      ...otherProps,
    };

    return <memo {...props} />;
  }
}
