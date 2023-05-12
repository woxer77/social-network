import React from 'react';

import { ReactComponent as Image } from './image.svg';
import { ReactComponent as EmojiSmile } from './emoji-smile.svg';
import { ReactComponent as Heart } from './heart.svg';
import { ReactComponent as Comment } from './comment.svg';
import { ReactComponent as Share } from './share.svg';
import { ReactComponent as Gif } from './gif.svg';
import { ReactComponent as SendArrow } from './send-arrow.svg';
import { ReactComponent as PersonRemove } from './person-remove.svg';

import selectorProps from '../../../../propTypes/SvgSelector/selectorProps';

function PostSvgSelector({ id, ...props }) {
  switch (id) {
  case 'image':
    return <Image {...props} />;
  case 'happySmile':
    return <EmojiSmile {...props} />;
  case 'like':
    return <Heart {...props} />;
  case 'comment':
    return <Comment {...props} />;
  case 'share':
    return <Share {...props} />;
  case 'gif':
    return <Gif {...props} />;
  case 'send':
    return <SendArrow {...props} />;
  case 'unfollow': // not using
    return <PersonRemove {...props} />;

  default:
    return null;
  }
}

PostSvgSelector.propTypes = selectorProps;

export default React.memo(PostSvgSelector);
