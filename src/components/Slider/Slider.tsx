import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './Slider.module.css';
import { ISliderProps } from '../../interfaces/detailedPage.interface';

export const Slider: React.FC<ISliderProps> = ({ slides }) => {
  return (
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
          <img src={slide.image} className={styles.swiper} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
