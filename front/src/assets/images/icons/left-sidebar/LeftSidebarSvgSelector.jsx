import React from 'react';

import { ReactComponent as Squares } from './squares.svg';
import { ReactComponent as People } from './people.svg';
import { ReactComponent as Message } from './message.svg';
import { ReactComponent as Bell } from './bell.svg';
import { ReactComponent as Earth } from './earth.svg';
import { ReactComponent as Person } from './person.svg';
import { ReactComponent as Settings } from './settings.svg';
import { ReactComponent as Logout } from './logout.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function LeftSidebarSvgSelector({ id, ...props }) {
  switch (id) {
  case 'feed':
    return <Squares {...props} />;
  case 'my-community':
    return <People {...props} />;
  case 'messages':
    return <Message {...props} />;
  case 'notifications':
    return <Bell {...props} />;
  case 'explore':
    return <Earth {...props} />;
  case 'profile':
    return <Person {...props} />;
  case 'settings':
    return <Settings {...props} />;
  case 'logout':
    return <Logout {...props} />;

  default:
    return null;
  }
}

LeftSidebarSvgSelector.propTypes = selectorProps;

export default React.memo(LeftSidebarSvgSelector);
