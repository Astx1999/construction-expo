import React, { useState } from "react";
import styles from "./AboutUs.module.scss";
import CtaButton from "../../components/CtaButton/CtaButton";
import { useTranslation } from "react-i18next";
import { useModal } from "../../components/ModalContext/ModalContext";
import useWindowResize from "../../hook/useWindowResize";
import ReadMoreText from "../../components/ReadMoreText/ReadMoreText";
import { useNavigate } from "react-router-dom";
import Advert from "../../images/aboutUs.mp4";
import VisibilitySensor from 'react-visibility-sensor';

const AboutUs = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setIsOpen } = useModal();
    const { width } = useWindowResize();

    const [isVisible, setIsVisible] = useState(false);

    const handleVisibilityChange = (isVisible) => {
        setIsVisible(isVisible);
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.textButton}>
                    <div className={styles.textWrapper}>
                        <div className={styles.textTitle}>
                            {t("about_the_exhibition")}
                        </div>
                        {width <= 767 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={9} />
                        ) : width <= 1200 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={13} />
                        ) : (
                            <ReadMoreText htmlContent={t("about_us_text")} maxLines={13} />
                        )}
                    </div>

                    <VisibilitySensor
                        onChange={handleVisibilityChange}
                        partialVisibility
                        offset={{ bottom: 100 }}
                    >
                        <div
                            className={`${styles.button} ${isVisible ? styles.fadeIn : ""}`}
                        >
                            <CtaButton
                                onClick={() => {
                                    setIsOpen("visitor");
                                    navigate("/about-us/becomeavisitor");
                                }}
                                text={t("become_a_visitor")}
                            />
                        </div>
                    </VisibilitySensor>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.videoContainer}>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className={styles.video}
                        >
                            <source src={Advert} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
