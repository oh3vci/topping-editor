import React, { Component } from 'react';

export default class MemoSideBar extends Component {

  getMemos = () => {
    let list = document.getElementsByTagName("memo");
    let side = document.getElementsByClassName("memo-side")[0];
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
      let sideTop = side.getBoundingClientRect().top;
      if (memoList.length === 0) {
        memoList.push({key: memoClass, index: index, top: memoTop - sideTop});
        index++;
      } else if (list[i-1].getAttribute("class") !== memoClass) {
        memoList.push({key: memoClass, index: index, top: memoTop - sideTop});
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
    let text = document.getElementsByClassName(memoKey)[0];
    text.style.backgroundColor = "#8ACED0";

    /*
    range.setStart(text.childNodes[0], 1);
    range.collapse(true);
    sel.removeAllRanges();
    return sel.addRange(range);

    */
  }

  render() {
    const memoList = this.getMemos();
    //const wrapperList = document.getElementsByClassName("memo-wrapper");
    const sideTop = document.getElementsByClassName("memo-side")[0];
    const sideWrapper = document.getElementsByClassName("side-wrapper");
    let left = 0;

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
                    onClick={this.showMemo(memo.key)}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" enable-background="new 0 0 15 15">
                      <polyline fill="#8ACED0" points="12.369,3.423 12.369,14.393 2.632,14.393 2.632,0.796 9.707,0.796 "/>
                      <polyline fill="#73ACAE" points="12.369,3.423 9.707,3.423 9.707,0.796 "/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="4.388" x2="10.775" y2="4.388"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="6.146" x2="10.775" y2="6.146"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="7.972" x2="10.775" y2="7.972"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="9.729" x2="10.775" y2="9.729"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="11.607" x2="10.775" y2="11.607"/>
                    </svg>
                  </div>
                )
              } else {
                if(memoList[memo.index - 1].top !== memo.top) {
                  left = 10;
                } else {
                  left += 15;
                }
                return (
                  <div
                    key={memo.index}
                    className={memo.key + " memo-exist"}
                    style={{top: memo.top, left: left}}
                    onClick={this.showMemo(memo.key)}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 15 15" enable-background="new 0 0 15 15">
                      <polyline fill="#8ACED0" points="12.369,3.423 12.369,14.393 2.632,14.393 2.632,0.796 9.707,0.796 "/>
                      <polyline fill="#73ACAE" points="12.369,3.423 9.707,3.423 9.707,0.796 "/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="4.388" x2="10.775" y2="4.388"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="6.146" x2="10.775" y2="6.146"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="7.972" x2="10.775" y2="7.972"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="9.729" x2="10.775" y2="9.729"/>
                      <line fill="none" stroke="#FFFFFF" stroke-width="0.3766" stroke-miterlimit="10" x1="4.185" y1="11.607" x2="10.775" y2="11.607"/>
                    </svg>
                  </div>
                )
              }
            }
          )
          :
          null
        }
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
                  if (wrapper.getBoundingClientRect().top === (memo.top + sideTop.getBoundingClientRect().top)) {
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
