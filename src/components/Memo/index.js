//import decorateComponentWithProps from 'decorate-component-with-props';
import Memo from './Memo';
import MemoAdd2 from './MemoAdd2';
import MemoSideBar from './MemoSideBar';
import memoStrategy from './memoStrategy';



const memoPlugin = () => {
  // Styles are overwritten instead of merged as merging causes a lot of confusion.

  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.

  return {
    decorators: [
      {
        strategy: memoStrategy,
        component: Memo,
      },
    ],
    MemoAdd2,
    MemoSideBar,
  };
};

export default memoPlugin;
