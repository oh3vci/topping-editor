import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import editorStyles from './styles/editorStyles.css';
import createSideToolbarPlugin from './components/SideToolbar';
import createInlineToolbarPlugin, { Separator } from './components/InlineToolbar';
import createMemoifyPlugin from './components/Memo';

import {
  FontSizeDownButton,
  FontSizeUpButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  ForeColorButton,
  AddMemoButton,
} from './components/Buttons';
import SubmitButton from './components/SubmitButton';

let memoAddElement = null;
let inlineToolbarElement = null;

const addMemo = () => {
  memoAddElement.openPopover();
  console.log("It did!");
};

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    FontSizeDownButton,
    FontSizeUpButton,
    Separator,
    BoldButton,
    ItalicButton,
    UnderlineButton,
    ForeColorButton,
    Separator,
    AddMemoButton,
  ],
  addMemo,
});
const memoifyPlugin = createMemoifyPlugin();


const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { MemoAdd } = memoifyPlugin;
const plugins = [
  sideToolbarPlugin,
  inlineToolbarPlugin,
  memoifyPlugin
];
const text = 'test test';

class App extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    //editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <SubmitButton />
        <div className="editor" onClick={this.focus}>
          <Editor
            customStyleMap={{
              'COLOR': {
                color: '#8BD0D2',
                background: 'none',
              },
              'MEMO': {
                color: '#FFFFFF',
                background: '#8BD0D2',
              },
              'SIZE_UP': {
                fontSize: '120%',
              },
              'SIZE_DOWN': {
                fontSize: '80%',
              },
            }}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Write something..."
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <SideToolbar />
          <InlineToolbar
            ref={(element) => { inlineToolbarElement = element; }}
          />
        </div>
        <MemoAdd
          ref={(element) => { memoAddElement = element; }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          inlineToolbarElement={inlineToolbarElement}
        />
      </div>
    );
  }
}

export default App;
