import React from "react";
import classNames from "classnames";

import {ReactComponent as LocationPin} from "../../images/locationpin.svg";
import {ReactComponent as CommitteeArm} from "../../images/committeeArm.svg";
import {ReactComponent as CommitteeEng} from "../../images/committeeEng.svg";
import {ReactComponent as Federation} from "../../images/federation.svg";
import {ReactComponent as LogoGroup} from "../../images/logoGroup.svg";

import styles from "./HomeNew.module.scss";
import CtaButton from "../../components/CtaButton/CtaButton";

import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";
import RALogo from '../../images/RAlogo.png'
import HomeBG from '../../images/homeBG.png'

const HomeNew = () => {
    const {width} = useWindowResize();
    const {t, i18n} = useTranslation(); // Access translations

    const {setIsOpen} = useModal();
    const navigate = useNavigate();


    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {i18n.language === "am" ?
                    <>
                        <p className={classNames(styles.title, styles.line1)}>{t("the_world")}</p>
                        <p className={classNames(styles.title, styles.line2)}>{t("to_explore")}</p>
                        <p className={classNames(styles.title, styles.line3)}><span>{t("your")} </span>{t("opportunity")}</p>
                    </>
                    :
                    <>
                        <p className={classNames(styles.title, styles.line1)}>
                            <span>{t("your")} </span>{t("opportunity")}</p>
                        <p className={classNames(styles.title, styles.line2)}>{t("to_explore")}</p>
                        <p className={classNames(styles.title, styles.line3)}>{t("the_world")}</p>
                    </>}

                {/*<Countdown/>*/}

                <div className={classNames(styles.cta, styles.line4)}>
                    <CtaButton
                        text={t("become_an_exhibitor")}
                        onClick={() => {
                            setIsOpen("exhibitor")
                            navigate("/home/becomeanexhibitor")
                        }}
                        // mirror={!(width > 767)}
                    />
                </div>
                <div className={classNames(styles.dates, styles.line5)}>
                    {t("april")} 4 - 6, 2025
                </div>

                <div className={classNames(styles.location, styles.line5)}>
                    <LocationPin/>
                    <span
                        dangerouslySetInnerHTML={{__html: width <= 767 ? t("karen_demirchyan_mobile") : t("karen_demirchyan")}}/>
                </div>
                {width > 767 && <div className={classNames(styles.RALogo, styles.line6)}>
                    {/*<img src={RALogo} alt="RALogo"/>*/}
                    <Federation/>
                    {i18n.language === "am" ? <CommitteeArm/> : <CommitteeEng/>}
                </div>}

            </div>

            <div className={styles.animation}>
                <LogoGroup/>
            </div>
            {width <= 767 && <div className={classNames(styles.RALogo, styles.line6)}>
                {/*<img src={RALogo} alt="RALogo"/>*/}
                <Federation/>
                {i18n.language === "am" ? <CommitteeArm/> : <CommitteeEng/>}
            </div>}
        </div>
    );
};

export default HomeNew;
