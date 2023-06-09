import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import styles from './Profile.module.scss';
import Header from '../../elements/Header/Header';
import LeftSidebar from '../../elements/LeftSidebar/LeftSidebar';
import { url } from '../../../configs/config';

import profileProps from '../../../propTypes/Profile/profileProps';
import ProfileSvgSelector from '../../../assets/images/icons/profile/ProfileSvgSelector';
import { convertDateToValidFormat } from '../../../helpers/time';
import MyPostsContainer from '../../../containers/elements/Posts/MyPostsContainer';
import PostAddingContainer from '../../../containers/elements/PostAdding/PostAddingContainer';
import activateAlert from '../../../helpers/alert';
import Alert from '../../UI/Alert/Alert';
import {
  updateUserAvatar,
  updateUserCoverPhoto,
  uploadImageAvatar,
  uploadImageCoverPhoto
} from '../../../services/users';
import { setAvatar } from '../../../redux/slices/userSlice';
import EditProfileModal from '../../UI/EditProfileModal/EditProfileModal';
import Follow from '../../UI/Follow/Follow';

/* eslint-disable no-unused-vars, consistent-return */

function Profile({
  userId, firstName, secondName, email, dateOfBirth, gender, country, phone, avatar, coverPhoto, followers, following
}) {
  const introArr = [
    {
      iconId: 'email',
      text: email
    },
    {
      iconId: 'date-of-birth',
      text: convertDateToValidFormat(new Date(dateOfBirth))
    },
    {
      iconId: 'gender',
      text: gender
    },
    {
      iconId: 'country',
      text: country
    },
    {
      iconId: 'phone',
      text: phone
    }
  ];

  const [isAlertActive, setIsAlertActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [coverPhotoState, setCoverPhotoState] = React.useState(coverPhoto);
  const [coverAvatarState, setAvatarState] = React.useState(avatar);
  const [isEditModalActive, setIsEditModalActive] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState(false);

  const fileInputCoverPhotoRef = React.useRef();
  const fileInputAvatarRef = React.useRef();

  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const handleCoverPhotoClick = () => {
    fileInputCoverPhotoRef.current.click();
  };

  const handleAvatarClick = () => {
    fileInputAvatarRef.current.click();
  };

  const mutateUpdateCoverPhotoHook = useMutation(
    ['updateUserCoverPhoto', userId],
    (filename) => updateUserCoverPhoto({ userId, filename }),
    {
      onSuccess: (res) => {
        setCoverPhotoState(res.data[0].cover_photo);
      }
    }
  );

  const mutateUpdateAvatarHook = useMutation(
    ['updateUserAvatar', userId],
    (filename) => updateUserAvatar({ userId, filename }),
    {
      onSuccess: (res) => {
        const resAvatar = res.data[0].avatar;

        setAvatarState(resAvatar);
        dispatch(setAvatar(resAvatar));
      },
      onError: (err) => {
        console.log('avatar uploading error:', err);
      }
    }
  );

  const onFormSubmitCoverPhoto = async (filename) => {
    mutateUpdateCoverPhotoHook.mutate(filename);
  };

  const onFormSubmitAvatar = async (filename) => {
    mutateUpdateAvatarHook.mutate(filename);
  };

  const mutateCoverPhotoHook = useMutation(
    ['uploadImageCoverPhoto'],
    (data) => uploadImageCoverPhoto(data),
    {
      onSuccess(res) {
        onFormSubmitCoverPhoto(res.data.filename);
      }
    }
  );

  const mutateAvatarHook = useMutation(
    ['uploadImageAvatar'],
    (data) => uploadImageAvatar(data),
    {
      onSuccess(res) {
        onFormSubmitAvatar(res.data.filename);
      }
    }
  );

  const onUploadImage = (file, fieldName, mutateHook) => {
    const formData = new FormData();
    formData.append(fieldName, file, file.name);
    mutateHook.mutate(formData);
  };

  const onUploadImageCoverPhoto = (file) => {
    onUploadImage(file, 'cover-photo', mutateCoverPhotoHook);
  };

  const onUploadImageAvatar = (file) => {
    onUploadImage(file, 'avatar', mutateAvatarHook);
  };

  const MAX_UPLOAD_IMAGE_SIZE = 4000000; // 4 MB
  const FILE_TYPE_IMAGE = 'image.*';

  const handleChangeFile = (e, onUploadImageLocal) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file || (!file.type.match(FILE_TYPE_IMAGE) || file.size > MAX_UPLOAD_IMAGE_SIZE)) {
      activateAlert(isAlertActive, setIsAlertActive, 'Wrong file format or size', setErrorMessage, 3000);
    } else {
      onUploadImageLocal(file);
      reader.readAsDataURL(file);
    }
  };

  function activateEditModal() {
    setIsEditModalActive(true);
  }

  React.useEffect(() => {
    if (user.following.length !== 0) {
      setIsFriend(user.following.includes(userId));
    } else setIsFriend(false);
  }, [user.following]);

  return (
    <>
      <Header />
      <LeftSidebar />
      <Alert isAlertActive={isAlertActive} errorMessage={errorMessage} />
      <div className={styles.profile}>
        <div className={styles.top}>
          <div className={styles['cover-photo']}>
            <img src={`${url}/images/${coverPhotoState}`} alt="cover" />
          </div>
          <div className={styles.info}>
            <div className={styles.avatar} onClick={userId === user.userId ? handleAvatarClick : () => {}}>
              <img src={`${url}/images/${coverAvatarState}`} alt={`avatar-user-${userId}`} />
              {userId === user.userId && (
                <>
                  <div className={styles['icon-wrapper']}>
                    <ProfileSvgSelector id="upload" />
                  </div>
                  <input type="file" hidden onChange={(e) => handleChangeFile(e, onUploadImageAvatar)} ref={fileInputAvatarRef} />
                </>
              )}
            </div>
            <div className={styles['name-wrapper']}>
              <div className={styles.name}>
                {firstName} {secondName}
              </div>
              <p className={styles.followers}>
                <p><span className={styles.number}>{followers.length}</span> {followers.length > 1 ? 'followers' : 'follower'}</p>
                <p><span className={styles.number}>{following.length}</span> {following.length > 1 ? 'following' : 'following'}</p>
              </p>
            </div>
            { userId === user.userId && (
              <button type="button" className={styles['edit-cover-photo']} onClick={handleCoverPhotoClick}>
                <ProfileSvgSelector id="upload" />
                <p>Edit Cover Photo</p>
                <input type="file" hidden onChange={(e) => handleChangeFile(e, onUploadImageCoverPhoto)} ref={fileInputCoverPhotoRef} />
              </button>
            )}
            { userId === user.userId && (
              <button type="button" className={`${styles['right-button']} ${styles['edit-basic-info']}`} onClick={activateEditModal}>
                Edit basic info
              </button>
            )}
            { userId !== user.userId && (
              <Follow
                customClassName={`${styles['right-button']} ${isFriend ? styles.followed : ''}`}
                followTo={userId}
                action={isFriend ? 'unfollow' : 'follow'}
              >{isFriend ? 'Unfollow' : 'Follow'}
              </Follow>
            ) }
            { isEditModalActive && (
              <EditProfileModal
                userId={userId}
                firstName={firstName}
                secondName={secondName}
                email={email}
                dateOfBirth={dateOfBirth}
                gender={gender}
                country={country}
                phone={phone}
                isEditModalActive={isEditModalActive}
                setIsEditModalActive={setIsEditModalActive}
              />
            ) }
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles['intro-wrapper']}>
            <div className={styles.intro}>
              <p className={styles.title}>Intro</p>
              <div className={styles.elements}>
                {introArr.map((element) => (
                  <div className={styles.element} key={`user-${userId}-${element.iconId}`}>
                    <ProfileSvgSelector id={element.iconId} />
                    <p className={styles['element-text']}>{element.text || 'Unknown'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.posts}>
            { userId === user.userId && <PostAddingContainer /> }
            <div className={styles['posts-wrapper']}>
              <MyPostsContainer userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Profile.propTypes = profileProps;

export default Profile;
