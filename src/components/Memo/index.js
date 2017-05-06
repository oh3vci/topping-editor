import decorateComponentWithProps from 'decorate-component-with-props';
import Memo from './Memo';
import MemoAdd from './MemoAdd';
import MemoSideBar from './MemoSideBar';
import memoStrategy from './memoStrategy';


const memoPlugin = (config = {}) => {
  // Styles are overwritten instead of merged as merging causes a lot of confusion.

  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.

  const {
    target = '_memo',
  } = config;

  return {
    decorators: [
      {
        strategy: memoStrategy,
        component: decorateComponentWithProps(Memo, { target }),
      },
    ],
    MemoAdd,
    MemoSideBar,
  };
};

export default memoPlugin;
