import React from "react";
import styles from "./AboutUs.module.scss";
import CtaButton from "../../components/CtaButton/CtaButton";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import useWindowResize from "../../hook/useWindowResize";
import ReadMoreText from "../../components/ReadMoreText/ReadMoreText";
import {useNavigate} from "react-router-dom";
import AboutUsImg from '../../images/aboutUsIMG.png';
import {ReactComponent as AboutUsOutline} from "../../images/aboutUsOutline.svg";


import Advert from "../../images/aboutUs.mp4";

const AboutUs = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setIsOpen} = useModal();
    const {width} = useWindowResize()
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.textButton}>
                    <div className={styles.textWrapper}>
                        <div className={styles.textTitle}>
                            {t("about_the_exhibition")}
                        </div>
                        <p className={styles.subtitle}>{t('for_visitors')}</p>
                        {width <= 767 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={9}/>
                        ) : width <= 1200 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={13}/>
                            // <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text_mobile")}}/>
                        ) : (
                            <ReadMoreText htmlContent={t("about_us_text")} maxLines={13}/>
                            // <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text")}}/>
                        )}
                    </div>

                    <div className={styles.button}>
                        <CtaButton onClick={() => {
                            setIsOpen("visitor")
                            navigate("/about-us/becomeavisitor")
                        }} text={t("become_a_visitor")}/>
                    </div>
                </div>
                <div className={styles.imageBlock}>
                    {/*  <div className={styles.imagePath}>
                        <img className={styles.image} src={AboutUsImg} alt="about us image"/>
                        <div className={styles.outline}>
                            <AboutUsOutline/>
                        </div>
                    </div>*/}

                    <div className={styles.videoContainer}>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className={styles.video}
                        >
                            <source src={Advert} type="video/mp4"/>
                        </video>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;
