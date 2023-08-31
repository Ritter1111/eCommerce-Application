import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@material-ui/core/Modal';
import { styleModalWindow } from '../../utils/consts';
import styles from './Modal.module.css';
import { IModalProps } from '../../interfaces/detailedPage.interface';
import { Close } from '@mui/icons-material';
import { Slider } from '../Slider/Slider';

export default function ModalWindow({
  slides,
  image,
  handleClose,
  handleClick,
}: IModalProps) {
  return (
    <Modal
      className={styles.modal_window}
      open={Boolean(image)}
      onClose={handleClose}
    >
      <Box sx={styleModalWindow}>
        <Slider slides={slides} handleClick={handleClick} isModal={true} />
        <Close onClick={handleClose} className={styles.close} />
      </Box>
    </Modal>
  );
}
