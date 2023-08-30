import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@material-ui/core/Modal';
import { style } from '../../utils/consts';
import styles from './Modal.module.css';
import { IModalProps } from '../../interfaces/detailedPage.interface';
import { Close } from '@mui/icons-material';

export default function ModalWindow({ image, handleClose }: IModalProps) {
  return (
    <>
      <Modal
        open={Boolean(image)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Close onClick={handleClose} className={styles.close}/>

          <img src={image} className={styles.modal} key={image} />
        </Box>
      </Modal>
    </>
  );
}
