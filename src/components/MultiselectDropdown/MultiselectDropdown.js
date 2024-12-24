import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import styles from './MultiselectDropdown.module.scss';
import useOnClickOutside from "../../hook/useOnClickOutside";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import Arrow from "../../images/arrow.png";

function MultiselectDropdown({ name, value, label, options, onChange, error, emptyDropdownText }) {
    const [selectedOptions, setSelectedOptions] = useState(value || []);
    const [openDropdown, setIsOpenDropdown] = useState(false);

    const handleOptionToggle = (optionId) => {
        const updatedOptions = selectedOptions.includes(optionId)
            ? selectedOptions.filter((id) => id !== optionId)
            : [...selectedOptions, optionId];
        setSelectedOptions(updatedOptions);
        onChange(updatedOptions);
    };

    useEffect(()=>{
        setSelectedOptions(value)
    },[value])

    const ref = useRef();
    const { t } = useTranslation();

    useOnClickOutside(ref, () => {
        setIsOpenDropdown(false);
    });

    const getOptionName = (optionId) => {
        const option = options.find((opt) => opt.id === optionId);
        return option ? option.name : '';
    };

    return (
        <div className={classNames(styles.root, {[styles.error]: error, [styles.open]: openDropdown})}>
            {label && <label className={styles.label}>{label}</label>}
            <div ref={ref}>
                <div className={styles.selectedOptions} onClick={() => setIsOpenDropdown(!openDropdown)}>
                    {selectedOptions.length > 0 ? (
                        <span className={styles.selectedOption}>
              {getOptionName(selectedOptions[0])}
            </span>
                    ) : (
                        <span className={styles.placeholder}>{t('select_options')}</span>
                    )}
                    {selectedOptions.length > 1 && (
                        <span className={styles.secondSpan}>, {selectedOptions.slice(1).map(getOptionName).join(', ')}</span>
                    )}
                </div>
                {openDropdown && (
                    <div className={styles.dropdownOptions}>
                        {options.length ? options.map((option) => (
                            <CustomCheckbox key={option.id} label={option.name} onChange={() => handleOptionToggle(option.id)} checked={selectedOptions.includes(option.id)} />
                            // <div
                            //     key={option.id}
                            //     className={classNames(styles.option, { [styles.selected]: selectedOptions.includes(option.id) })}
                            //     onClick={() => handleOptionToggle(option.id)}
                            // >
                            //     {option.name}
                            // </div>
                        )) : <p className={styles.empty}>{emptyDropdownText}</p>}
                    </div>
                )}
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
            <div className={styles.arrow}>
                <img src={Arrow} alt=""/>
            </div>
        </div>
    );
}

export default MultiselectDropdown;
