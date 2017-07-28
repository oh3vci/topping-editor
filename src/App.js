import React, { Component } from 'react';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  SelectionState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import axios from 'axios';

//import createSideToolbarPlugin from './components/SideToolbar';
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

import Navbar from './components/Navbar';

import ExitModal from './components/ExitModal';
import SaveModal from './components/SaveModal';
import FailModal from './components/FailModal';
import CompleteModal from './components/CompleteModal';

import EssayTitle from './components/EssayTitle';

let memoAddElement = null;
let inlineToolbarElement = null;

const handleMemo = (memoContent) => {
  memoAddElement.openPopover(memoContent);
};

//const sideToolbarPlugin = createSideToolbarPlugin();
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

//const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { MemoAdd2, MemoSideBar } = memoPlugin;
const plugins = [
  //sideToolbarPlugin,
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
      isFail: false,
      isExit: false,
      isComplete: false,
      title: '',
      countKeyDown: 0,
      autoSaveTime: '',
      closeMemo: false,
    }

    this.onChange = (editorState) => {
      let { countKeyDown } = this.state;
      if (countKeyDown > 50) {
        this.setState({
          countKeyDown: 0
        });
        this.autoSave();
      } else {
        this.setState({
          countKeyDown: countKeyDown +1
        });
      }
      this.setState({ editorState });
    }

    this.focus = () => this.editor.focus();
    this.changeTitle = this.changeTitle.bind(this);
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
    .then(async (response) => {

      let dataReceived = await convertFromRaw(response.data.contents);
      console.log(response.data.contents);
      let title = await response.data.title;

      const editorState = EditorState.createWithContent(dataReceived, decorator);

      this.setState({
        title: title,
        editorState: editorState,
      });
      this.onChange(editorState, this.focus);
    })
    .catch((error) => {

      const editorState = EditorState.createEmpty(decorator);
      const title = ''

      this.setState({
        title: title,
        editorState: editorState,
      });

      this.onChange(editorState, this.focus);

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

    const memoContent = content.getEntity(entityKey).getData().content;

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
        handleMemo(memoContent);
      }, 0);
    });
  };

  showMemoAfterSelection = (blockKey, end) => {
    const { editorState } = this.state;
    const content = editorState.getCurrentContent();

    const selection = new SelectionState({
      anchorKey: blockKey,
      focusKey: blockKey,
      anchorOffset: end,
      focusOffset: end,
    });
    const newEditorState = EditorState.forceSelection(editorState, selection);
    this.onChange(newEditorState);
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

  openSaveModal = (isFail) => {
    this.setState({
      isFail: isFail,
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  openExitModal = () => {
    this.setState({
      isExit: true,
    })
  }

  closeExitModal = () => {
    this.setState({
      isExit: false,
    })
  }

  openCompleteModal = () => {
    this.setState({
      isComplete: true
    })
  }

  closeCompleteModal = () => {
    this.setState({
      isComplete: false
    })
  }

  autoSave = () => {
    let { editorState, title } = this.state;
    const raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const essayId = document.getElementById("essayId").innerHTML;

    axios({
      method: 'post',
      url: '/editor/save',
      data: {
          "essayId": essayId,
          "title": title,
          raw
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/multipart/form-data; charset=UTF-8'
      }
    })
    .then((response) => {
      this.setState({
        autoSaveTime: this.showAutoSaveTime()
      });
    })
    .catch((error) => {
      /* 자동저장 테스트용
      this.setState({
        autoSaveTime: this.showAutoSaveTime()
      });
      */
    });
  }

  showAutoSaveTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (second < 10) {
      second = "0" + second;
    }
    let hourTxt = hour.toString();
    let minTxt = min.toString();
    let secTxt = second.toString();
    return hourTxt + ":" + minTxt + ":" + secTxt + " 에 자동저장되었습니다"
  }

  changeTitle = (text) => {
    this.setState({
      title: text
    });
  }

  closeMemo = () => {
    this.setState({
      closeMemo: true
    });
  }

  // 메모 닫았다가 다시 열 때 상태 변화 체크 함수
  openMemo = () => {
    if (this.state.closeMemo) {
      this.setState({
        closeMemo: false
      });
    }
  }

  render() {
    const { editorState, modalIsOpen, isFail, isExit, isComplete, title, autoSaveTime, closeMemo } = this.state;
    let isCursorMemo = null;

    if (!closeMemo) {
      isCursorMemo = this.isCursorBetweenMemo(editorState);
    }

    return (
      <div className="wrap" onClick={this.openMemo}>
        {
          isFail
          ?
          <FailModal
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
          />
          :
          <SaveModal
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
          />
        }
        {
          isExit
          ?
          <ExitModal
            closeModal={this.closeExitModal}
          />
          :
          null
        }
        {
          isComplete
          ?
          <CompleteModal
            closeModal={this.closeCompleteModal}
          />
          :
          null
        }
        <div className="header">
          <div className="blank-side" />
          <div className="center">
            <Navbar
              title={title}
              autoSaveTime={autoSaveTime}
              editorState={editorState}
              openExitModal={this.openExitModal}
              openCompleteModal={this.openCompleteModal}
              openSaveModal={this.openSaveModal}
              closeMemo={this.closeMemo}
            />
          </div>
          <div className="memo-side" />
        </div>
        <div className="container">
          <div className="blank-side">
          </div>
          <div className="editor">
            <div className="editor_title">
              <EssayTitle
                editorTitle={title}
                editorState={editorState}
                changeTitle={this.changeTitle}
              />
            </div>
            <div className="editor_content">
              <Editor
                customStyleMap={{
                  'COLOR': {
                    color: '#17c6e2',
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
                    closeMemo={this.closeMemo}
                  />
                )
              }
              {
              /*
              <MemoAdd
                ref={(element) => { memoAddElement = element; }}
                editorState={editorState}
                onChange={this.onChange}
                inlineToolbarElement={inlineToolbarElement}
                {...isCursorMemo}
              />
              */
              }
              <MemoAdd2
                ref={(element) => { memoAddElement = element; }}
                editorState={editorState}
                onChange={this.onChange}
                inlineToolbarElement={inlineToolbarElement}
                {...isCursorMemo}
              />
            </div>
          </div>
          <div className="memo-side">
            <MemoSideBar
              onChange={this.onChange}
              editorState={editorState}
              showMemoAfterSelection={this.showMemoAfterSelection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
