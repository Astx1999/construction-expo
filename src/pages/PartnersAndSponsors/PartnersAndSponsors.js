import React, {cloneElement} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import {ReactComponent as ATMLong} from "../../images/atmLongGrey.svg";
import {ReactComponent as ALPHALong} from "../../images/alphaLongGrey.svg";
import {ReactComponent as CommitteeArm} from "../../images/committeeARMGrey.svg";
import {ReactComponent as CommitteeEng} from "../../images/committeeENGGrey.svg";
import {ReactComponent as Federation} from "../../images/federationGrey.svg";
import {ReactComponent as PromExpo} from "../../images/promExpoGrey.svg";
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

const PartnersAndSponsors = () => {
    const {width} = useWindowResize()
    const {t, i18n} = useTranslation()

    const partners = [
        {
            img: <Federation/>,
            // title: "federation_title",
            subtitle: "organizer",
            desc: "partners_federation_desc"
        },
        {
            img: i18n.language === "am" ? <CommitteeArm/> : <CommitteeEng/>,
            // title: "committee_title",
            subtitle: "general_information_partner",
            desc: "partners_committee_desc"
        },
        {
            img: <ATMLong/>,
            // title: "Armenia Travel",
            subtitle: "co_organizer",
            desc: "partners_atm_desc"
        },
        {
            img: <PromExpo/>,
            // title: "Prom Expo",
            subtitle: "co_organizer",
            desc: "partners_promexpo_desc"
        },
        // {
        //     img: <ALPHALong/>,
        //     // title: "Alpha Consulting",
        //     subtitle: "marketing_partner",
        //     desc: "partners_alpha_desc"
        // },
    ]

    return (
        <div className={styles.root}>

            <div className={styles.pageTitle}>{t("partners")}</div>

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
                                {cloneElement(partner.img)}
                                {partner.title && <p className={styles.title}>{t(partner.title)}</p>}
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