import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useStyles } from './Slider-Home.styles';

const images = [
  'https://hypeandhyper.com/content/images/2022/10/bcefw-1.jpg',
  'https://imagedelivery.net/4_JwVYxosZqzJ7gIDJgTLA/61f9074b2fb49-moda-11.jpeg/16x9',
  'https://cdn.nwmgroups.hu/s/img/i/2109/20210903budapest-central-european-fashion-week.jpg',
  'https://theglossarymagazine.com/wp-content/uploads/Ukranian-Fashion-Designers.webp',
  'https://static01.nyt.com/images/2023/03/02/multimedia/24UKRAINE-DESIGNERS-vtcq/24UKRAINE-DESIGNERS-vtcq-videoSixteenByNine3000.jpg'
];

const delay = 2000;

function Slideshow() {
  const classes = useStyles();
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
        <Paper elevation={2} className={classes.slideshow}>
          <SwipeableViews
            className={classes.slideshowSlider}
            index={index}
            onChangeIndex={handleChange}
            enableMouseEvents
          >
            {images.map((image, idx) => (
              <div
                className={classes.slide}
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
