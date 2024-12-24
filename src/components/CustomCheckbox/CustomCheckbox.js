import React from 'react';
import styles from './CustomCheckbox.module.scss';

const CustomCheckbox = ({ label, checked, onChange }) => {
    return (
        <label className={styles.customCheckbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className={styles.checkmark}/>
            {label}
        </label>
    );
};

export default CustomCheckbox;
