import React from 'react';
import {useCountdown} from "../../hook/useCountdown";

import styles from "./Countdown.module.scss";

const Countdown = () => {
    const targetDate = new Date('2024-06-21T12:00:00');
    const {days, hours, minutes, seconds} = useCountdown(targetDate);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };
    return (
        <div className={styles.root}>
            <div className={styles.block}>
                <span className={styles.number}>
                    {formatTime(days)}
                </span>
                {days === 1 ? 'day' : 'days'}
            </div>
            <span className={styles.accent}>:</span>
            <div className={styles.block}>
                <span className={styles.number}>
                    {formatTime(hours)}
                </span>
                {hours === 1 ? 'hour' : 'hours'}
            </div>
            <span className={styles.accent}>:</span>
            <div className={styles.block}>
                <span
                    className={styles.number}>
                    {formatTime(minutes)}
                </span>
                {minutes === 1 ? 'minute' : 'minutes'}
            </div>
            <span className={styles.accent}>:</span>
            <div className={styles.block}>
                <span
                    className={styles.number}>
                    {formatTime(seconds)}
                </span>
                {seconds === 1 ? 'second' : 'seconds'}
            </div>
        </div>
    );
};

export default Countdown;