export interface ISlide {
  image: string;
}

export interface ISliderProps {
  slides: ISlide[];
}

export interface IModalProps {
  image: string;
  handleClose: () => void
}