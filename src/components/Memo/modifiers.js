import {
  RichUtils,
  Entity,
  EditorState,
} from 'draft-js';

export default (editorState, content, id) => {
  let entityKey = null;
  let newContent = content;
  let newId = id;
  if (content !== '') {
    entityKey = Entity.create('MEMO', 'MUTABLE', { content: newContent, id: newId });  
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
