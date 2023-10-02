import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  slideshow: {
    margin: "0 auto",
    overflow: "hidden",
    maxWidth: '100%',
  },

  slideshowSlider: {
    transition: "ease 1000ms",
  },

  slide: {
    display: "block",
    height: '80vh',
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "grayscale(100%)"

  },

  slideshowDots: {
    textAlign: "center",
  },

  slideshowDot: {
    display: "flex",
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderRadius: "50%",
    cursor: "pointer",
    margin: "15px 7px 0px",
    backgroundColor: "#c4c4c4",
  },

  active: {
    backgroundColor: "#6a0dad",
  },

  arrowIcon: {
    fontSize: 48,
    color: "white",
  },

  sliderPagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px'
  }
  
}));