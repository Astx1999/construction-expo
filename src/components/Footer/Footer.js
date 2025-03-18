import React from 'react';
import {ReactComponent as Fb} from "../../images/fb.svg";
import {ReactComponent as Inst} from "../../images/insta.svg";
import {ReactComponent as Youtube} from "../../images/youtube.svg";
import PromExpo from '../../images/promExpo.png'
import AlphaConsulting from '../../images/alphaConsulting.png'
import {ReactComponent as Evoca} from '../../images/EvocaLogo.svg'
import ArmeniaTravel from '../../images/armeniaTravel.png'
import {ReactComponent as Federation} from '../../images/federation.svg'
import {ReactComponent as CommitteeArm} from '../../images/committeeArm.svg'
import {ReactComponent as CommitteeEng} from '../../images/committeeEng.svg'
import styles from './Footer.module.scss'
import {useTranslation} from "react-i18next";
import {ReactComponent as Logo} from '../../images/logo.svg'

const Footer = ({id}) => {
    const {t, i18n} = useTranslation()
    return (
        <div className={styles.root} id={id}>
            <div className={styles.title}>{t("contact_us")}</div>
            <div className={styles.content}>
                <div className={styles.openingHours}>
                    <p className={styles.subTitle}>{t("workingHours")}</p>
                    <p className={styles.openingLine}>{t("april")} 4 / 12:00 - 20:00</p>
                    <p className={styles.openingLine}>{t("april")} 5 / 11:00 - 20:00</p>
                    <p className={styles.openingLine}>{t("april")} 6 / 11:00 - 19:00</p>
                </div>
                <div className={styles.address}>
                    <p className={styles.subTitle}>{t('address')}</p>
                    <p>{t('address1')}</p>
                    <p>{t('address2')}</p>
                </div>
                <div/>
                <div className={styles.callUs}>
                    <p className={styles.subTitle}>{t("callUs")}</p>
                    <p><a href="tel:+37415456456">+(374) 15 456 456</a></p>
                    <p><a href="tel:+37499234889">+(374) 99 23 48 89</a></p>
                </div>
                <div className={styles.email}>
                    <p className={styles.subTitle}>{t("email")}</p>
                    <p><a href="mailto:info@itfArmenia.com">info@itfArmenia.com</a></p>
                </div>
                <div/>
                {/*     <div className={styles.followUs}>
                    <p className={styles.subTitle}>{t("followUs")}</p>
                    <a href="https://www.facebook.com/profile.php?id=61556471212717" target="_blank"
                       rel="noopener noreferrer"><Fb/></a>
                    <a href="https://www.instagram.com/armenianautoshow/" target="_blank"
                       rel="noopener noreferrer"><Inst/></a>
                    <a href="https://www.youtube.com/@ArmenianAutoShow" target="_blank"
                       rel="noopener noreferrer"><Youtube/></a>
                </div>*/}
                <div className={styles.organizers}>
                    <p className={styles.subTitle}>{t("organizers")}</p>
                    <a href="" target="_blank" className={styles.federation}><Federation/></a>
                    <a className={styles.armeniaTravel} href="https://www.armeniatravel.am/" target="_blank"><img
                        src={ArmeniaTravel}
                        alt="armenia travel"/></a>
                    <a className={styles.promExpo} href="https://promexpo.am/" target="_blank"><img src={PromExpo}
                                                                                                    alt="promexpo"/></a>
                </div>
                <div className={styles.partners}>
                    <p className={styles.subTitle}>{t("partners")}</p>
                    <a className={styles.alphaConsulting} href="https://www.alphaconsulting.am/" target="_blank"><img
                        src={AlphaConsulting}
                        alt="AlphaConsulting"/></a>
                    <a className={styles.committee} href="" target="_blank">
                        {i18n.language === "am" ? <CommitteeArm/> : <CommitteeEng/>}
                    </a>
                </div>
                <div className={styles.sponsor}>
                    {/*<p className={styles.subTitle}>{t("sponsor")}</p>*/}
                    {/*<a className={styles.evoca} href="https://www.evoca.am/" target="_blank"><Evoca/></a>*/}
                </div>


            </div>
            <div className={styles.underRow}>
                <div className={styles.logo}><Logo/></div>
                <div className={styles.socials}><a href="https://www.facebook.com/share/19dYGXsSYx/?mibextid=LQQJ4d"
                                                   target="_blank"
                                                   rel="noopener noreferrer"><Fb/></a>
                    <a href="https://www.instagram.com/i.t.f.armenia/" target="_blank"
                       rel="noopener noreferrer"><Inst/></a>
                     <a href="https://www.youtube.com/@InternationalTourismFairArmeni" target="_blank"
                       rel="noopener noreferrer"><Youtube/></a>
                </div>
            </div>
            <a href={"https://www.neen.am/"} target={"_blank"} className={styles.heart}>made with ❤️ by Neen</a>
        </div>
    );
};

export default Footer;