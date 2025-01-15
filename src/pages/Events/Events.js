import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './Events.module.scss';

const mockEvents = [
    {
        date: '4 April',
        events: [
            {
                time: '10:00 - 11:00',
                zone: 'Zone A',
                title: 'Opening Ceremony',
                description: 'Join us for the grand opening ceremony to kick off the event!'
            },
            {
                time: '11:00 - 11:00',
                zone: 'Zone B',
                title: 'Keynote Speech',
                description: 'A special address by our keynote speaker.'
            },
            {
                time: '1:00 - 3:00',
                zone: 'Zone C',
                title: 'Networking Session',
                description: 'Meet and connect with fellow participants.'
            },
            {
                time: '3:00 - 4:00',
                zone: 'Zone A',
                title: 'Workshop: Advanced React',
                description: 'Explore advanced topics in React development.'
            },
            {
                time: '5:00 - 6:00',
                zone: 'Zone D',
                title: 'Day 1 Wrap-up',
                description: 'Summary of the day’s events and closing remarks.'
            },
        ],
    },
    {
        date: '5 April',
        events: [
            {
                time: '9:00 - 11:00',
                zone: 'Zone A',
                title: 'Breakfast Meetup',
                description: 'Kickstart the day with a casual breakfast.'
            },
            {
                time: '10:30 - 11:00',
                zone: 'Zone B',
                title: 'Panel Discussion',
                description: 'Experts discuss the future of web development.'
            },
            {
                time: '12:00 - 3:00',
                zone: 'Zone A',
                title: 'Workshop: State Management',
                description: 'Learn about Redux and MobX for state management.'
            },
            {
                time: '2:00 - 3:00',
                zone: 'Zone C',
                title: 'Q&A Session',
                description: 'An open session to answer participant queries.'
            },
            {
                time: '4:00 - 6:00',
                zone: 'Zone A',
                title: 'Live Coding Session',
                description: 'Watch live coding demonstrations by industry experts.'
            },
            {
                time: '6:00 - 7:00',
                zone: 'Zone D',
                title: 'Social Hour',
                description: 'Relax and unwind with music and refreshments.'
            },
        ],
    },
    {
        date: '6 April',
        events: [
            {
                time: '10:00 - 11:00',
                zone: 'Zone B',
                title: 'Morning Yoga',
                description: 'Start the day with a refreshing yoga session.'
            },
            {
                time: '11:00 - 11:00',
                zone: 'Zone A',
                title: 'Tech Trends Presentation',
                description: 'Insights into upcoming tech trends.'
            },
            {
                time: '1:00 - 3:00',
                zone: 'Zone C',
                title: 'Workshop: TypeScript Basics',
                description: 'Learn the fundamentals of TypeScript.'
            },
            {
                time: '3:00 - 3:30',
                zone: 'Zone A',
                title: 'Closing Keynote',
                description: 'A motivational talk to conclude the event.'
            },
        ],
    },
];

const Events = () => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className={styles.root}>
            <p className={styles.pageTitle}>{t('events')}</p>
            <p className={styles.subtitle}>
                {t('To participate you need to register for the event')}
            </p>

            <div className={styles.tabs}>
                {mockEvents.map((event, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${
                            activeTab === index ? styles.activeTab : ''
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {event.date}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                {mockEvents[activeTab].events.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <div className={styles.blockOne}>
                            <p className={styles.eventDate}>{mockEvents[activeTab].date}</p>
                            <p className={styles.eventTime}> {event.time}</p>
                            <p className={styles.eventZone}> {event.zone}</p>
                        </div>
                        <div className={styles.blockTwo}>
                            <p className={styles.eventTitle}>{event.title}</p>
                            <p className={styles.eventDesc}> {event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
