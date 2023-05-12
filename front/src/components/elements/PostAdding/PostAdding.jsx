import React from 'react';

import { RemoveScroll } from 'react-remove-scroll';

import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
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
  const [availability, setAvailability] = React.useState('');
  const user = useSelector((state) => state.userReducer.user);

  const overlayStyles = !inputActive ? `${styles.overlay}` : `${styles.overlay} ${styles.active}`;
  const initialValues = {
    text: '',
    images: '',
    availability: 'for all',
    creationDate: '',
    creationTime: '',
    userId: ''
  };

  const inputDeactivateHandler = () => {
    setInputActive(false);
  };

  const mutateHook = useMutation(
    'post create',
    (data) => createPost(data)
  );

  const onFormSubmit = async (data) => {
    const localData = { ...data, availability };
    const { date, time } = getCurrentUTCDateTime();

    localData.creationDate = date;
    localData.creationTime = time;
    localData.userId = user.userId;

    console.log('data:', localData);
    mutateHook.mutate(localData);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit
  });

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
              <div className={styles.icon}><PostSvgSelector id="happySmile" /></div>
              <span className={styles['addition-text']}>Feeling</span>
            </div>
            <div className={styles['addition-block']}>
              <div className={styles.icon}><GlobalSvgSelector id="eyeOn" /></div>
              <CustomSelect
                options={availabilityOptions}
                onChange={(value) => setAvailability(value.value)}
                placeholder="Availability"
                styles={customStyles}
              />
            </div>
            <FilledButton customClassName={styles.button}>Post</FilledButton>
          </div>
        </form>
      </RemoveScroll>
    </>
  );
}

PostAdding.propTypes = postAddingPropTypes;

export default PostAdding;
