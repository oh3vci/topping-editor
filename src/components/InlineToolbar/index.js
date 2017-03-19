import decorateComponentWithProps from 'decorate-component-with-props';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  ForeColorButton,
} from '../Buttons';
import createStore from '../../utils/createStore';
import Toolbar from './Toolbar';
import Separator from './Separator';


const createInlineToolbarPlugin = (config = {}) => {

  const store = createStore({
    isVisible: false,
  });

  const {
    structure = [
      BoldButton,
      ItalicButton,
      UnderlineButton,
      ForeColorButton,
    ]
  } = config;

  const toolbarProps = {
    store,
    structure,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      if (selection.getHasFocus() && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
      }
      return editorState;
    },
    InlineToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export default createInlineToolbarPlugin;

export {
  Separator,
};
