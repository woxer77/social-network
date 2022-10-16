import React, { useState } from 'react';

import PostAdding from '../../../components/elements/PostAdding/PostAdding';

function PostAddingContainer() {
  const [inputActive, setInputActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [availability, setAvailability] = useState('');

  // TODO: availability for classmates, colleagues etc...
  const availabilityOptions = [
    { value: 'for all', label: 'For all' },
    { value: 'for friends', label: 'For friends' },
    { value: 'for me', label: 'For me' }
  ];

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles, backgroundColor: '#F6F7F8', border: 'none', marginLeft: '12px', maxWidth: '140px'
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles, color: '#4E5D78', fontSize: '17px', fontWeight: 500
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles, color: '#4E5D78', fontSize: '17px', fontWeight: 500
    }),
    indicatorsContainer: (defaultStyles) => ({
      ...defaultStyles, cursor: 'pointer'
    }),
    valueContainer: (defaultStyles) => ({
      ...defaultStyles, cursor: 'text'
    })
  };

  return (
    <PostAdding
      inputActive={inputActive}
      setInputActive={setInputActive}
      setAvailability={setAvailability}
      availabilityOptions={availabilityOptions}
      customStyles={customStyles}
    />
  );
}

export default PostAddingContainer;
