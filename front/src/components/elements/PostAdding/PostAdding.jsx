import React from 'react';

import { RemoveScroll } from 'react-remove-scroll';
import styles from './PostAdding.module.scss';
import Input from '../../UI/Input/Input';
import FilledButton from '../../UI/FilledButton/FilledButton';
import GlobalSvgSelector from '../../../assets/images/icons/global/GlobalSvgSelector';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import postAddingPropTypes from '../../../propTypes/PostAdding/postAddingPropTypes';

function PostAdding({
  inputActive,
  setInputActive,
  setAvailability,
  availabilityOptions,
  customStyles
}) {
  const wrapperClasses = inputActive === false ? `${styles.wrapper}` : `${styles.wrapper} ${styles.active}`;

  return (
    <>
      <div className={wrapperClasses} onClick={() => setInputActive(false)} />
      <RemoveScroll className={styles['post-adding']} enabled={inputActive}>
        <div className={styles.top}>
          <img className={`icon ${styles.icon}`} src="https://picsum.photos/500/300?random=1" alt="photo1" />
          <Input
            customClassName={styles.field}
            multiline
            setInputActive={setInputActive}
          />
        </div>
        <div className={styles.bot}>
          <div className={styles['addition-block']}>
            <div className={styles.icon}><GlobalSvgSelector id="image" /></div>
            <span className={styles['addition-text']}>Photo/Video</span>
          </div>
          <div className={styles['addition-block']}>
            <div className={styles.icon}><GlobalSvgSelector id="happySmile" /></div>
            <span className={styles['addition-text']}>Feeling</span>
          </div>
          <div className={styles['addition-block']}>
            <div className={styles.icon}><GlobalSvgSelector id="availability" /></div>
            <CustomSelect
              options={availabilityOptions}
              onChange={(value) => setAvailability(value.value)}
              placeholder="Availability"
              styles={customStyles}
            />
          </div>
          <FilledButton customClassName={styles.button}>Post</FilledButton>
        </div>
      </RemoveScroll>
    </>
  );
}

PostAdding.propTypes = postAddingPropTypes;

export default PostAdding;
