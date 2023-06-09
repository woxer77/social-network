import React from 'react';

import { ReactComponent as Google } from './google.svg';
import { ReactComponent as Facebook } from './facebook.svg';
import { ReactComponent as Email } from './email.svg';
import { ReactComponent as Password } from './password.svg';
import { ReactComponent as Male } from './male.svg';
import { ReactComponent as Female } from './female.svg';
import { ReactComponent as AccountCircle } from './account-circle.svg';
import { ReactComponent as AccountBox } from './account-box.svg';
import { ReactComponent as Country } from './country.svg';
import { ReactComponent as Phone } from './phone.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function AuthSvgSelector({ id, ...props }) {
  switch (id) {
  case 'google':
    return <Google {...props} />;
  case 'facebook':
    return <Facebook {...props} />;
  case 'email':
    return <Email {...props} />;
  case 'password':
    return <Password {...props} />;
  case 'male':
    return <Male {...props} />;
  case 'female':
    return <Female {...props} />;
  case 'regName':
    return <AccountCircle {...props} />;
  case 'regSurname':
    return <AccountBox {...props} />;
  case 'country':
    return <Country {...props} />;
  case 'phone':
    return <Phone {...props} />;

  default:
    return null;
  }
}

AuthSvgSelector.propTypes = selectorProps;

export default React.memo(AuthSvgSelector);
