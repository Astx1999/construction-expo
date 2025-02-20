import {Pagination} from "swiper/modules";

import {ReactComponent as Info} from "../../images/info.svg";
import {ReactComponent as Next} from "../../images/next.svg";
import {ReactComponent as Prev} from "../../images/prev.svg";
import {Swiper, SwiperSlide} from "swiper/react";

import ZoneA from "./ZoneA";
import ZoneB from "./ZoneB";
import ZoneC from "./ZoneC";
import ZoneD from "./ZoneD";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./Zones.module.scss";
import React, {cloneElement, useMemo, useState} from "react";
import SwiperButtonPrev from "../../components/SwiperButtons/SwiperButtonPrev";
import SwiperButtonNext from "../../components/SwiperButtons/SwiperButtonNext";
import CtaButton from "../../components/CtaButton/CtaButton";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import {useMutation} from "@apollo/client";
import {UPDATE_ZONE_ITEM_STATUS} from "../../graphql/queries";
import {authClient} from "../../apolloClient";

const zones = [
    {
        name: "A",
        image: <ZoneA/>,
        companies: [
            "Transportation companies",
            "Aerial excursion services",
            "Adventure tourism services",
            "Restaurants, catering, and gastronomic services",
        ],
    },
    {
        name: "B",
        image: <ZoneB/>,
        companies: [
            "Transportation companies",
            "Aerial excursion services",
            "Adventure tourism services",
            "Restaurants, catering, and gastronomic services",
        ],
    },
    {
        name: "C",
        image: <ZoneC/>,
        companies: [
            "Transportation companies",
            "Aerial excursion services",
            "Adventure tourism services",
            "Restaurants, catering, and gastronomic services",
        ],
    },
    {
        name: "D",
        image: <ZoneD/>,
        companies: [
            "Transportation companies",
            "Aerial excursion services",
            "Adventure tourism services",
            "Restaurants, catering, and gastronomic services",
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

    const [updateZoneItemStatus] = useMutation(UPDATE_ZONE_ITEM_STATUS, {client: authClient});

    const [selectedZoneItems, setSelectedZoneItems] = useState([]);

    const grouped = selectedZoneItems.reduce((acc, {zoneName, zoneItem}) => {
        if (!acc[zoneName]) {
            acc[zoneName] = [];
        }
        acc[zoneName].push(zoneItem);
        return acc;
    }, {});

    const formattedString = Object.entries(grouped)
        .map(([zone, items]) => `Zone ${zone} [${items.join(",")}]`)
        .join(", ");


    const handleBook = async () => {
        try {
            await Promise.all(
                selectedZoneItems.map((item) =>
                    updateZoneItemStatus({
                        variables: {
                            id: item.zoneId,  // Ensure this is the correct ID for `zone_item_status`
                            _set: {status: "REQUESTED"}
                        }
                    })
                )
            );
            setSelectedZoneItems([]);
            console.log("All zones updated to REQUESTED");
        } catch (error) {
            console.error("Error updating zone status:", error);
        }
    };

    return (
        <div className={styles.root}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
            >
                {zones.map((zone, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.zone}>
                                {width <= 1023 && (
                                    <div className={styles.navigation}>
                                        <div style={{marginRight: '10px'}}>
                                            <SwiperButtonPrev isVisible={isPrevButtonVisible(index)}>
                                                <Prev/>
                                            </SwiperButtonPrev>
                                        </div>

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
                                <div className={styles.image}>
                                    {cloneElement(zone.image, {
                                        selectedZoneItems,
                                        setSelectedZoneItems,
                                    })}
                                </div>

                                <div className={styles.info}>
                                    {width > 1023 && (
                                        <div className={styles.navigation}>
                                            <div className={styles.name}>
                                                {t("zone")} <span>{zone.name}</span>
                                            </div>
                                            <div className={styles.arrows}>
                                                <span className={styles.pageCount}>{index + 1} <span
                                                    className={styles.left}>/{zones.length}</span></span>
                                                <div style={{marginRight: '10px'}}>
                                                    <SwiperButtonPrev isVisible={isPrevButtonVisible(index)}>
                                                        <Prev/>
                                                    </SwiperButtonPrev>
                                                </div>
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
                                        <Info/>
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
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className={styles.bookingInfo}>
                <div className={styles.statuses}>
                    <div className={styles.available}>Available</div>
                    <div className={styles.selected}>Selected</div>
                    <div className={styles.unavailable}>Unavailable</div>
                </div>
                <div className={styles.input}>
                    <CustomInput disabled placeholder={'Select Zone Items'}
                                 value={formattedString}/>
                    <div className={styles.button}>
                        <CtaButton
                            onClick={() => {
                                // setIsOpen("exhibitor")
                                // navigate("/zones/becomeanexhibitor")
                                handleBook();
                            }}
                            text={t("Book")}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Zones;
