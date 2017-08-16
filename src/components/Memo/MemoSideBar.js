import React, { Component } from 'react';
import MemosShow from './MemosShow';

export default class MemoSideBar extends Component {

  state = {
    hover: false,
  }


  getMemos = () => {
    let list = document.getElementsByTagName("memo");
    let editor = document.getElementsByClassName("editor")[0];
    let memoList = [];
    let index = 0;

/* 메모 중복 지워주는 코드
    if (list.length > 1) {
      for(let i = 0; i < list.length; i++) {
        let pastClass = list[i-1].getAttribute("class");
        let presClass = list[i].getAttribute("class");
        if (pastClass === presClass) {
          list[i].remove();
        }
      }
    }
*/

    for (let i = 0; i < list.length; i++) {
      let memoClass = list[i].getAttribute("class")
      let memoTop = document.getElementsByClassName(memoClass)[0].getBoundingClientRect().top;
      let editorTop = editor.getBoundingClientRect().top;
      if (memoList.length === 0) {
        memoList.push({key: memoClass, index: index, top: memoTop - editorTop});
        index++;
      } else if (list[i-1].getAttribute("class") !== memoClass) {
        memoList.push({key: memoClass, index: index, top: memoTop - editorTop});
        index++;
      }
    }

    return memoList;
  }

  matchKeys = (wrapper, memoKey) => {
    const childNodes = wrapper.childNodes;

    let keys = [];
    for (let i = 0; i < childNodes.length; i++) {
      keys.push(childNodes[i].getAttribute("class").split(" ")[0]);
    }

    return keys.indexOf(memoKey) === -1;
  }


  showMemo = (memoKey) => {

    let memo = document.getElementsByClassName(memoKey)[0];
    let blockKey = memo.firstChild.getAttribute("data-offset-key").split("-")[0];
    let memoLine = memo.parentNode;

    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      let range = document.createRange();
      // textNode === "메모한 범위의 text dom"
      const textNode = memo.childNodes[0].childNodes[0].firstChild;

      range.collapse(false);
      range.setStart(textNode, 0);
      range.setEnd(textNode, memo.innerText.length);

      let sel = window.getSelection().getRangeAt(0);
      let preRange = sel.cloneRange();
      preRange.selectNodeContents(memoLine);
      preRange.setEnd(range.endContainer, range.endOffset);

      let end = preRange.toString().length;

      this.props.showMemoAfterSelection(blockKey, end);
    } else if (typeof document.body.createTextRange !== "undefined") {

      let textRange = document.selection.createRange();
      let preTextRange = document.body.createTextRange();
      preTextRange.moveToElementText(memoLine);
      preTextRange.setEndPoint("EndToEnd", textRange);

      let end = preTextRange.text.length;

      this.showMemoAfterSelection(blockKey, end);
    }
  }

  openMemos = (memoIndex, memoList) => {

    let memos = [];

    for (let i = 0; i < memoList.length; i++) {
      if (memoList[memoIndex].top === memoList[i].top) {
          memos.push(memoList[i]);
      }
    }

    let left = 10;
    memos.map(
      (memo) => {
        left += 28;
        return (
          <div
            key={memo.index}
            className={memo.key + " memo-exist"}
            style={{top: memo.top, left: left}}
            onClick={() => this.showMemo(memo.key)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 30">
              <path fill="#17c6e2" d="M30.959 15a6.949 6.949 0 0 1-6.949 6.949H10.99a6.949 6.949 0 1 1 0-13.898h13.02A6.949 6.949 0 0 1 30.959 15z"/>
              <text transform="translate(6.751 17.434)" fill="#FFF" fontSize="7">MEMO</text>
            </svg>
          </div>
        )
      }
    )
  }

  render() {
    const memoList = this.getMemos();
    //const wrapperList = document.getElementsByClassName("memo-wrapper");
    //const editorTop = document.getElementsByClassName("editor")[0];
    let left = 10;


    return (
      <div className="side-wrapper">
        {
          memoList !== []
          ?
          memoList.map(
            (memo) => {
              if (memo.index === 0) {
                return (
                  <div
                    key={memo.index}
                    className={memo.key + " memo-exist"}
                    style={{top: memo.top, left: left}}
                    onClick={() => this.showMemo(memo.key)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <circle fill="#17C6E2" cx="12" cy="11.841" r="10.709"/>
                      <path fill="#17C6E2" d="M15.054 21.709l6.019 1.15s1.283.178.84-1.15l-1.637-3.805"/>
                      <circle fill="#FFF" cx="5.938" cy="11.841" r="1.593"/>
                      <circle fill="#FFF" cx="12" cy="11.841" r="1.594"/>
                      <circle fill="#FFF" cx="18.24" cy="11.841" r="1.593"/>
                    </svg>
                  </div>
                )
              } else {
                if(memoList[memo.index - 1].top !== memo.top) {
                  return (
                    <div
                      key={memo.index}
                      className={memo.key + " memo-exist"}
                      style={{top: memo.top, left: left}}
                      onClick={() => this.showMemo(memo.key)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <circle fill="#17C6E2" cx="12" cy="11.841" r="10.709"/>
                        <path fill="#17C6E2" d="M15.054 21.709l6.019 1.15s1.283.178.84-1.15l-1.637-3.805"/>
                        <circle fill="#FFF" cx="5.938" cy="11.841" r="1.593"/>
                        <circle fill="#FFF" cx="12" cy="11.841" r="1.594"/>
                        <circle fill="#FFF" cx="18.24" cy="11.841" r="1.593"/>
                      </svg>
                    </div>
                  )
                } else {
                  return (
                    <MemosShow
                      memoIndex={memo.index}
                      memoList={memoList}
                      showMemo={this.showMemo}
                    />
                  )
                }
              }
            }
          )
          :
          null
        }
        {/*
        memoList.map(
          (memo) => {
            if (memo.index === 0) {
              return (
                <div
                  key={memo.index}
                  className={memo.key + " memo-exist"}
                  style={{top: memo.top, left: left}}
                  onClick={() => this.showMemo(memo.key)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-3 -3 30 30"><path fill="#17C6E2" d="M26.563 12.454c0 3.476-3.134 6.291-7 6.291H4.438c-3.866 0-7-2.815-7-6.291v-.843c0-3.475 3.134-6.292 7-6.292h15.125c3.866 0 7 2.816 7 6.292v.843z"/><g fill="#FFF"><path d="M5.131 14.802v-3.287c0-.38-.048-.679-.146-.897-.097-.218-.332-.319-.705-.306-.338.021-.6.149-.783.384s-.275.567-.275.995v3.101H2.114v-3.277c0-.38-.054-.679-.161-.897s-.351-.319-.731-.306a.986.986 0 0 0-.751.384c-.184.235-.271.567-.265.995v3.101h-1.13V9.493h1.13v.487c.166-.172.376-.338.632-.498.256-.159.577-.225.964-.197.257.028.488.107.696.234.208.128.373.32.498.576.137-.159.352-.347.642-.565.29-.218.698-.299 1.224-.244.511.055.874.271 1.088.648s.322.79.322 1.239v3.628H5.131zM7.848 12.5c.042.415.204.771.487 1.068.284.297.626.445 1.027.445.387 0 .688-.088.902-.264.214-.177.346-.341.394-.493h1.224c-.118.381-.37.77-.757 1.167s-.968.596-1.742.596c-.795 0-1.452-.281-1.97-.845-.519-.563-.778-1.249-.778-2.058 0-.823.25-1.512.751-2.069.501-.556 1.163-.834 1.986-.834.719 0 1.36.266 1.923.798s.821 1.362.772 2.488H7.848zm3.007-.933c-.049-.4-.204-.727-.467-.979s-.605-.378-1.026-.378c-.401 0-.735.121-1 .363-.267.242-.438.574-.514.995h3.007zM18.61 14.802v-3.287c0-.38-.048-.679-.145-.897s-.332-.319-.705-.306c-.339.021-.6.149-.783.384s-.274.567-.274.995v3.101h-1.109v-3.277c0-.38-.054-.679-.161-.897s-.351-.319-.73-.306a.99.99 0 0 0-.752.384c-.184.235-.271.567-.265.995v3.101h-1.131V9.493h1.131v.487c.166-.172.377-.338.633-.498.255-.159.577-.225.964-.197.256.027.487.105.695.233.207.128.373.32.497.576.139-.159.353-.347.643-.565.291-.218.698-.299 1.224-.244.512.055.875.271 1.089.648.215.377.321.79.321 1.239V14.8H18.61zM24.816 10.074c.494.546.741 1.23.741 2.053 0 .815-.247 1.502-.741 2.059-.495.556-1.16.834-1.996.834-.83 0-1.488-.278-1.976-.834-.487-.557-.731-1.243-.731-2.059 0-.822.244-1.507.731-2.053s1.146-.819 1.976-.819c.836 0 1.501.273 1.996.819zm-.881 3.401c.273-.353.409-.802.409-1.348s-.136-.99-.409-1.333c-.273-.342-.645-.513-1.114-.513-.464 0-.83.171-1.1.513-.27.342-.404.787-.404 1.333s.135.995.404 1.348.636.529 1.1.529c.469 0 .84-.177 1.114-.529z"/></g></svg>
                </div>
              )
            } else {
              if(memoList[memo.index - 1].top !== memo.top) {
                left = 10;
              } else {
                left += 28;
              }
              return (
                <div
                  key={memo.index}
                  className={memo.key + " memo-exist"}
                  style={{top: memo.top, left: left}}
                  onClick={() => this.showMemo(memo.key)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 30">
                    <path fill="#17c6e2" d="M30.959 15a6.949 6.949 0 0 1-6.949 6.949H10.99a6.949 6.949 0 1 1 0-13.898h13.02A6.949 6.949 0 0 1 30.959 15z"/>
                    <text transform="translate(6.751 17.434)" fill="#FFF" fontSize="7">MEMO</text>
                  </svg>
                </div>
              )
            }
          }
        )
        */}
        {
          /*
          memoList !== []
          ?
          memoList.map(
            (memo) => {
              if (memo.index === 0) {
                //sideInner.innerHTML = '';
                console.log(memo.index + " 인덱스");
                console.log(
                  <div className="memo-wrapper" style={{top: memo.top, right: right + 2}}>
                    <div
                      key={memo.key}
                      className={memo.key + " memo-exist"}
                    />
                  </div>
                );
                return (
                  <div className="memo-wrapper" style={{top: memo.top}}>
                    <div
                      key={memo.key}
                      className={memo.key + " memo-exist"}
                    />
                  </div>
                )
              } else {
                console.log(memo.index + " 인덱스")

                for (let i = 0; i < wrapperList.length; i++) {
                  console.log(i + " 번째");
                  let wrapper = wrapperList[i];
                  if (wrapper.getBoundingClientRect().top === (memo.top + .getBoundingClientRect().top)) {
                    if (this.matchKeys(wrapper, memo.key)) {
                      console.log("b1");
                      let memoDiv = document.createElement('div');
                      memoDiv.setAttribute('class', memo.key + " memo-exist");
                      wrapper.appendChild(memoDiv);
                      memoDiv = null;

                      return ;
                    } else {
                      return ;
                    }
                  }
                }
                console.log("ccccc");

                return (
                  <div className="memo-wrapper" style={{top: memo.top}}>
                    <div
                      key={memo.key}
                      className={memo.key + " memo-exist"}
                    />
                  </div>
                )
              }
            }
          )
          :
          null
          */
        }
      </div>
    )

  }
}
