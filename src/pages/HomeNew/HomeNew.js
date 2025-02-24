import React from "react";
import classNames from "classnames";

import {ReactComponent as LocationPin} from "../../images/locationpin.svg";

import styles from "./HomeNew.module.scss";
import CtaButton from "../../components/CtaButton/CtaButton";

import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";
import RALogo from '../../images/RAlogo.png'

const HomeNew = () => {
    const {width} = useWindowResize();
    const {t} = useTranslation(); // Access translations

    const {setIsOpen} = useModal();
    const navigate = useNavigate();


    return (
        <div className={styles.root}>
            {width <= 767 && <div className={styles.RALogo}>
                <img src={RALogo} alt="RALogo"/>
            </div>}
            <div className={styles.animation}>
                <svg viewBox="150 50 585 1118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M467.252 914.616L544.091 839.123L398.595 691.032C380.433 672.547 363.219 652.807 350.334 631.583C335.543 607.224 328.792 587.621 329.218 561.047C329.821 523.645 350.8 487.911 382.142 457.252L416.159 423.977L555.665 286.916L480.995 210.914L306.195 383.013C265.33 419.914 238.118 464.485 228.102 515.608C224.804 532.441 224.36 543.763 224.119 560.149C222.933 640.609 251.38 694.879 297.593 741.92L379.931 825.738L467.253 914.617L467.252 914.616Z"
                          fill="#FE5840" fillOpacity="0.65"/>
                    <path
                        d="M487.271 912.495L401.001 824.687L318.663 740.869C272.69 694.071 244.44 640.174 245.619 560.171C245.86 543.817 246.302 532.599 249.574 515.897L248.102 515.608L249.574 515.897C259.519 465.135 286.541 420.841 327.2 384.127L327.224 384.105L327.247 384.082L500.977 213.036L573.544 286.897L435.11 422.905L435.108 422.907L401.093 456.18C369.606 486.981 348.33 523.068 347.718 561.023L349.218 561.047L347.718 561.023C347.287 587.948 354.154 607.827 369.052 632.361C382.023 653.729 399.329 673.564 417.525 692.084L561.97 839.104L487.271 912.495Z"
                        stroke="white" strokeWidth="3"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M422.833 510.611L422.249 613.628L703.415 612.781L702.127 512.373L422.833 510.611Z"
                          fill="#FE5840" fillOpacity="0.65"/>
                    <path d="M721.895 611.286L443.758 612.123L444.325 512.121L720.646 513.864L721.895 611.286Z"
                          stroke="white" strokeWidth="3" className={styles.animatedStroke}/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M142.199 784.469L138.373 1065.02L242.548 1065.14L243.962 786.181L142.199 784.469Z"
                          fill="#FE5840" fillOpacity="0.65"/>
                    <path d="M261.055 1063.64L159.894 1063.52L163.679 785.994L262.455 787.655L261.055 1063.64Z"
                          stroke="white" strokeWidth="3" className={styles.animatedStroke}/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M147.976 50.8815L146.724 321.099L247.52 321.265L250.749 52.642L147.976 50.8815Z"
                          fill="#FE5840" fillOpacity="0.65"/>
                    <path d="M266.038 319.763L168.231 319.601L169.469 52.4073L269.231 54.1163L266.038 319.763Z"
                          stroke="white" strokeWidth="3" className={styles.animatedStroke}/>
                </svg>
            </div>
            <div className={styles.content}>
                <p className={classNames(styles.title, styles.line1)}>{t("your_opportunity")}</p>
                <p className={classNames(styles.title, styles.line2)}>{t("to_explore")}</p>
                <p className={classNames(styles.title, styles.line3)}>{t("the_world")}</p>
                {/*<Countdown/>*/}

                <div className={styles.cta}>
                    <CtaButton
                        text={t("become_an_exhibitor")}
                        onClick={() => {
                            setIsOpen("exhibitor")
                            navigate("/home/becomeanexhibitor")
                        }}
                        // mirror={!(width > 767)}
                    />
                </div>
                <div className={classNames(styles.dates)}>
                    {t("april")} 4 / 5 / 6, 2025
                </div>

                <div className={classNames(styles.location)}>
                    <LocationPin/>
                    <span
                        dangerouslySetInnerHTML={{__html: width <= 767 ? t("karen_demirchyan_mobile") : t("karen_demirchyan")}}/>
                </div>
                {width > 767 && <div className={styles.RALogo}>
                    <img src={RALogo} alt="RALogo"/>
                </div>}

            </div>

        </div>
    );
};

export default HomeNew;
