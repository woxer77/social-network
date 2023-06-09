import React from 'react';

import { Menu } from '@mui/material';

import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';

// eslint-disable-next-line react/prop-types
function CustomMenu({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <GlobalSvgSelector id="ellipsis" onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        autoFocus={false}
        sx={{
          '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
            borderRadius: '10px'
          }
        }}
      >
        {children}
      </Menu>
    </>
  );
}

export default CustomMenu;
