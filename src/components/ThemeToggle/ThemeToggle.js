import {useState, useEffect} from 'react';
import styles from './ThemeToggle.module.scss';
import {ReactComponent as Moon} from "../../images/moon.svg";
import {ReactComponent as Sun} from "../../images/sun.svg";

const ThemeToggle = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDarkTheme(savedTheme === 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    };

    return (
        <div
            className={styles.toggleContainer}
            onClick={toggleTheme}
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex={0}
            aria-pressed={isDarkTheme}
            aria-label="Toggle dark mode"
        >
            <div className={`${styles.toggleButton} ${isDarkTheme ? styles.dark : styles.light}`}/>
            <span className={`${styles.icon} ${styles.sun}`}><Sun/>️</span>
            <span className={`${styles.icon} ${styles.moon}`}><Moon/></span>

        </div>
    );
};

export default ThemeToggle;