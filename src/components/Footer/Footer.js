import React from 'react';
import {ReactComponent as Fb} from "../../images/fb.svg";
import {ReactComponent as Inst} from "../../images/insta.svg";
import {ReactComponent as Youtube} from "../../images/youtube.svg";
import PromExpo from '../../images/promExpo.png'
import AlphaConsulting from '../../images/alphaConsulting.png'
import {ReactComponent as Evoca} from '../../images/EvocaLogo.svg'
import ArmeniaTravel from '../../images/armeniaTravel.png'
import styles from './Footer.module.scss'
import {useTranslation} from "react-i18next";

const Footer = ({id}) => {
    const {t} = useTranslation()
    return (
        <div className={styles.root} id={id}>
            <div className={styles.title}>{t("contact_us")}<span>.</span></div>
            <div className={styles.content}>
                <div className={styles.address}>
                    <p className={styles.subTitle}>{t('address')}<span>.</span></p>
                    <p>{t('address1')}</p>
                    <p>{t('address2')}</p>
                </div>
                <div className={styles.openingHours}>
                    <p className={styles.subTitle}>{t("workingHours")}<span>.</span></p>
                    <p className={styles.openingLine}>{t("june")} 21 / 12:00-21:00</p>
                    <p className={styles.openingLine}>{t("june")} 22 / 11:00-20:00</p>
                    <p className={styles.openingLine}>{t("june")} 23 / 11:00-19:00</p>
                </div>
                <div/>
                <div className={styles.callUs}>
                    <p className={styles.subTitle}>{t("callUs")}<span>.</span></p>
                    <p><a href="tel:+37415678678">+(374) 15 678 678</a></p>
                    <p><a href="tel:+37499234889 ">+(374) 99 23 48 89</a></p>
                </div>
                <div className={styles.email}>
                    <p className={styles.subTitle}>{t("email")}<span>.</span></p>
                    <p><a href="mailto:info@armenianautoshow.com">info@armenianautoshow.com</a></p>
                </div>
                <div className={styles.followUs}>
                    <p className={styles.subTitle}>{t("followUs")}<span>.</span></p>
                    <a href="https://www.facebook.com/profile.php?id=61556471212717" target="_blank"
                       rel="noopener noreferrer"><Fb/></a>
                    <a href="https://www.instagram.com/armenianautoshow/" target="_blank"
                       rel="noopener noreferrer"><Inst/></a>
                    <a href="https://www.youtube.com/@ArmenianAutoShow" target="_blank"
                       rel="noopener noreferrer"><Youtube/></a>
                </div>
                <div className={styles.organizers}>
                    <p className={styles.subTitle}>{t("organizers")}<span>.</span></p>
                    <a className={styles.promExpo} href="https://promexpo.am/" target="_blank"><img src={PromExpo}
                                                                                                    alt="promexpo"/></a>
                    <a href="https://www.armeniatravel.am/" target="_blank"><img src={ArmeniaTravel}
                                                                                 alt="armenia travel"/></a>
                </div>
                <div className={styles.partner}>
                    <p className={styles.subTitle}>{t("partner")}<span>.</span></p>
                    <a className={styles.promExpo} href="https://www.alphaconsulting.am/" target="_blank"><img
                        src={AlphaConsulting}
                        alt="AlphaConsulting"/></a>
                </div>
                <div className={styles.sponsor}>
                    <p className={styles.subTitle}>{t("sponsor")}<span>.</span></p>
                    <a className={styles.evoca} href="https://www.evoca.am/" target="_blank"><Evoca/></a>
                </div>


            </div>
            <a href={"https://www.neen.am/"} target={"_blank"} className={styles.heart}>made with ❤️ by Neen</a>
        </div>
    );
};

export default Footer;