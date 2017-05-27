import React, { Component } from 'react';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import axios from 'axios';

import createSideToolbarPlugin from './components/SideToolbar';
import createInlineToolbarPlugin, { Separator } from './components/InlineToolbar';
import createMemoPlugin from './components/Memo';
import Memo from './components/Memo/Memo';
import memoStrategy from './components/Memo/memoStrategy';


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

const essayId = document.getElementById("essayId").innerHTML;
const decorator = new CompositeDecorator([
  {
    strategy: memoStrategy,
    component: Memo,
  }
]);

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      editorState: EditorState.createEmpty(decorator),
    }

    this.onChange = (editorState) => this.setState({ editorState });
    this.focus = () => this.editor.focus();
  }


  componentWillMount() {
    return axios({
      method: 'post',
      url: '/editor/load',
      data: {
        essayId: essayId
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/multipart/form-data; charset=UTF-8'
      }
    })
    .then((response) => {
      const editorState = EditorState.createWithContent(convertFromRaw(response.data), decorator);

      this.setState({
        editorState: editorState,
      })
    })
    .catch((error) => {
      const editorState = EditorState.createEmpty(decorator);

      this.setState({
        editorState: editorState,
      })
    });
  }


  render() {
    const { editorState } = this.state
    return (
      <div className="wrap">
        <div className="header">
          <SubmitButton
            editorState={editorState}
          />
        </div>
        <div className="container">
          <div className="blank-side" />
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
              editorState={editorState}
              onChange={this.onChange}
              placeholder="토핑 해주세요!"
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
            />
            <SideToolbar />
            <InlineToolbar
              ref={(element) => { inlineToolbarElement = element; }}
            />
          </div>
          <div className="memo-side">
            <MemoSideBar />
          </div>
        </div>
        <MemoAdd
          ref={(element) => { memoAddElement = element; }}
          editorState={editorState}
          onChange={this.onChange}
          inlineToolbarElement={inlineToolbarElement}
        />
      </div>
    );
  }
}

export default App;
