import React from 'react';

import { ReactComponent as Dots } from './dots.svg';
import { ReactComponent as EyeOn } from './eye-on.svg';
import { ReactComponent as EyeOff } from './eye-off.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function GlobalSvgSelector({ id, ...props }) {
  switch (id) {
  case 'ellipsis':
    return <Dots {...props} />;
  case 'eyeOn':
    return <EyeOn {...props} />;
  case 'eyeOff':
    return <EyeOff {...props} />;

  default:
    return null;
  }
}

GlobalSvgSelector.propTypes = selectorProps;

export default React.memo(GlobalSvgSelector);
