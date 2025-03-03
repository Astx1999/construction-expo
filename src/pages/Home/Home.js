import {useCountdown} from "../../hook/useCountdown";
import {ReactComponent as Logo} from "../../images/logo.svg";
import {ReactComponent as Fb} from "../../images/fb.svg";
import {ReactComponent as Inst} from "../../images/inst.svg";
import {ReactComponent as Detail} from "../../images/detail.svg";
import {ReactComponent as LocationPin} from "../../images/locationpin.svg";
import styles from './Home.module.scss'
import classNames from "classnames";
import React from "react";
import {useTranslation} from "react-i18next";


const Home = () => {
    const targetDate = new Date('2025-04-04T12:00:00');
    const {days, hours, minutes, seconds} = useCountdown(targetDate);
    const {t} = useTranslation();
    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.comingsoonBlock}>
                <p className={classNames(styles.title, styles.line1)}>COMING SOON</p>
                {/*<Countdown/>*/}
                <div className={classNames(styles.dates, styles.line2)}>
                    {" "}
                    April 4 - 6, 2025
                </div>
                <p className={classNames(styles.place, styles.line3)}>
                    <LocationPin/>
                    <span>{t('karen_demirchyan')}</span>
                </p>
                <div className={styles.countdown}>
                    <div className={styles.block}>
                        <span className={styles.number}>{formatTime(days)}</span> <span
                        className={styles.unit}>{days === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className={styles.block}>
                        <span className={styles.number}>{formatTime(hours)}</span> <span
                        className={styles.unit}>{hours === 1 ? 'hr' : 'hrs'}</span>
                    </div>
                    <div className={styles.block}>
                        <span
                            className={styles.number}>{formatTime(minutes)}</span> <span
                        className={styles.unit}>{minutes === 1 ? 'min' : 'min'}</span>
                    </div>
                    <div className={styles.block}>
                        <span
                            className={styles.number}>{formatTime(seconds)}</span> <span
                        className={styles.unit}>{seconds === 1 ? 'sec' : 'sec'}</span>
                    </div>
                </div>
                <div className={styles.socials}>
                    <p className={styles.getSocial}>GET SOCIAL</p>
                    <a href="https://www.facebook.com/share/19dYGXsSYx/?mibextid=LQQJ4d" target="_blank"
                       rel="noopener noreferrer"><Fb/></a>
                    <a href="https://www.instagram.com/i.t.f.armenia/" target="_blank"
                       rel="noopener noreferrer"><Inst/></a>
                </div>

            </div>
            <div className={styles.detail}><Detail/></div>
        </div>
    );
};

export default Home;