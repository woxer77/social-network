import React from 'react';

import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import styles from './CommentAdding.module.scss';

import { url } from '../../../configs/config';

import commentAdding from '../../../propTypes/CommentAdding/commentAddingProps';
import Input from '../../UI/Input/Input';
import SendButton from '../../UI/SendButton/SendButton';
import { createComment } from '../../../services/comments';
import { getCurrentUTCDateTime } from '../../../helpers/time';
import activateAlert from '../../../helpers/alert';
import Alert from '../../UI/Alert/Alert';

function CommentAdding({ postId, textFieldRef }) {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const emojiPickerRef = React.useRef(null);
  const emojiPickerButtonRef = React.useRef(null);

  const user = useSelector((state) => state.userReducer.user);

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // eslint-disable-next-line consistent-return
  const handleOutsideClick = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      if (emojiPickerButtonRef.current.contains(event.target)) return null;
      setShowEmojiPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const initialValues = {
    text: '',
    creationDate: '',
    creationTime: '',
    userId: '',
    postId: ''
  };

  const mutatePostHook = useMutation(
    ['createComment', [user.userId, postId]],
    (data) => createComment(data),
    {
      onSuccess() {
        window.location.reload();
      }
    }
  );

  const onFormSubmit = async (data) => {
    if (data.text.trim() === '') return null;
    if (!user.isEmailActivated) return activateAlert(isAlertActive, setIsAlertActive, 'First you need to activate mail', setErrorMessage, 3000);
    const localData = { ...data };
    const { date, time } = getCurrentUTCDateTime();

    localData.creationDate = date;
    localData.creationTime = time;
    localData.userId = user.userId;
    localData.postId = postId;

    return mutatePostHook.mutate(localData);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit
  });

  const addEmoji = (emoji) => {
    formik.setFieldValue('text', formik.values.text + emoji.native);
  };

  const emojiPickerStyles = {
    position: 'absolute',
    bottom: '80px',
    right: '80px',
    zIndex: 1
  };

  const buttonStyles = {
    backgroundColor: (formik.values.text.trim() !== '' ? '#EBF2FF' : '#EBEEF5')
  };

  return (
    <>
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div className={styles['comment-adding']}>
        <Link to={`/profile/${user.userId}`}>
          <img
            className="icon"
            src={`${url}/images/${user.avatar}`}
            alt={`avatar-user-${user.userId}`}
          />
        </Link>
        <form onSubmit={formik.handleSubmit}>
          <Input customClassName={styles['comment-input']} withButtons handleEmojiClick={handleEmojiClick} emojiPickerButtonRef={emojiPickerButtonRef} value={formik.values.text} onChange={formik.handleChange} inputRef={textFieldRef} />
          <SendButton customClassName={styles['send-button']} style={buttonStyles} disabled={formik.values.text.trim() === ''} />
          {showEmojiPicker && (
            <div ref={emojiPickerRef} style={emojiPickerStyles}>
              <Picker data={emojiData} onEmojiSelect={addEmoji} />
            </div>
          )}
        </form>
      </div>
    </>
  );
}

CommentAdding.propTypes = commentAdding;

export default CommentAdding;
