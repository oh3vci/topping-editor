import React, { Component } from 'react';

export default class MemosShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
    }

    this.openMemos = this.openMemos.bind(this);
    this.closeMemos = this.closeMemos.bind(this);
    this.getMemos = this.getMemos.bind(this);
  }

  openMemos = () => {
    this.setState({
      isClick: true
    });
  }

  closeMemos = () => {
    this.setState({
      isClick: false
    })
  }

  getMemos = (memoIndex, memoList) => {

    let memos = [];

    for (let i = 0; i < memoList.length; i++) {
      if (memoList[memoIndex].top === memoList[i].top) {
          memos.push(memoList[i]);
      }
    }

    if (memoList[memoIndex].key !== memos[memos.length - 1].key) {
      return null;
    } else {
      for (let i = 0; i < memos.length; i++) {
        memos[i].index = i;
      }
      return memos;
    }
  }


  render() {
    const { memoIndex, memoList, showMemo } = this.props;
    const { isClick } = this.state;
    let left = 10;
    console.log(memoIndex);
    console.log(memoList);

    const memos = this.getMemos(memoIndex, memoList);
    console.log(memos);
    return (
      <div>
        {
          memos
          ?
          (
            isClick
            ?
            memos.map(
              (memo) => {
                if (memo.index === 0) {
                  return null;
                } else {
                  left += 28;
                  return (
                    <div
                      key={memo.index}
                      className={memo.key + " memo-exist"}
                      style={{top: memo.top, left: left}}
                      onClick={() => showMemo(memo.key)}
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
                }
              }
            )
            :
            <div
              key={memoIndex}
              className="memo-exist"
              style={{top: memoList[memoIndex].top, left: left}}
              onMouseOver={() => this.openMemos()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle fill="#17C6E2" cx="12.787" cy="10.946" r="9.865"/>
                <path fill="#17C6E2" d="M15.601 20.037l5.544 1.06s1.183.164.773-1.06l-1.508-3.505"/>
                <circle fill="#FFF" cx="7.203" cy="10.946" r="1.467"/>
                <circle fill="#FFF" cx="12.787" cy="10.946" r="1.468"/>
                <circle fill="#FFF" cx="18.536" cy="10.946" r="1.467"/>
                <path fill="none" stroke="#17C6E2" strokeWidth=".75" strokeLinecap="round" strokeMiterlimit="10" d="M2.809 14.26a4.97 4.97 0 0 0-1.461 3.525c0 1.143.399 2.182 1.046 3.023l-.675 1.572c-.206.618.39.535.39.535l2.481-.474a4.955 4.955 0 0 0 1.744.331 4.97 4.97 0 0 0 3.681-1.625"/>
              </svg>
            </div>
          )
          :
          null
        }
        {
          isClick && memos
          ?
          <div
            className="memo-exist"
            style={{top: memoList[memoIndex].top, left: left + 28}}
            onClick={() => this.closeMemos()}
          >
            <a className="close-arrow"></a>
          </div>
          :
          null
        }
      </div>
    )
  }
}
