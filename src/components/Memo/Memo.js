import React from 'react';
import setKey from '../../utils/keyGenerator';

// The component we render when we encounter a hyperlink in the text
export default class Memo extends React.Component {

  render() {
    const {
      entityKey,
      offsetKey,
      getEditorState,
      setEditorState,
      contentState,
      decoratedText,
      ...otherProps
    } = this.props;

    const { content, memoKey } = contentState.getEntity(this.props.entityKey).getData();


    const props = {
      ...otherProps,
      className: memoKey,
      content,
    };

    return <memo {...props} />;
  }
}
