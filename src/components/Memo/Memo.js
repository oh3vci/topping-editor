import React from 'react';

// The component we render when we encounter a hyperlink in the text
export default class Memo extends React.Component {
  render() {
    const {
      target = '_memo',
      className,
      dir,
      entityKey,
      offsetKey,
      getEditorState,
      setEditorState,
      contentState,
      decoratedText,
      ...otherProps
    } = this.props;
    
    const { content } = contentState.getEntity(this.props.entityKey).getData();


    const props = {
      ...otherProps,
      offsetKey,
      content,
      target,
      className,
    };

    return <a {...props} />;
  }
}
