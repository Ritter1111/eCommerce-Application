import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ISliderProps } from '../../interfaces/detailedPage.interface';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './Slider.module.css';
import ModalWindow from '../Modal/Modal';

export function Slider({ slides }: ISliderProps) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState('');

  function handleClick(img: string) {
    setImage(img);
    setOpen(true);
    // console.log(img);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.image}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={slide.image}
              className={styles.swiper}
              onClick={() => handleClick(slide.image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {open && <ModalWindow handleClose={handleClose} image={image} />}
    </>
  );
}
