import React from "react";
import { ReactComponent as Next } from "../../images/next.svg";
import { useSwiper } from "swiper/react";

import styles from "./SwiperButton.module.scss";

const SwiperButtonNext = ({ isVisible = true }) => {
  const swiper = useSwiper();
  return (
    <div
      onClick={() => swiper.slideNext()}
      className={isVisible ? styles.navButton : styles.navButtonHidden}
    >
      <Next />
    </div>
  );
};

export default SwiperButtonNext;
