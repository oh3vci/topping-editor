import React from 'react';
import axios from 'axios';

class EssayTitle extends React.Component {

  state = {
    isChange: false,
    title: '',
  }

  submit = () => {
    const essayId = document.getElementById("essayId").innerHTML;
    const { title } = this.state;

    axios({
      method: 'post',
      url: '/editor/saveTitle',
      data: {
        "title": title,
        "essayId": essayId
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/multipart/form-data; charset=UTF-8'
      }
    })
    .then((response) => {
      alert("저장이 완료되었습니다.");
      this.changeFrom();
    })
    .catch((error) => {
      alert("저장이 실패하였습니다.");
    });
  }

  changeText = (evt) => {
    this.setState({ title: evt.target.value });
  };

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.submit();
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
    if (editorTitle.length > 40) {
      editorTitle = `${editorTitle.slice(0,40)}...`;
    }
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
              value={this.state.title}
            />
            <svg version="1.1" onClick={this.submit} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
              <path d="M12,1.437C6.169,1.437,1.438,6.169,1.438,12c0,5.831,4.732,10.563,10.563,10.563
                c5.83,0,10.563-4.732,10.563-10.563C22.563,6.169,17.83,1.437,12,1.437z M18.363,7.31l-6.896,10.426
                c-0.161,0.246-0.431,0.398-0.718,0.424c-0.025,0-0.042,0-0.068,0c-0.27,0-0.524-0.111-0.701-0.313l-4.259-4.766
                c-0.347-0.389-0.313-0.99,0.076-1.336c0.389-0.346,0.988-0.313,1.335,0.076l3.439,3.862l6.219-9.405
                c0.287-0.439,0.871-0.558,1.311-0.271C18.531,6.288,18.65,6.871,18.363,7.31z"/>
            </svg>
            <svg version="1.1" onClick={this.changeForm} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
              <path d="M11.999,1.438C6.166,1.438,1.438,6.167,1.438,12s4.729,10.562,10.562,10.562S22.563,17.834,22.563,12
              	S17.832,1.438,11.999,1.438z M18.688,17.008l-1.683,1.682L12,13.684l-5.007,5.006l-1.683-1.682L10.318,12L5.312,6.994l1.682-1.683
              	L12,10.318l5.008-5.006l1.682,1.682L13.683,12L18.688,17.008z"/>
            </svg>
          </div>

          :
          <div className="default-essay-title">
            <div className="essay-title">
              {
                editorTitle === ''
                ?
                "제목을 입력하세요"
                :
                editorTitle
              }
            </div>
            <div className="change-form" onClick={this.changeForm}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <g>
                  <polygon points="6.938,14.889 9.125,17.072 15.737,10.569 13.441,8.273 	"/>
                  <polygon points="6.392,15.379 6.392,17.621 8.632,17.621 8.741,17.457 6.555,15.27 	"/>
                  <path d="M12,1.438C6.167,1.438,1.438,6.167,1.438,12c0,5.833,4.729,10.562,10.562,10.562
                    c5.833,0,10.563-4.729,10.563-10.562C22.563,6.167,17.832,1.438,12,1.438z M18.416,9.367l-9.238,9.182H5.462v-3.715l9.183-9.238
                    c0.219-0.219,0.547-0.165,0.71,0l3.062,3.06C18.58,8.875,18.58,9.203,18.416,9.367z"/>
                  <rect x="13.923" y="7.653" transform="matrix(-0.7072 -0.707 0.707 -0.7072 20.5548 25.4425)" width="3.247" height="1.623"/>
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
