import React from 'react';

import { ReactComponent as Search } from './search.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function HeaderSvgSelector({ id, ...props }) {
  switch (id) {
  case 'search':
    return <Search {...props} />;

  default:
    return null;
  }
}

HeaderSvgSelector.propTypes = selectorProps;

export default React.memo(HeaderSvgSelector);
