import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import styles from './Slider-Home.module.css';
import { delay, images } from '../../../utils/consts';

function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleChange = (value: number) => {
    setIndex(value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <Paper elevation={2} className={styles.slideshow}>
          <SwipeableViews
            className={styles.slideshowSlider}
            index={index}
            onChangeIndex={handleChange}
            enableMouseEvents
          >
            {images.map((image, idx) => (
              <div
                className={styles.slide}
                key={idx}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              ></div>
            ))}
          </SwipeableViews>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Slideshow;
