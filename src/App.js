import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
//import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import editorStyles from './styles/editorStyles.css';
import createSideToolbarPlugin from './components/SideToolbar';
import createInlineToolbarPlugin, { Separator } from './components/InlineToolbar';
//import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  FontSizeButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  ForeColorButton,
  MemoButton,
} from './components/Buttons';
import SubmitButton from './components/SubmitButton';

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    FontSizeButton,
    Separator,
    BoldButton,
    ItalicButton,
    UnderlineButton,
    ForeColorButton,
    Separator,
    MemoButton,
  ]
});
const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
  sideToolbarPlugin,
  inlineToolbarPlugin,
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
                color: '#51E2C1',
              },
              'MEMO': {
                color: '#FFFFFF',
                background: '#51E2C1',
              },
              'SMALL': {
                fontSize: '11px',
              },
              'MEDIUM': {
                fontSize: '13px',
              },
              'LARGE': {
                fontSize: '15px',
              },
            }}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Write something..."
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <SideToolbar />
          <InlineToolbar />
        </div>
      </div>
    );
  }
}

export default App;
