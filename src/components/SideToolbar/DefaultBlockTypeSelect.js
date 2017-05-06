import React from 'react';

import {
  AlignLeftButton,
  AlignCenterButton,
  AlignRightButton,
  AlignDefaultButton,
} from '../Buttons'; // eslint-disable-line import/no-unresolved

import BlockTypeSelect from './BlockTypeSelect';

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    structure={[
      AlignLeftButton,
      AlignCenterButton,
      AlignRightButton,
      AlignDefaultButton,
    ]}
  />
);

export default DefaultBlockTypeSelect;
