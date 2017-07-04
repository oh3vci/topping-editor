import React from 'react';

class EssayTitle extends React.Component {

  state = {
    isChange: false,
    title: this.props.editorTitle,
  }

  changeTitle = (evt) => {
    this.props.changeTitle(this.state.title);
    this.changeForm();
  }

  changeText = (evt) => {
    this.setState({ title: evt.target.value });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.changeTitle();
    }
  }

  changeForm = () => {
    const { isChange } = this.state;
    if (!isChange) {
      this.setState({
        isChange: true,
      });
      setTimeout(() => this.inputElement.focus(), 0);
    } else {
      this.setState({
        isChange: false,
      });
    }
  }


  render() {
    const { isChange } = this.state;
    let { editorTitle } = this.props;
    /*
    if (editorTitle.length > 40) {
      editorTitle = `${editorTitle.slice(0,40)}...`;
    }
    */
    return (
      <div className="wrapper-essay-title">
        {
          isChange
          ?
          <div className="rename-essay-title">
            <input
              maxLength="50"
              ref={(element) => { this.inputElement = element; }}
              type="text"
              onKeyDown={(e) => this.onKeyDown(e)}
              onChange={this.changeText}
              onBlur={this.changeTitle}
              value={this.state.title}
            />
          </div>

          :
          <div className="default-essay-title">
            <div className="essay-title" onClick={this.changeForm}>
              {
                editorTitle === ''
                ?
                "제목을 입력하세요"
                :
                editorTitle
              }
              &nbsp;
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <g>
                	<path fillRule="evenodd" clipRule="evenodd" d="M0,24.025c-0.008-0.111-0.025-0.224-0.025-0.335
                		c-0.001-1.983-0.007-3.968,0.008-5.952c0.001-0.178,0.09-0.399,0.214-0.524c4.233-4.249,8.476-8.488,12.717-12.729
                		c0.079-0.078,0.161-0.151,0.207-0.195c2.197,2.197,4.381,4.376,6.581,6.576c-0.069,0.072-0.158,0.17-0.251,0.264
                		c-4.202,4.201-8.403,8.403-12.604,12.603c-0.095,0.097-0.188,0.195-0.282,0.292C4.377,24.025,2.189,24.025,0,24.025z M3.413,16.839
                		c-0.438,0.439-0.876,0.876-1.31,1.318c-0.051,0.052-0.105,0.132-0.106,0.199c-0.009,0.526-0.005,1.054-0.005,1.624
                		c0.693,0,1.351,0,2.039,0c0,0.693,0,1.344,0,2.02c0.549,0,1.066,0.002,1.583-0.002c0.052,0,0.12-0.013,0.153-0.046
                		c0.465-0.467,0.925-0.937,1.397-1.417C5.909,19.298,4.675,18.082,3.413,16.839z M14.02,7.351c-0.01-0.354-0.206-0.501-0.441-0.407
                		c-0.119,0.048-0.228,0.141-0.322,0.235c-2.768,2.762-5.534,5.527-8.298,8.292c-0.079,0.079-0.193,0.163-0.209,0.257
                		c-0.023,0.139-0.021,0.343,0.063,0.422c0.082,0.078,0.284,0.06,0.423,0.034c0.085-0.016,0.157-0.119,0.229-0.19
                		c0.71-0.709,1.419-1.418,2.128-2.127c2.049-2.047,4.099-4.093,6.145-6.143C13.865,7.594,13.958,7.432,14.02,7.351z"/>
                	<path fillRule="evenodd" clipRule="evenodd" d="M18.612,0c0.66,0.198,1.14,0.648,1.608,1.125
                		c0.994,1.014,2.007,2.008,3.009,3.014c1.024,1.026,1.027,2.177,0.007,3.198c-0.812,0.811-1.624,1.62-2.407,2.4
                		c-2.193-2.192-4.372-4.373-6.572-6.572c0.019-0.02,0.078-0.098,0.146-0.165c0.654-0.653,1.318-1.296,1.96-1.959
                		C16.8,0.592,17.25,0.178,17.868,0C18.115,0,18.365,0,18.612,0z"/>
                </g>
              </svg>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default EssayTitle;
