import {Pagination} from "swiper/modules";

import {ReactComponent as ZoneA} from "../../images/ZoneA.svg";
import {ReactComponent as ZoneB} from "../../images/ZoneB.svg";
import {ReactComponent as ZoneC} from "../../images/ZoneC.svg";
import {ReactComponent as ZoneDE} from "../../images/ZoneD-E.svg";
import {ReactComponent as ZoneD} from "../../images/ZoneD.svg";

import {ReactComponent as Filter} from "../../images/filter.svg";
import {ReactComponent as Next} from "../../images/next.svg";
import {ReactComponent as Prev} from "../../images/prev.svg";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./Zones.module.scss";
import React from "react";
import SwiperButtonPrev from "../../components/SwiperButtons/SwiperButtonPrev";
import SwiperButtonNext from "../../components/SwiperButtons/SwiperButtonNext";
import CtaButton from "../../components/CtaButton/CtaButton";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";

const zones = [
    {
        name: "A",
        image: <ZoneA/>,
        companies: [
            "1. Armenia Travel",
            "2. Booking",
            "3. Wizz Air",
            "4. Qatar Airways",
            "5. Airbnb",
            "6. GreenWay Travel",
            "7. Blackstone Travel",
            "8. Armenia Travel",
            "9. Lufthansa",
            "10. Tripadvisor",
        ],
    },
    {
        name: "B",
        image: <ZoneB/>,
        companies: [
            "2. Booking",
            "3. Wizz Air",
            "4. Qatar Airways",
            "5. Airbnb",
            "6. GreenWay Travel",
            "7. Blackstone Travel",
            "8. Armenia Travel",
            "9. Lufthansa",
            "10. Tripadvisor",
        ],
    },
    {
        name: "C",
        image: <ZoneC/>,
        companies: [
            "2. Booking",
            "3. Wizz Air",
            "4. Qatar Airways",
            "5. Airbnb",
            "6. GreenWay Travel",
            "7. Blackstone Travel",
            "8. Armenia Travel",
            "9. Lufthansa",
            "10. Tripadvisor",
        ],
    },
    {
        name: "D",
        image: <ZoneD/>,
        companies: [
            "2. Booking",
            "3. Wizz Air",
            "4. Qatar Airways",
            "5. Airbnb",
            "6. GreenWay Travel",
            "7. Blackstone Travel",
            "8. Armenia Travel",
            "9. Lufthansa",
            "10. Tripadvisor",
        ],
    }
];

export const Zones = () => {
    const {width} = useWindowResize();

    const navigate = useNavigate();
    const {t} = useTranslation();

    const isPrevButtonVisible = (index) => {
        return index !== 0;
    };

    const isNextButtonVisible = (index, zones) => {
        return index + 1 !== zones.length;
    };

    const {setIsOpen} = useModal();
    return (
        <div className={styles.root}>
            <Swiper
                // install Swiper modules
                // modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                // pagination={false}
            >
                {zones.map((zone, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.zone}>
                                {width <= 1023 && (
                                    <div className={styles.navigation}>
                                        <SwiperButtonPrev isVisible={isPrevButtonVisible(index)}>
                                            <Prev/>
                                        </SwiperButtonPrev>
                                        <div className={styles.name}>
                                            {t("zone")} <span>{zone.name}</span>
                                        </div>
                                        <SwiperButtonNext
                                            isVisible={isNextButtonVisible(index, zones)}
                                        >
                                            <Next/>
                                        </SwiperButtonNext>
                                    </div>
                                )}
                                <div className={styles.image}>{zone.image}</div>
                                <div className={styles.info}>
                                    {width > 1023 && (
                                        <div className={styles.navigation}>
                                            <div className={styles.name}>
                                                {t("zone")} <span>{zone.name}</span>
                                            </div>
                                            <div className={styles.arrows}>
                                                <span className={styles.pageCount}>{index + 1} <span
                                                    className={styles.left}>/{zones.length}</span></span>
                                                <SwiperButtonPrev isVisible={isPrevButtonVisible(index)}>
                                                    <Prev/>
                                                </SwiperButtonPrev>
                                                <SwiperButtonNext
                                                    isVisible={isNextButtonVisible(index, zones)}
                                                >
                                                    <Next/>
                                                </SwiperButtonNext>
                                            </div>

                                        </div>
                                    )}

                                    <div className={styles.titleLine}>
                                        <div className={styles.title}>
                                            {t("exhibitors")}
                                        </div>
                                        {/* <Filter /> */}
                                    </div>

                                    <div className={styles.companies}>
                                        {zone.companies.map((company, index) => {
                                            return (
                                                <p key={index}>
                                                    {company}
                                                </p>
                                            );
                                        })}
                                    </div>

                                    <div className={styles.button}>
                                        <CtaButton
                                            onClick={() => {
                                                setIsOpen("exhibitor")
                                                navigate("/zones/becomeanexhibitor")
                                            }}
                                            text={t("become_an_exhibitor")}/>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
export default Zones;
