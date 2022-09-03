import React from 'react';

import Select from 'react-select';

import customSelectProps from '../../../propTypes/CustomSelect/customSelectProps';

function CustomSelect({
  options, onChange, ...props
}) {
  return (
    <Select
      options={options}
      onChange={onChange}
      {...props}
    />
  );
}

CustomSelect.propTypes = customSelectProps;

export default CustomSelect;
