import React from 'react';

import { RemoveScroll } from 'react-remove-scroll';

import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import styles from './PostAdding.module.scss';

import Input from '../../UI/Input/Input';
import FilledButton from '../../UI/FilledButton/FilledButton';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import postAddingPropTypes from '../../../propTypes/PostAdding/postAddingPropTypes';
import { createPost } from '../../../services/posts';
import { getCurrentUTCDateTime } from '../../../helpers/time';

function PostAdding({
  availabilityOptions,
  customStyles
}) {
  const [inputActive, setInputActive] = React.useState(false);
  const [availability, setAvailability] = React.useState('for all');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const emojiPickerRef = React.useRef(null);
  const emojiPickerButtonRef = React.useRef(null);

  const user = useSelector((state) => state.userReducer.user);

  const initialValues = {
    text: '',
    images: '',
    availability: 'for all',
    creationDate: '',
    creationTime: '',
    userId: ''
  };

  const mutateHook = useMutation(
    'post create',
    (data) => createPost(data),
    {
      onSuccess() {
        window.location.reload();
      }
    }
  );

  const onFormSubmit = async (data) => {
    if (!data.text) return null;
    const localData = { ...data, availability };
    const { date, time } = getCurrentUTCDateTime();

    localData.creationDate = date;
    localData.creationTime = time;
    localData.userId = user.userId;

    console.log('data:', localData);
    return mutateHook.mutate(localData);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit
  });

  const overlayStyles = !inputActive ? `${styles.overlay}` : `${styles.overlay} ${styles.active}`;
  const emojiPickerButtonStyles = {
    icon: { fill: showEmojiPicker ? '#1565c0' : '#515f7a' },
    text: { color: showEmojiPicker ? '#1565c0' : '#515f7a' }
  };
  const emojiPickerStyles = {
    position: 'absolute',
    top: inputActive ? '256px' : '143px',
    left: '175px',
    zIndex: 1
  };
  const buttonStyles = {
    backgroundColor: formik.values.text ? '#377DFF' : '#74A4FC',
    color: 'white'
  };

  const inputDeactivateHandler = () => {
    setInputActive(false);
  };

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

  const addEmoji = (emoji) => {
    formik.setFieldValue('text', formik.values.text + emoji.native);
  };

  return (
    <>
      <div
        className={overlayStyles}
        onClick={inputDeactivateHandler}
      />

      <RemoveScroll className={styles['post-adding']} enabled={inputActive}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.top}>
            <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
            <Input
              customClassName={styles.field}
              multiline
              setInputActive={setInputActive}
              value={formik.values.text}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.bot}>
            <div className={styles['addition-block']}>
              <div className={styles.icon}><PostSvgSelector id="image" /></div>
              <span className={styles['addition-text']}>Photo/Video</span>
            </div>
            <div className={styles['addition-block']}>
              <div onClick={handleEmojiClick} ref={emojiPickerButtonRef} style={{ display: 'flex' }}>
                <div className={styles.icon}><PostSvgSelector id="happySmile" style={emojiPickerButtonStyles.icon} /></div>
                <span className={styles['addition-text']} style={emojiPickerButtonStyles.text}>Feeling</span>
              </div>
              {showEmojiPicker && (
                <div ref={emojiPickerRef} style={emojiPickerStyles}>
                  <Picker data={emojiData} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>
            <div className={styles['addition-block']}>
              <div className={styles.icon}><GlobalSvgSelector id="eyeOn" /></div>
              <CustomSelect
                options={availabilityOptions}
                onChange={(value) => setAvailability(value.value)}
                placeholder="Availability"
                styles={customStyles}
                defaultValue={availabilityOptions[0]}
              />
            </div>
            <FilledButton customClassName={styles.button} style={buttonStyles} disabled={!formik.values.text}>Post</FilledButton>
          </div>
        </form>
      </RemoveScroll>
    </>
  );
}

PostAdding.propTypes = postAddingPropTypes;

export default PostAdding;
