import React from 'react';

import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import { url } from '../../../configs/config';
import srcset from '../../../helpers/srcset';
import styles from './PostAdding.module.scss';

import Input from '../../UI/Input/Input';
import FilledButton from '../../UI/FilledButton/FilledButton';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import PostSvgSelector from '../../../assets/images/icons/post/PostSvgSelector';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import postAddingPropTypes from '../../../propTypes/PostAdding/postAddingPropTypes';
import { createPost } from '../../../services/posts';
import { getCurrentUTCDateTime } from '../../../helpers/time';
import { getUserFollowers, uploadImages } from '../../../services/users';
import imageOrdering from '../../../helpers/imageOrdering';
import Alert from '../../UI/Alert/Alert';
import activateAlert from '../../../helpers/alert';
import ModalImage from '../../UI/ModalImage/ModalImage';
import { setFollowers } from '../../../redux/slices/userSlice';

function PostAdding({
  availabilityOptions,
  customStyles
}) {
  const [inputActive, setInputActive] = React.useState(false);
  const [availability, setAvailability] = React.useState('for all');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [imagesState, setImagesState] = React.useState({ imagesPreview: [], imageListCols: null });
  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showImagePicker, setShowImagePicker] = React.useState(true);
  const [openModalImage, setOpenModalImage] = React.useState(false);
  const [modalImageSrc, setModalImageSrc] = React.useState('');

  const emojiPickerRef = React.useRef(null);
  const emojiPickerButtonRef = React.useRef(null);
  const fileInputRef = React.useRef();

  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const initialValues = {
    text: '',
    images: '',
    availability: 'for all',
    creationDate: '',
    creationTime: '',
    userId: ''
  };

  useQuery(['getUserFollowers', user.userId], () => getUserFollowers(user.userId), {
    onSuccess: (res) => {
      const followers = res.data;
      dispatch(setFollowers(followers));
    }
  });

  const mutatePostHook = useMutation(
    ['createPost', user.userId],
    (data) => createPost(data),
    {
      onSuccess() {
        window.location.reload();
      }
    }
  );

  const mutateImagesHook = useMutation(
    'uploadImages',
    (data) => uploadImages(data),
    {
      onSuccess(res) {
        const { data } = res;
        data.forEach((image) => {
          setImagesState((prevState) => {
            const newImages = [...prevState.imagesPreview, { img: image.filename }];
            const { dataArr: localDataArr, imageListCols: localImageListCols } = imageOrdering(newImages);

            // Обновляем превью изображений и количество колонок после добавления нового изображения
            return {
              imagesPreview: localDataArr,
              imageListCols: localImageListCols
            };
          });
        });
        console.log(res);
      }
    }
  );

  const onFormSubmit = async (data) => {
    if (data.text.trim().length === 0 && imagesState.imagesPreview.length === 0) return null;
    if (!user.isEmailActivated) return activateAlert(isAlertActive, setIsAlertActive, 'First you need to activate mail', setErrorMessage, 3000);
    const localData = { ...data, availability };
    const { date, time } = getCurrentUTCDateTime();

    localData.creationDate = date;
    localData.creationTime = time;
    localData.userId = user.userId;
    imagesState.imagesPreview.forEach((e) => {
      if (localData.images) localData.images = `${localData.images},${e.img}`;
      else localData.images = e.img;
    });

    if (localData.availability === 'for all') {
      localData.availabilityList = [];
    } else if (localData.availability === 'for me') {
      localData.availabilityList = [user.userId];
    } else if (localData.availability === 'for followers') {
      localData.availabilityList = [...user.followers, user.userId];
    }

    return mutatePostHook.mutate(localData);
  };

  const onUploadImages = () => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append('images', image, image.name);
    });

    mutateImagesHook.mutate(formData);
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
    backgroundColor: (formik.values.text.trim() !== '' || imagesState.imagesPreview.length > 0) ? '#377DFF' : '#74A4FC',
    color: 'white'
  };
  const imagePickerStyles = {
    opacity: showImagePicker ? 1 : 0.5,
    cursor: showImagePicker ? 'pointer' : 'default'
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

  const MAX_UPLOAD_IMAGE_SIZE = 4000000; // 4 MB
  const FILE_TYPE_IMAGE = 'image.*';

  // eslint-disable-next-line consistent-return
  const handleChange = (e) => {
    e.preventDefault();
    const { files } = e.target;

    const selectedImages = [];
    const readFile = (index) => {
      if (index >= files.length) {
        // Все файлы были прочитаны
        setImages(selectedImages);
        e.target.value = null; // очищаем значение инпута
        return;
      }

      const file = files[index];

      if (!file.type.match(FILE_TYPE_IMAGE) || file.size > MAX_UPLOAD_IMAGE_SIZE) {
        activateAlert(isAlertActive, setIsAlertActive, 'Wrong file format or size', setErrorMessage, 3000);
        readFile(index + 1); // Перейти к следующему файлу
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        selectedImages.push(file);
        readFile(index + 1); // Перейти к следующему файлу
      };
      reader.readAsDataURL(file);
    };

    readFile(0); // Начать чтение с первого файла
  };

  const handleButtonClick = () => {
    if (showImagePicker) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    if (images.length > 8) {
      activateAlert(isAlertActive, setIsAlertActive, 'You can upload up to 8 images', setErrorMessage, 3000);
      return;
    }

    if (images && images.length > 0) {
      onUploadImages();
    }
  }, [images]);

  React.useEffect(() => {
    if (imagesState.imagesPreview.length >= 8) {
      setShowImagePicker(false);
    } else {
      setShowImagePicker(true);
    }
  }, [imagesState.imagesPreview]);

  const handleImage = (src) => {
    setModalImageSrc(src);
    setOpenModalImage(true);
  };

  return (
    <>
      <ModalImage openModalImage={openModalImage} setOpenModalImage={setOpenModalImage} modalImageSrc={modalImageSrc} />
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div
        className={overlayStyles}
        onClick={inputDeactivateHandler}
      />
      <div className={styles['post-adding']}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.top}>
            <img
              className={`icon ${styles.icon}`}
              src={`${url}/images/${user.avatar}`}
              alt={`avatar-user-${user.userId}`}
            />
            <Input
              customClassName={styles.field}
              multiline
              setInputActive={setInputActive}
              value={formik.values.text}
              onChange={formik.handleChange}
            />
          </div>
          {(imagesState.imagesPreview.length > 0 && imagesState.imageListCols) && (
            <ImageList
              variant="quilted"
              cols={imagesState.imageListCols}
              gap={8}
              rowHeight={75}
              className={styles['images-wrapper']}
            >
              {imagesState.imagesPreview.map((item, idx) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  onClick={() => handleImage(`${url}/images/${item.img}`)}
                >
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img
                    {...srcset(`${url}/images/${item.img}`, 100, item.rows, item.cols)}
                    alt={`image-preview-${idx}`}
                    loading="lazy"
                    className={styles.image}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <div className={styles.bot}>
            <button
              type="button"
              className={styles['addition-block']}
              style={imagePickerStyles}
              onClick={handleButtonClick}
            >
              <div className={styles.icon}><PostSvgSelector id="image" /></div>
              <span className={styles['addition-text']}>Image</span>
              {showImagePicker && (
                <input type="file" hidden multiple onChange={handleChange} ref={fileInputRef} />
              )}
            </button>
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
            <FilledButton customClassName={styles.button} style={buttonStyles} disabled={formik.values.text.trim() === '' && imagesState.imagesPreview.length === 0}>Post</FilledButton>
          </div>
        </form>
      </div>
    </>
  );
}

PostAdding.propTypes = postAddingPropTypes;

export default PostAdding;
