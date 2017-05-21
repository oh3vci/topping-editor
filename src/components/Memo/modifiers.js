import {
  RichUtils,
  Entity,
  EditorState,
} from 'draft-js';

export default (editorState, content, memoKey) => {
  let entityKey = null;
  let newContent = content;
  let newMemoKey = memoKey;
  if (content !== '') {
    entityKey = Entity.create('MEMO', 'MUTABLE', { content: newContent, memoKey: newMemoKey });
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
