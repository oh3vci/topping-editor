import {
  RichUtils,
  Entity,
  EditorState,
} from 'draft-js';

export default (editorState, content) => {
  let entityKey = null;
  let newContent = content;
  if (content !== '') {
    entityKey = Entity.create('MEMO', 'MUTABLE', { content: newContent });  
  }

  const newEditorState = RichUtils.toggleLink(
    editorState,
    editorState.getSelection(),
    entityKey,
  );
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );
};
