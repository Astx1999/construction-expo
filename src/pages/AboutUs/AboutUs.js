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
import {ReactComponent as DownloadIcon} from "../../images/download.svg";

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
                        {width <= 767 ? (
                            <ReadMoreText htmlContent={t("about_us_text_mobile")} maxLines={9}/>
                        ) : width <= 1200 ? (
                            <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text_mobile")}}/>
                        ) : (
                            <div className={styles.text} dangerouslySetInnerHTML={{__html: t("about_us_text")}}/>
                        )}
                    </div>

                    <div className={styles.button}>
                        <CtaButton onClick={() => {
                            setIsOpen("exhibitor")
                            navigate("/about-us/becomeanexhibitor")
                        }} text={t("become_an_exhibitor")}/>

                        <CtaButton className={styles.downloadBtn} variant={'secondary'} onClick={() => {
                        }} text={t("download_event_presentation")} IconLeft={DownloadIcon}/>
                    </div>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imagePath}>
                        <img className={styles.image} src={AboutUsImg} alt="about us image"/>
                        <div className={styles.outline}>
                            <AboutUsOutline/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
