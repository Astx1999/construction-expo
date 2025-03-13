import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const isDark = savedTheme === 'dark';
        setIsDarkTheme(isDark);
        document.documentElement.classList.toggle('dark-theme', isDark);
    }, []);


    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(newTheme === 'dark');
        document.documentElement.classList.toggle('dark-theme', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);

        // Force a repaint to ensure CSS updates
        document.documentElement.style.display = "none";
        setTimeout(() => {
            document.documentElement.style.display = "";
        }, 10);
    };

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
            <div className={`${styles.toggleButton} ${isDarkTheme ? styles.dark : ''}`} />
            <span className={`${styles.icon} ${styles.moon}`}>🌙</span>
            <span className={`${styles.icon} ${styles.sun}`}>☀️</span>
        </div>
    );
};

export default ThemeToggle;