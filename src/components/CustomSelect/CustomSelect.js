import React, {useState, useRef} from 'react';
import styles from './CustomSelect.module.scss'
import Arrow from '../../images/arrow.png'
import {useTranslation} from "react-i18next";
import classNames from "classnames";

const CustomSelect = ({label, name, options, value, onChange, error}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onChange(option.id);
        setIsOpen(false);
    };

    const {t} = useTranslation();

    return (
        <div className={classNames(styles.root, {[styles.error]: error, [styles.open]: isOpen})}>
            {label && <label className={styles.customSelectLabel} htmlFor={name}>{label}</label>}
            <div className={styles.select}>
                <div className={styles.customSelect} ref={selectRef}>
                    <div className={styles.customSelectTrigger} onClick={handleSelectClick}>
                        {options.find(option => option.id === value)?.name || t('select_options')}
                    </div>
                    {isOpen && (
                        <div className={styles.customSelectOptions}>
                            {options.map(option => (
                                <div
                                    key={option.id}
                                    className={styles.customSelectOption}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.arrow}>
                    <img src={Arrow} alt=""/>
                </div>
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>

    );
};

export default CustomSelect;
