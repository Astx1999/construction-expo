import React from "react";
import { ReactComponent as Prev } from "../../images/prev.svg";
import { useSwiper } from "swiper/react";

import styles from "./SwiperButton.module.scss";

const SwiperButtonPrev = ({ isVisible = true }) => {
  const swiper = useSwiper();

  return (
    <div
      onClick={() => swiper.slidePrev()}
      className={isVisible ? styles.navButton : styles.navButtonHidden}
    >
      <Prev />
    </div>
  );
};

export default SwiperButtonPrev;
