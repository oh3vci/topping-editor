import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

// Gets all the links in the text, and returns them via the callback
const memoifyStrategy = (contentBlock: Object, callback: Function) => {
  const memos = linkify.match(contentBlock.get('text'));
  if (typeof memos !== 'undefined' && memos !== null) {
    for (let i = 0; i < memos.length; i += 1) {
      callback(memos[i].index, memos[i].lastIndex);
    }
  }
};

export default memoifyStrategy;
