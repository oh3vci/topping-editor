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
                    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 68.03 68.03" >
                      <path d="M59.533-0.009H8.498c-2.349,0-4.252,1.902-4.252,4.253v59.541c0,2.35,1.904,4.254,4.252,4.254h38.277
                      	l17.011-17.014V4.245C63.785,1.894,61.883-0.009,59.533-0.009z M46.774,62.025v-11h10.997L46.774,62.025z M59.533,46.771H46.774
                      	c-2.352,0-4.255,1.904-4.255,4.254v12.76H8.498V4.245h51.036V46.771z M12.75,14.877c0-1.176,0.951-2.127,2.126-2.127h38.278
                      	c1.174,0,2.124,0.951,2.124,2.127c0,1.175-0.95,2.125-2.124,2.125H14.876C13.702,17.002,12.75,16.052,12.75,14.877z M12.75,27.635
                      	c0-1.176,0.951-2.127,2.126-2.127h38.278c1.174,0,2.124,0.951,2.124,2.127c0,1.175-0.95,2.126-2.124,2.126H14.876
                      	C13.702,29.761,12.75,28.81,12.75,27.635z M12.75,40.393c0-1.176,0.951-2.127,2.126-2.127h38.278c1.174,0,2.124,0.951,2.124,2.127
                      	c0,1.178-0.95,2.129-2.124,2.129H14.876C13.702,42.521,12.75,41.57,12.75,40.393z"/>
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
                    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 68.03 68.03" >
                      <path d="M59.533-0.009H8.498c-2.349,0-4.252,1.902-4.252,4.253v59.541c0,2.35,1.904,4.254,4.252,4.254h38.277
                      	l17.011-17.014V4.245C63.785,1.894,61.883-0.009,59.533-0.009z M46.774,62.025v-11h10.997L46.774,62.025z M59.533,46.771H46.774
                      	c-2.352,0-4.255,1.904-4.255,4.254v12.76H8.498V4.245h51.036V46.771z M12.75,14.877c0-1.176,0.951-2.127,2.126-2.127h38.278
                      	c1.174,0,2.124,0.951,2.124,2.127c0,1.175-0.95,2.125-2.124,2.125H14.876C13.702,17.002,12.75,16.052,12.75,14.877z M12.75,27.635
                      	c0-1.176,0.951-2.127,2.126-2.127h38.278c1.174,0,2.124,0.951,2.124,2.127c0,1.175-0.95,2.126-2.124,2.126H14.876
                      	C13.702,29.761,12.75,28.81,12.75,27.635z M12.75,40.393c0-1.176,0.951-2.127,2.126-2.127h38.278c1.174,0,2.124,0.951,2.124,2.127
                      	c0,1.178-0.95,2.129-2.124,2.129H14.876C13.702,42.521,12.75,41.57,12.75,40.393z"/>
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
