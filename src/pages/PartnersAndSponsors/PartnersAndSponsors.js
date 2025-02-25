import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import Partner1 from "../../images/partner1.png"
import Partner2 from "../../images/partner2.png"
import Partner3 from "../../images/partner3.png"
import styles from './PartnersAndSponsors.module.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperButtonPrev from "../../components/SwiperButtons/SwiperButtonPrev";
import {ReactComponent as Prev} from "../../images/prev.svg";
import SwiperButtonNext from "../../components/SwiperButtons/SwiperButtonNext";
import {ReactComponent as Next} from "../../images/next.svg";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";

const partners = [
    {
        img: Partner2,
        title: "Alpha Consulting",
        subtitle: "General partner",
        desc: "partners_alpha_desc"
    },
    {
        img: Partner1,
        title: "Prom Expo",
        subtitle: "General partner",
        desc: "partners_promexpo_desc"
    },
    {
        img: Partner3,
        title: "Armenia Travel",
        subtitle: "General partner",
        desc: "partners_atm_desc"
    },
]
const PartnersAndSponsors = () => {
    const {width} = useWindowResize()
    const {t} = useTranslation()

    return (
        <div className={styles.root}>

            <div className={styles.pageTitle}>{t("partners_and_sponsors")}</div>

            <Swiper
                // install Swiper modules
                // modules={[Pagination]}
                spaceBetween={width <= 1023 ? 30 : 70}
                slidesPerView={width <= 600 ? 1 : 2}
                initialSlide={0}
                pagination={{clickable: true}}
                // centeredSlides={true}
                loop={true}
            >
                <div className={styles.navigation}>
                    <div className={styles.arrow}>
                        <SwiperButtonPrev><Prev/></SwiperButtonPrev>
                    </div>
                    <SwiperButtonNext><Next/></SwiperButtonNext>
                </div>
                {partners.map((partner, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.partner}>
                                <img src={partner.img} alt={partner.title}/>
                                <p className={styles.title}>{t(partner.title)}</p>
                                <p className={styles.subtitle}>{t(partner.subtitle)}</p>
                                <p className={styles.desc}>{t(partner.desc)}</p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
};

export default PartnersAndSponsors;