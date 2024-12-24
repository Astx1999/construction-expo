import React, {useRef, useEffect} from "react";
import {ReactComponent as Jeep} from "../../images/jeep.svg";
import {ReactComponent as Mercedes} from "../../images/mercedes.svg";
import {ReactComponent as Porsche} from "../../images/porsche.svg";
import {ReactComponent as Audi} from "../../images/audi.svg";
import {ReactComponent as LandRover} from "../../images/landRover.svg";
import {ReactComponent as AlfaRomeo} from "../../images/alfa romeo.svg";
import {ReactComponent as Fiat} from "../../images/fiat.svg";
import {ReactComponent as Volvo} from "../../images/volvo.svg";
import {ReactComponent as Kia} from "../../images/kia.svg";
import {ReactComponent as Zeekr} from "../../images/zeekr.svg";
import {ReactComponent as Geely} from "../../images/geely.svg";
import {ReactComponent as Neta} from "../../images/neta.svg";
import {ReactComponent as Xpeng} from "../../images/xpeng.svg";
import {ReactComponent as Foton} from "../../images/foton.svg";
import {ReactComponent as Shell} from "../../images/shell.svg";
import {ReactComponent as Arcfox} from "../../images/ARCFOX.svg";
import classNames from "classnames";

import {ReactComponent as SportComplex} from "../../images/sportComplex.svg";

import HomepageVideo from "../../images/home.mp4";
import styles from "./HomeNew.module.scss";
import CtaButton from "../../components/CtaButton/CtaButton";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";

const HomeNew = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.7; // Set the default playback speed to 0.7x
        }
    }, []); // Run this effect only once when the component mounts

    const partners = [
        <Mercedes/>,
        <Audi/>,
        <Porsche/>,
        // <LandRover/>,
        <AlfaRomeo/>,
        <Fiat/>,
        <Volvo/>,
        <Jeep/>,
        <Kia/>,
        <Zeekr/>,
        <Geely/>,
        <Neta/>,
        <Xpeng/>,
        <Foton/>,
        <Shell/>,
        <Arcfox/>
    ];

    const {width} = useWindowResize();
    const {t} = useTranslation(); // Access translations

    const {setIsOpen} = useModal();
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <div className={styles.videoContainer}>
                <video
                    id="videoPlayback"
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                >
                    <source src={HomepageVideo} type="video/mp4"/>
                </video>
            </div>
            <p className={classNames(styles.title, styles.line1)}>{t("discover")}</p>
            {/*<Countdown/>*/}
            <div className={classNames(styles.dates, styles.line2)}>
                {" "}
                {t("june")} 21
                <div className={styles.dot}>
                    <div/>
                </div>
                22
                <div className={styles.dot}>
                    <div/>
                </div>
                23
            </div>
            <div className={classNames(styles.desc, styles.line3)}>
                <SportComplex/>
                <span
                    dangerouslySetInnerHTML={{__html: width <= 767 ? t("karen_demirchyan_mobile") : t("karen_demirchyan")}}/>
            </div>
            <div className={styles.line4}>
                <CtaButton
                    text={t("become_a_visitor")}
                    onClick={() => {
                        setIsOpen("visitor")
                        navigate("/home/becomeavisitor")
                    }}
                    mirror={!(width > 767)}
                />
            </div>

            {/*      {width > 767 && (
        <div className={styles.exhibitors}>
          <div className={styles.exhibitorsContainer}>
            <Jeep />
            <Mercedes />
            <Lexus />
            <Porsche />
            <Audi />
            <ImMotors />
            <LandRover />
          </div>
        </div>
      )} */}

            {/*{width <= 767 && (*/}
            <div className={styles.carousel}>
                <div className={styles.swiperContainer}>
                    <Swiper
                        // install Swiper modules
                        modules={[Autoplay]}
                        loop={true}
                        freeMode={true}
                        allowTouchMove={true}
                        autoplay={{
                            delay: 500,
                            disableOnInteraction: false,
                        }}
                        slidesPerView={width >= 1200 ? 7 : (width > 479 ? 5 : 3)}
                        spaceBetween={10}
                        speed={1800}
                        a11y={false}
                    >
                        {partners.length &&
                        partners.map((partner, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.partner}>{partner}</div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/*)}*/}
        </div>
    );
};

export default HomeNew;
