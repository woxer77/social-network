import React from 'react';

import { Backdrop, Fade, Modal } from '@mui/material';
import modalImageProps from '../../../propTypes/ModalImage/modalImageProps';
import styles from './ModalImage.module.scss';

function ModalImage({ openModalImage, setOpenModalImage, modalImageSrc }) {
  const handleCloseModalImage = () => {
    setOpenModalImage(false);
  };

  return (
    <Modal
      className={styles.modal}
      open={openModalImage}
      onClose={handleCloseModalImage}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={openModalImage} timeout={500} className={styles['modal-img']}>
        <img
          src={modalImageSrc}
          alt="modal"
          style={{ maxHeight: '90%', maxWidth: '90%' }}
        />
      </Fade>
    </Modal>
  );
}

ModalImage.propTypes = modalImageProps;

export default ModalImage;
