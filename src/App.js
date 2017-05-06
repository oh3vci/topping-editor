import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import editorStyles from './styles/editorStyles.css';
import createSideToolbarPlugin from './components/SideToolbar';
import createInlineToolbarPlugin, { Separator } from './components/InlineToolbar';
import createMemoPlugin from './components/Memo';

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

const handleMemo = () => {
  memoAddElement.openPopover();
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
  handleMemo,
});
const memoPlugin = createMemoPlugin();


const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { MemoAdd, MemoSideBar } = memoPlugin;
const plugins = [
  sideToolbarPlugin,
  inlineToolbarPlugin,
  memoPlugin
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
      <div className="container">
        <SubmitButton />
        <div className="wrapper">
          <div className="editor" onClick={this.focus}>
            <Editor
              customStyleMap={{
                'COLOR': {
                  color: '#8BD0D2',
                  background: 'none',
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
          <div className="side">
            <MemoSideBar />
          </div>
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
