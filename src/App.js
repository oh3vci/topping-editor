import React, { Component } from 'react';
import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  SelectionState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import axios from 'axios';

import createSideToolbarPlugin from './components/SideToolbar';
import createInlineToolbarPlugin, { Separator } from './components/InlineToolbar';
import createMemoPlugin from './components/Memo';
import Memo from './components/Memo/Memo';
import memoStrategy from './components/Memo/memoStrategy';
import MemoEdit from './components/Memo/MemoEdit';

import {
  FontSizeDownButton,
  FontSizeUpButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  ForeColorButton,
  AddMemoButton,
} from './components/Buttons';

import CompleteModal from './components/CompleteModal';
import SubmitButton from './components/SubmitButton';
import EssayTitle from './components/EssayTitle';

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
      modalIsOpen: false,
      title: '',
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
      const title = response.title; // ''

      this.setState({
        title: title,
        editorState: editorState,
      })
    })
    .catch((error) => {
      const editorState = EditorState.createEmpty(decorator);
      const title = ''

      this.setState({
        title: title,
        editorState: editorState,
      })
    });
  }

  removeMemo = (blockKey, entityKey) => {
    const { editorState } = this.state;
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);
    const oldSelection = editorState.getSelection();
    block.findEntityRanges((character) => {
      const eKey = character.getEntity();
      return eKey === entityKey;
    }, (start, end) => {
      const selection = new SelectionState({
        anchorKey: blockKey,
        focusKey: blockKey,
        anchorOffset: start,
        focusOffset: end,
      });
      const newEditorState = EditorState.forceSelection(RichUtils.toggleLink(editorState, selection, null), oldSelection);
      this.onChange(newEditorState, this.focus);
    });
  };

  editMemoAfterSelection = (blockKey, entityKey = null) => {
    if (entityKey === null) {
      return;
    }
    const { editorState } = this.state;
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);
    const entity = content.getEntity(entityKey);
    block.findEntityRanges((character) => {
      const eKey = character.getEntity();
      return eKey === entityKey;
    }, (start, end) => {
      const selection = new SelectionState({
        anchorKey: blockKey,
        focusKey: blockKey,
        anchorOffset: start,
        focusOffset: end,
      });
      const newEditorState = EditorState.forceSelection(editorState, selection);
      this.onChange(newEditorState);
      setTimeout(() => {
        handleMemo();
      }, 0);
    });
  };

  getCurrentBlock = (editorState) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  };

  isCursorBetweenMemo = (editorState) => {
    let ret = null;
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const currentBlock = this.getCurrentBlock(editorState);
    if (!currentBlock) {
      return ret;
    }
    let entityKey = null;
    let blockKey = null;
    if (currentBlock.getType() !== 'atomic' && selection.isCollapsed()) {
      if (currentBlock.getLength() > 0) {
        if (selection.getAnchorOffset() > 0) {
          entityKey = currentBlock.getEntityAt(selection.getAnchorOffset() - 1);
          blockKey = currentBlock.getKey();
          if (entityKey !== null) {
            const entity = content.getEntity(entityKey);
            if (entity.getType() === 'MEMO') {
              ret = {
                entityKey,
                blockKey,
                content: entity.getData().content,
              };
            }
          }
        }
      }
    }
    return ret;
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { editorState, modalIsOpen, title } = this.state
    const isCursorMemo = this.isCursorBetweenMemo(editorState);

    return (
      <div className="wrap">
        <CompleteModal
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
        <div className="header">
          <div className="blank-side" />
          <div className="center">
            <EssayTitle editorTitle={title} />
            <SubmitButton
              editorState={editorState}
              openModal={this.openModal}
            />
          </div>
          <div className="memo-side" />
        </div>
        <div className="container">
          <div className="blank-side">
          </div>
          <div className="editor" onClick={this.focus}>
            <Editor
              customStyleMap={{
                'COLOR': {
                  color: '#8ACED0',
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
            {/*<SideToolbar />*/}
            <InlineToolbar
              ref={(element) => { inlineToolbarElement = element; }}
            />
            {
              isCursorMemo && (
                <MemoEdit
                  {...isCursorMemo}
                  editorState={editorState}
                  removeMemo={this.removeMemo}
                  editMemo={this.editMemoAfterSelection}
                />
              )
            }
            <MemoAdd
              ref={(element) => { memoAddElement = element; }}
              editorState={editorState}
              onChange={this.onChange}
              inlineToolbarElement={inlineToolbarElement}
              {...isCursorMemo}
            />
          </div>
          <div className="memo-side">
            <MemoSideBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
