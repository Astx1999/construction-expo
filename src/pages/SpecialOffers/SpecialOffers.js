import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import Offer4 from "../../images/efes.png"
import Offer1 from "../../images/ferrari.png"
import Offer2 from "../../images/Foton sale.png"
import Offer3 from "../../images/Nakoil.png"
import styles from './SpecialOffers.module.scss'

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

const offers = [
    {
        img: Offer1,
        title: "special_title1",
        desc: "special_text1"
    },
    {
        img: Offer3,
        title: "special_title3",
        desc: "special_text3"
    },
    {
        img: Offer2,
        title: "special_title2",
        desc: "special_text2"
    },
    {
        img: Offer4,
        title: "special_title4",
        desc: "special_text4"
    },
]
const SpecialOffers = () => {

    const {width} = useWindowResize()
    const {t} = useTranslation()

    return (
        <div className={styles.root}>

            <div className={styles.pageTitle}>{t("special_offers")}<span>.</span></div>

            <Swiper
                // install Swiper modules
                modules={[Pagination]}
                spaceBetween={width <= 1023 ? 30 : 70}
                slidesPerView={width <= 767 ? 1.5 : 2.5}
                // initialSlide={1}
                pagination={{clickable: true}}
                centeredSlides={true}
                loop={true}
            >
                <div className={styles.navigation}>
                    <SwiperButtonPrev><Prev/></SwiperButtonPrev>
                    <SwiperButtonNext><Next/></SwiperButtonNext>
                </div>
                {offers.map((offer, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.offer}>
                                <img src={offer.img} alt={offer.title}/>
                                <p className={styles.title}>{t(offer.title)}</p>
                                <p className={styles.desc}>{t(offer.desc)}</p>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
};

export default SpecialOffers;