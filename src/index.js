import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

import './styles/buttonStyles.css';
import './styles/blockTypeSelectStyles.css';
import './styles/toolbarStyles.css';
import './styles/separatorStyles.css';
import './styles/memoStyles.css';

import './styles/style.css';
import 'semantic-ui-css/semantic.min.css';
import 'tether-shepherd/dist/css/shepherd-theme-arrows.css';

render(
  <App />,
  document.getElementById('root'),
);
