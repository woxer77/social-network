import React from 'react';

import { ReactComponent as Email } from '../auth/email.svg';
import { ReactComponent as DateOfBirth } from './date-of-birth.svg';
import { ReactComponent as Gender } from '../auth/account-box.svg';
import { ReactComponent as Country } from './country.svg';
import { ReactComponent as Phone } from './phone.svg';
import { ReactComponent as Upload } from './upload.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function ProfileSvgSelector({ id, ...props }) {
  switch (id) {
  case 'email':
    return <Email {...props} />;
  case 'date-of-birth':
    return <DateOfBirth {...props} />;
  case 'gender':
    return <Gender {...props} />;
  case 'country':
    return <Country {...props} />;
  case 'phone':
    return <Phone {...props} />;
  case 'upload':
    return <Upload {...props} />;

  default:
    return null;
  }
}

ProfileSvgSelector.propTypes = selectorProps;

export default React.memo(ProfileSvgSelector);
