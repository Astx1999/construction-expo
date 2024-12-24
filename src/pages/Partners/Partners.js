import React from 'react';
import styles from './Partners.module.scss'
import VerticalCarousel from "../../components/VerticalCarousel/VerticalCarousel";
import {useTranslation} from "react-i18next";
import useWindowResize from "../../hook/useWindowResize";


const data = {
    slides: [
        {
            introline: "partners_avangard_motors_title",
            image: "/uploads/partner_logos/mercedes.svg",
            about: "partners_avangard_motors",
            photo: "uploads/partner_image/Merc.jpg",
            website: "http://www.mercedes-benz.am"
        },

        // {
        //     introline: "partners_auto_group_title",
        //     image: "/uploads/partner_logos/landRover.svg",
        //     about: "partners_auto_group",
        //     photo: "uploads/partner_image/RR.jpg",
        //     website: "https://www.autogroup.am/"
        // },
        {
            introline: "partners_volvo_title",
            image: "/uploads/partner_logos/volvo.svg",
            about: "partners_volvo",
            photo: "uploads/partner_image/Volvo.jpg",
            website: "https://www.volvocars.com/hy-am/"
        },
        {
            introline: "partners_auto_group_title",
            image: "/uploads/partner_logos/zeekr.svg",
            about: "partners_auto_group",
            photo: "uploads/partner_image/zeekr.jpg",
            website: "https://zeekr.am/"
        },
        {
            introline: "partners_auto_group_title",
            image: "/uploads/partner_logos/geely.svg",
            about: "partners_auto_group",
            photo: "uploads/partner_image/Geely.jpg",
            website: "https://geely.am/"
        },
        {
            introline: "partners_fine_cars_title",
            image: "/uploads/partner_logos/jeep.svg",
            about: "partners_fine_cars",
            photo: "uploads/partner_image/Jeep.jpg",
            website: "https://finecars.am/"
        },
        {
            introline: "partners_fine_cars_title",
            image: "/uploads/partner_logos/alfa romeo.svg",
            about: "partners_fine_cars",
            photo: "uploads/partner_image/Alfa.jpg",
            website: "https://finecars.am/"
        },
        {
            introline: "partners_fine_cars_title",
            image: "/uploads/partner_logos/fiat.svg",
            about: "partners_fine_cars",
            photo: "uploads/partner_image/Fiat.jpg",
            website: "https://finecars.am/"
        },
        {
            introline: "partners_kia_title",
            image: "/uploads/partner_logos/kia.svg",
            about: "partners_kia",
            photo: "uploads/partner_image/Kia.jpg",
            website: "https://www.kia.am/"
        },
        {
            introline: "partners_arcfox_title",
            image: "/uploads/partner_logos/ARCFOX.svg",
            about: "partners_arcfox",
            photo: "uploads/partner_image/arcfox.jpeg",
            website: ""
        },
        {
            introline: "partners_audi_title",
            image: "/uploads/partner_logos/audi.svg",
            about: "partners_audi",
            photo: "uploads/partner_image/audi.JPG",
            website: "https://www.audi.am/ "
        },
        {
            introline: "partners_porsche_title",
            image: "/uploads/partner_logos/porsche.svg",
            about: "partners_porsche",
            photo: "uploads/partner_image/porsche.JPG",
            website: "https://dealer.porsche.com/am/yerevan/hy-AM "
        },
    ],
};


const Partners = () => {

    const {t} = useTranslation()

    return (
        <div className={styles.root}>
            <div className={styles.title}>{t("partners")}<span>.</span></div>
            <VerticalCarousel
                data={data.slides}
                leadingText={data.leadingText}
            />

        </div>
    );
};

export default Partners;