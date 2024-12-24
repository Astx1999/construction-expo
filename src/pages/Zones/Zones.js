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
            "1. Foton",
            "2. Mercedes",
            "3. Volvo",
            "4. Gazel",
            // "5. Bobcat",
            "6. Renault Trucks",
            "7. Hino",
            "Artsakhi Ham",
            "Lamborgini",
            "Atenk",
            "Bus Voyage",
            "AvtoKar",
            "Mammut World",
            "IVECO Service Armenia",
        ],
    },
    {
        name: "B",
        image: <ZoneB/>,
        companies: [
            "1. Nakoil",
            "2. Total",
            "3. Shell",
            "4. Fine Oil",
            "5. Ameriabank",
            "6. Team Energy",
            "7. Turbo Line",
            "8. Dash",
            "9. Flash",
            "10. Max Oil",
            "11 AmioBank",
            "12 InecoBank",
            "13 Auto Group",
            "14. Xpel",
            "15. Restor FX",
        ],
    },
    {
        name: "C",
        image: <ZoneC/>,
        companies: [
            "1  Rehabilitation City Of Heroes",
            "2. Rego",
            "3. Armenia Travel",
            "4,5. My Cargo",
            "6. EFES Insurance",
            // "7. Nairi Insurance",
            "8.Karcher",
            "9.Getto Logistic",
            "10. Logistic Partner Group",
            "11. Hertz",
            "12. V8 Shipping Georgia",
            "13 Info Market",
            "14 ImTun",
            "15. 3D",
            "16. Car Colors",
            "17. Wurth",
            "18 LeTech",
            "19 Yell.am",
            "20 Import Master",
            "21. Satellite",
            "22. Pit Stop",
            "23. Sindika Oil",
            "24. Arag Araqum",
            "26. Emex",
            "27. Prestige Motors",
            "28. Garaj.am",
            "29. Swees",
            "30, 31. AutoSan",
            "32. Garage Master Mall",
        ],
    },
    {
        name: "D",
        image: <ZoneD/>,
        companies: [
            "1. Alfa Romeo",
            "2. Jeep",
            "3. Dodge",
            "4. Fiat",
            "6. Kia",
            "7.Mercedes-Benz",
            "7. Volvo",
            "9. Arcfox",
            // "10. Land Rover",
            "11. Geely",
            "11. Zeekr",
            "12. Energy car",
            "13. E-Auto",
            "15. Xpeng",
            "16. IM Motors",
            "17. Neta",
            "18. ABC Motors",
            "20. Audi",
            "20. Porsche",
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
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{clickable: true}}
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

                                    <div className={styles.titleLine}>
                                        <div className={styles.title}>
                                            {t("exhibitors")} <span>.</span>
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
