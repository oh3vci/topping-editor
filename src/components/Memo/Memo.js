import React from 'react';
import ReactDOM from 'react-dom';

class Memo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { memo: props && props.memo || '' }
  }

  setMemo(event) {
    let { memo } = this.state;
    let content = '';


    this.setState({memo:}, () => {
      ReactDOM.findDOMNode(this.refs.textInput).value =
    })

    this.props.set
    this.reset();
    event.target.blur();
  }

  reset() {
    this.setState({ url: '' })
  }

  onMemoChange(event) {
    event.stopPropagation();
    const memo = event.target.value;

    if (memo === '') {
      this.props.cancelError();
    }

    this.setState({memo: memo});
  }

  onMemoKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setMemo(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.reset();
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.textInput).focus()
  }

  render() {
    return (
      <div>
        <input
          ref='textInput'
          type='text'
        />
        <span>
          <button
            className='memo'
            onClick={}
            type='button'
          >

          </button>
        </span>
      </div>
    );
  }
}

export default Memo;
