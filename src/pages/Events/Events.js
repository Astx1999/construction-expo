import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './Events.module.scss';
import {useQuery} from "@apollo/client";
import {GET_AGENDA_LOCALiZATIONS, GET_AVAILABLE_ZONE_ITEMS} from "../../graphql/queries";

const Events = () => {
    const {t, i18n} = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const {data: agenda} = useQuery(GET_AGENDA_LOCALiZATIONS);

    console.log(agenda?.localizations?.find((a) => a.language === i18n.language), 123);

    const data = agenda?.localizations?.find((a) => a.language === i18n.language)

    return (
        <div className={styles.root}>
            <p className={styles.pageTitle}>{t('events')}</p>
            <p className={styles.subtitle}>
                {t('To participate you need to register for the event')}
            </p>

            <div className={styles.tabs}>
                {data?.source.map((event, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${
                            activeTab === index ? styles.activeTab : ''
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {event.dateText}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                {data?.source[activeTab].events.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <div className={styles.blockOne}>
                            <p className={styles.eventTime}>{event.time}</p>
                            {event.place && <p className={styles.eventZone}> {event.place}</p>}
                        </div>
                        <div className={styles.blockTwo}>
                            <p className={styles.eventTitle}>{event.action}</p>
                            <p className={styles.eventDesc}> {event.topic}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
