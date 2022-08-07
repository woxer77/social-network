import React from 'react';

import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import selectorProps from '../../../../propTypes/GlobalSvgSelector/selectorProps';

function GlobalSvgSelector({ id }) {
  switch (id) {
  case 'logo': {
    return (
      <svg
        height="512px"
        style={{ enableBackground: 'new 0 0 512 512' }}
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="_x33_0-atlassian">
          <g>
            <path
              d="M162.735,238.396c-6.918-7.366-17.699-6.918-22.281,2.516l-113.021,225.5    c-4.492,8.985,2.156,19.497,12.039,19.497h157.222c5.21,0.09,9.883-2.876,12.039-7.547    C242.783,408.466,222.299,302.003,162.735,238.396L162.735,238.396z"
              style={{ fill: '#0C62DC' }}
            />
            <path
              d="M245.568,33.29c-109.875,173.752-7.637,313.184,58.396,445.161    c2.246,4.583,6.918,7.549,12.039,7.549h156.504c10.063,0,16.53-10.602,12.039-19.497c0,0-210.679-422.792-215.98-433.303    C263.806,23.676,251.677,23.497,245.568,33.29z"
              style={{ fill: '#2681FF' }}
            />
          </g>
        </g>
        <g id="Layer_1" />
      </svg>
    );
  }
  case 'feed': {
    return (
      <WidgetsOutlinedIcon />
    );
  }
  case 'my-community': {
    return (
      <PeopleAltOutlinedIcon />
    );
  }
  case 'messages': {
    return (
      <CommentOutlinedIcon />
    );
  }
  case 'notifications': {
    return (
      <NotificationsNoneOutlinedIcon />
    );
  }
  case 'explore': {
    return (
      <PublicOutlinedIcon />
    );
  }
  case 'profile': {
    return (
      <PermIdentityOutlinedIcon />
    );
  }
  case 'settings': {
    return (
      <SettingsOutlinedIcon />
    );
  }
  case 'logout': {
    return (
      <LogoutOutlinedIcon />
    );
  }
  case 'ellipsis': {
    return (
      <MoreHorizIcon />
    );
  }
  case 'search': {
    return (
      <SearchIcon />
    );
  }
  case 'image': {
    return (
      <ImageOutlinedIcon />
    );
  }
  case 'happySmile': {
    return (
      <SentimentSatisfiedOutlinedIcon />
    );
  }
  case 'like': {
    return (
      <FavoriteBorderOutlinedIcon />
    );
  }
  case 'comment': {
    return (
      <ModeCommentOutlinedIcon />
    );
  }
  case 'share': {
    return (
      <ReplyAllOutlinedIcon />
    );
  }
  case 'gif': {
    return (
      <GifBoxOutlinedIcon />
    );
  }
  case 'send': {
    return (
      <SendOutlinedIcon />
    );
  }

  default:
    return null;
  }
}

GlobalSvgSelector.propTypes = selectorProps;

export default GlobalSvgSelector;
