import React from "react";
import {ReactComponent as Rect} from "../../images/rect.svg";
import styles from "./AboutUs.module.scss";
import Advert from "../../images/advert.mp4";

import CtaButton from "../../components/CtaButton/CtaButton";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import useWindowResize from "../../hook/useWindowResize";
import ReadMoreText from "../../components/ReadMoreText/ReadMoreText";
import {useNavigate} from "react-router-dom";

const AboutUs = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setIsOpen} = useModal();
    const {width} = useWindowResize()
    return (
        <div className={styles.root}>
            <div className={styles.title}>
                {t("about_us")}
                <span>.</span>
            </div>

            <div className={styles.content}>
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
                    <div className={styles.redLine}>
                        <div/>
                        <div/>
                        <div>
                            <div/>
                        </div>
                    </div>
                </div>

                <div className={styles.textButton}>
                    <div className={styles.textWrapper}>
                        <div className={styles.textTitle}>
                            <div className={styles.logo}>
                                <Rect/>
                            </div>
                            <p> {t("for_visitors")} </p>
                            <div className={styles.line}>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                        {width <= 767 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={4}/>
                        ) : width <= 1200 ? (
                            <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text_mobile")}}/>
                        ) : (
                            <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text")}}/>
                        )}
                    </div>

                    <div className={styles.button}>
                        <CtaButton onClick={() => {
                            setIsOpen("visitor")
                            navigate("/about-us/becomeavisitor")
                        }} text={t("become_a_visitor")}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
