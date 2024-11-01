import React from 'react';

import { useSelector } from 'react-redux';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './Chat.module.scss';
import { url } from '../../../configs/config';
import Input from '../../UI/Input/Input';
import SendButton from '../../UI/SendButton/SendButton';
import { addMessage, getMessages } from '../../../services/messages';
import isEqual from '../../../helpers/isEqual';

/* eslint-disable react/prop-types, consistent-return, no-use-before-define */
function Chat({ receiver }) {
  const user = useSelector(state => state.userReducer.user);

  const emojiPickerRef = React.useRef(null);
  const emojiPickerButtonRef = React.useRef(null);
  const divForScrollRef = React.useRef(null);
  const socket = React.useRef();

  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [messagesState, setMessagesState] = React.useState([]);

  const initialValues = {
    users: [],
    text: ''
  };

  const emojiPickerStyles = {
    position: 'absolute',
    bottom: '115px',
    right: '137px',
    zIndex: 1
  };

  const { data: messagesData } = useQuery(['getMessages', user.userId, receiver.userId], () =>
    getMessages({ senderId: user.userId, receiverId: receiver.userId })
  );
  const messages = messagesData?.data || [];

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleOutsideClick = event => {
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

  React.useEffect(() => {
    if (messagesState.length !== 0 && divForScrollRef.current !== null)
      divForScrollRef.current.scrollIntoView();
  }, [messagesState, divForScrollRef]);

  React.useEffect(() => {
    socket.current = io(url);
    socket.current.emit('userConnected', user.userId);

    socket.current.on('newMessage', message => {
      setMessagesState(prevState => [...prevState, message]);
      // Update your state with the new message here
      console.log('update message state', message);
    });

    return () => {
      // Disconnect the user when the component is unmounted
      socket.current.off('newMessage');
      socket.current.disconnect();
    };
  }, [user.userId]);

  React.useEffect(() => {
    if (!isEqual(messages, messagesState)) {
      setMessagesState(messages);
    }
  }, [messages]);

  const mutateMessageHook = useMutation(
    ['addMessage', [user.userId, receiver.userId]],
    data => addMessage(data),
    {
      onSuccess(res) {
        const messagesAfterAdding = res.data;
        const newMessage = messagesAfterAdding[messagesAfterAdding.length - 1];
        socket.current.emit('sendMessage', newMessage);
        setMessagesState(messagesAfterAdding);
      }
    }
  );

  const onFormSubmit = async data => {
    if (data.text.trim() === '') return null;

    const localData = { ...data };
    localData.users = [];
    localData.users.push(user.userId, receiver.userId);

    mutateMessageHook.mutate(localData);

    formik.resetForm();
    divForScrollRef.current.scrollIntoView();
    return 1;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit
  });

  const buttonStyles = {
    backgroundColor: formik.values.text.trim() !== '' ? '#EBF2FF' : '#EBEEF5'
  };

  const addEmoji = emoji => {
    formik.setFieldValue('text', formik.values.text + emoji.native);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.header} key={`chat-header-${user.userId}`}>
        <Link to={`/profile/${user.userId}`}>
          <img
            className="icon"
            src={`${url}/images/${user.avatar}`}
            alt={`${user.userId}-avatar`}
          />
        </Link>
        <div className={styles.name}>
          {user.firstName} {user.secondName}
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles['main-wrapper']}>
        <div className={styles.main}>
          {messagesState.map((message, idx) => (
            <div
              className={`${styles.message} ${
                message.users[0] === user.userId ? styles.sender : styles.receiver
              }`}
              key={`${message.message_id}-${idx}`}
            >
              <Link
                to={`/profile/${message.users[0] === user.userId ? user.userId : receiver.userId}`}
              >
                <img
                  className="icon"
                  src={`${url}/images/${
                    message.users[0] === user.userId ? user.avatar : receiver.avatar
                  }`}
                  alt={`${message.users[0] === user.userId ? user.userId : receiver.userId}-avatar`}
                />
              </Link>
              <p className={styles.text}>{message.text}</p>
            </div>
          ))}
          <div ref={divForScrollRef} />
        </div>
      </div>
      <div className={styles.line} />
      <form onSubmit={formik.handleSubmit}>
        <Input
          customClassName={styles['comment-input']}
          withButtons
          handleEmojiClick={handleEmojiClick}
          emojiPickerButtonRef={emojiPickerButtonRef}
          value={formik.values.text}
          onChange={formik.handleChange}
        />
        <SendButton
          customClassName={styles['send-button']}
          style={buttonStyles}
          disabled={formik.values.text.trim() === ''}
        />
        {showEmojiPicker && (
          <div ref={emojiPickerRef} style={emojiPickerStyles}>
            <Picker data={emojiData} onEmojiSelect={addEmoji} />
          </div>
        )}
      </form>
    </div>
  );
}

export default Chat;
