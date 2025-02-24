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
import React, {cloneElement, useEffect, useState} from "react";
import SwiperButtonPrev from "../../components/SwiperButtons/SwiperButtonPrev";
import SwiperButtonNext from "../../components/SwiperButtons/SwiperButtonNext";
import CtaButton from "../../components/CtaButton/CtaButton";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {useModal} from "../../components/ModalContext/ModalContext";
import {useNavigate} from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ZONE_ITEMS, GET_ZONES, UPDATE_ZONE_ITEM_STATUS, UPDATE_ZONE_ITEMS} from "../../graphql/queries";
import {authClient} from "../../apolloClient";
import InfoIconWithTooltip from "../../components/InfoIconWithTooltip/InfoIconWithTooltip";

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
        members: "members_A",
        infoText: 'info_text_A'
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
        members: "members_B",
        infoText: 'info_text_B'
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
        members: "members_C",
        infoText: 'info_text_C'
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
        members: "members_D",
        infoText: 'info_text_D'
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


    const [zoneItemsData, setZoneItemsData] = useState([]);


    const {data, refetch} = useQuery(GET_ZONE_ITEMS);
    const {data: zonesData} = useQuery(GET_ZONES);

    const [updateZoneItems] = useMutation(UPDATE_ZONE_ITEMS, {
        client: authClient,
        onCompleted: () => {
            refetch(); // Force refetch after mutation
        },
    });

    useEffect(() => {
        if (data) {
            setZoneItemsData(data);
        }
    }, [data]);


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
            const zoneIds = selectedZoneItems.map((item) => item.zoneId); // Collect all zone IDs

            await updateZoneItems({
                variables: {
                    where: {id: {_in: zoneIds}},
                    _set: {status: "REQUESTED"}
                }
            });
            setSelectedZoneItems([]);
            console.log("All zones updated to REQUESTED");
        } catch (error) {
            console.error("Error updating zone status:", error);
        }
    };

    const handleSelect = (className) => {
        const zoneItemObj = zoneItemsData.zoneItems.find((item) => item.classname === className);
        if (!zoneItemObj) return;

        const {id: zoneStandId} = zoneItemObj;
        const newZoneId = zoneItemObj.zoneId;
        const zoneName = zonesData.zones.find((zone) => zone.id === newZoneId)?.name;
        const match = className.match(/Item(\d+)$/);
        const zoneItem = match ? match[1] : null;

        setSelectedZoneItems((prev) => {
            const existingZone = prev.find((item) => item.zoneId === newZoneId);

            if (existingZone) {
                const isSelected = prev.some((item) => item.className === className);
                if (isSelected) {
                    return prev.filter((item) => item.className !== className);
                } else {
                    return [...prev, {zoneStandId, zoneId: newZoneId, zoneName, zoneItem, className}];
                }
            } else {
                return [{zoneStandId, zoneId: newZoneId, zoneName, zoneItem, className}];
            }
        });
    };

    return (
        <div className={styles.root} id="zones">
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
                                        zoneItemsData,
                                        handleSelect
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
                                        <InfoIconWithTooltip text={t(zone.infoText)}/>
                                    </div>

                                    <div className={styles.companies}
                                         dangerouslySetInnerHTML={{__html: t(zone.members)}}/>
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
