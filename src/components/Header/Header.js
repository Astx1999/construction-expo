import React, {useEffect, useRef, useState} from "react";
import styles from "./Header.module.scss";
import {ReactComponent as Logo} from "../../images/logo.svg";
import classNames from "classnames";
import {NavLink, useLocation} from "react-router-dom";
import useWindowResize from "../../hook/useWindowResize";
import {ReactComponent as Languages} from "../../images/languages.svg";
import {ReactComponent as Fb} from "../../images/fb.svg";
import {ReactComponent as Inst} from "../../images/insta.svg";
import {ReactComponent as Youtube} from "../../images/youtube.svg";
import {useTranslation} from "react-i18next";
import useOnClickOutside from "../../hook/useOnClickOutside";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const menuItems = [
    {
        name: "about_us",
        link: "about-us",
    },
    {
        name: "zones",
        link: "zones",
    },
    {
        name: "agenda",
        link: "events",
    },
    {
        name: "partners",
        link: "partners-and-sponsors",
    },
    {
        name: "contact_us",
        link: "contact-us",
    },
];

const Header = ({activeSection}) => {
    const location = useLocation();
    const {width} = useWindowResize();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openLangMenu, setOpenLangMenu] = useState(false);


    useEffect(() => {
        const {pathname} = location;
        const linkWithoutSlash = pathname.substring(1);
        const element = document.getElementById(linkWithoutSlash);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }, [location]);

    const [isScrolled, setIsScrolled] = useState(false);

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [activePage, setActivePage] = useState(location.pathname);
    const {t, i18n} = useTranslation();

    const langSelect = useRef(null);

    useOnClickOutside(langSelect, () => {
        setOpenLangMenu(false);
    });

    useEffect(() => {
        let prevScrollPos = window.pageYOffset; // Initialize previous scroll position
        let visible = true; // Initially set to true

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (currentScrollPos === 0) {
                visible = true; // Ensure the header is visible at the top
            } else {
                visible = prevScrollPos > currentScrollPos;
            }

            setPrevScrollPos(currentScrollPos);
            setVisible(visible);
            setIsScrolled(currentScrollPos > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);


    return (
        <div
            className={classNames(styles.root, {
                [styles.scrolled]: isScrolled,
                [styles.show]: visible,
                [styles.hide]: !visible,
            })}
        >
            <div
                className={styles.logo}
                onClick={() =>
                    document
                        .getElementById("home")
                        ?.scrollIntoView({behavior: "smooth"})
                }
            >
                <Logo/>
            </div>
            {width > 1200 ? (
                <div className={styles.nav}>
                    {menuItems.map((menuItem, index) => (
                        <div key={index} className={styles.item}>
                            <NavLink
                                exact="true"
                                to={menuItem.link}
                                className={classNames(styles.menuItem, {[styles.active]: activeSection === menuItem.link})}
                                onClick={() => {
                                    document
                                        .getElementById(menuItem.link)
                                        ?.scrollIntoView({behavior: "smooth"})
                                }}
                            >
                                {t(menuItem.name)}
                            </NavLink>


                            {/* <div
                                className={classNames(styles.menuItem, {[styles.active]: activePage === menuItem.link})}
                                onClick={() => {

                                    document
                                        .getElementById(menuItem.link)
                                        ?.scrollIntoView({behavior: "smooth"})
                                    setActivePage(menuItem.link);
                                }}
                            >
                                {t(menuItem.name)}
                            </div>*/}
                            {index < menuItems.length - 1 && (
                                <div className={styles.slash}/>
                            )}
                        </div>
                    ))}

                    <div ref={langSelect} className={styles.langSelect} onClick={() => setOpenLangMenu(!openLangMenu)}>
                        <Languages/>

                        {openLangMenu && <div className={styles.langOption}>
                            <div
                                className={classNames(styles.lang, {
                                    [styles.activeLang]: i18n.language === "am",
                                })}
                                onClick={() => i18n.changeLanguage("am")}
                            >
                                AM
                            </div>
                            <div
                                className={classNames(styles.lang, {
                                    [styles.activeLang]: i18n.language === "en",
                                })}
                                onClick={() => i18n.changeLanguage("en")}
                            >
                                EN
                            </div>
                        </div>}
                    </div>
                    <ThemeToggle/>
                </div>
            ) : (
                <div className={styles.mobileNav}>
                    <div
                        className={styles.lang}
                        onClick={() => i18n.changeLanguage("am")}
                    >
                        AM
                    </div>
                    <div
                        className={styles.lang}
                        onClick={() => i18n.changeLanguage("en")}
                    >
                        EN
                    </div>
                    <ThemeToggle/>
                    <div className={styles.crossContainer} onClick={toggleMenu}>
                        <span
                            className={classNames(styles.menuToggle, {
                                [styles.openedMenu]: menuOpen,
                            })}
                        >
              <span
                  className={classNames(
                      styles.menuToggleBar,
                      styles.menuToggleBarTop
                  )}
              />
                            <span
                                className={classNames(
                                    styles.menuToggleBar,
                                    styles.menuToggleBarMiddle
                                )}
                            />
                            <span
                                className={classNames(
                                    styles.menuToggleBar,
                                    styles.menuToggleBarBottom
                                )}
                            />
                        </span>
                    </div>
                    {menuOpen && (
                        <div className={styles.mobileItems}>
                            <div className={styles.mobileLangContainer}>
                                <p className={classNames({
                                    [styles.activeLang]: i18n.language === "am",
                                })} onClick={() => i18n.changeLanguage("am")}>AM</p>
                                <p className={classNames({
                                    [styles.activeLang]: i18n.language === "en",
                                })} onClick={() => i18n.changeLanguage("en")}>EN</p>
                            </div>
                            {menuItems.map((menuItem, index) => (
                                <div key={index} className={styles.mobileItem}>
                                    <NavLink
                                        exact="true"
                                        to={menuItem.link}
                                        activeclassname={styles.active}
                                        onClick={() => {
                                            setMenuOpen(false);
                                            document.getElementById(menuItem.link)?.scrollIntoView({
                                                behavior: "smooth",
                                                inlineOffset: -300,
                                            });
                                        }}>
                                        {t(menuItem.name)}
                                    </NavLink>
                                    {/* <div
                                       className={classNames({[styles.active]: activePage === menuItem.link})}
                                       onClick={() => {
                                           setMenuOpen(false);
                                           document.getElementById(menuItem.link)?.scrollIntoView({
                                               behavior: "smooth",
                                               inlineOffset: -300,
                                           });
                                           setActivePage(menuItem.link)
                                       }}
                                   >
                                       {t(menuItem.name)}
                                   </div>*/}
                                </div>
                            ))}
                            <div className={styles.socials}>
                                <a
                                    href="https://www.facebook.com/profile.php?id=61556471212717"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Fb/>
                                </a>
                                <a
                                    href="https://www.instagram.com/armenianautoshow/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Inst/>
                                </a>
                               {/* <a
                                    href="https://www.youtube.com/@ArmenianAutoShow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Youtube/>
                                </a>*/}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
