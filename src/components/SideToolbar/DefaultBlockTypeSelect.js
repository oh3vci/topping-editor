import React from 'react';

import {
  BoldButton,
  ItalicButton,
} from '../Buttons'; // eslint-disable-line import/no-unresolved

import BlockTypeSelect from './BlockTypeSelect';

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    structure={[
      BoldButton,
      ItalicButton,
    ]}
  />
);

export default DefaultBlockTypeSelect;
