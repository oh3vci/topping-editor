import React from 'react';

class EssayTitle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
      title: this.props.editorTitle,
    }

    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.changeForm = this.changeForm.bind(this);
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
    const { isChange, title } = this.state;
    const { editorTitle } = this.props;

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
              value={this.title}
            />
          </div>

          :
          <div className="default-essay-title">
            <div className="essay-title" onClick={this.changeForm}>
              {
                editorTitle === ''
                ?
                "토핑해주세요"
                :
                editorTitle
              }
              &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <g fillRule="evenodd" clipRule="evenodd">
                  <path d="M0 24.025c-.008-.111-.025-.224-.025-.335-.001-1.983-.007-3.968.008-5.952a.823.823 0 0 1 .214-.524C4.43 12.965 8.673 8.726 12.914 4.485c.079-.078.161-.151.207-.195 2.197 2.197 4.381 4.376 6.581 6.576-.069.072-.158.17-.251.264L6.847 23.733l-.282.292H0zm3.413-7.186c-.438.439-.876.876-1.31 1.318-.051.052-.105.132-.106.199-.009.526-.005 1.054-.005 1.624h2.039V22c.549 0 1.066.002 1.583-.002.052 0 .12-.013.153-.046.465-.467.925-.937 1.397-1.417l-3.751-3.696zM14.02 7.351c-.01-.354-.206-.501-.441-.407a1.03 1.03 0 0 0-.322.235 9267.894 9267.894 0 0 0-8.298 8.292c-.079.079-.193.163-.209.257-.023.139-.021.343.063.422.082.078.284.06.423.034.085-.016.157-.119.229-.19l2.128-2.127c2.049-2.047 4.099-4.093 6.145-6.143.127-.13.22-.292.282-.373zM18.612 0c.66.198 1.14.648 1.608 1.125.994 1.014 2.007 2.008 3.009 3.014 1.024 1.026 1.027 2.177.007 3.198l-2.407 2.4-6.572-6.572c.019-.02.078-.098.146-.165.654-.653 1.318-1.296 1.96-1.959C16.8.592 17.25.178 17.868 0h.744z"/>
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
