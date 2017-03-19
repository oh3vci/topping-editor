import React from 'react';
import { fromJS } from 'immutable';
import unionClassNames from 'union-class-names';

const MemoText = ({ children, className }) =>
  <span
    className={className}
    spellCheck={false}
  >
    {children}
  </span>;
