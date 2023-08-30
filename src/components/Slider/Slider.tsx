import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ISliderProps } from '../../interfaces/detailedPage.interface';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './Slider.module.css';

export function Slider({ slides }: ISliderProps) {
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
}
