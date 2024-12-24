import React from 'react';
import classNames from "classnames";
import styles from "./CustomInput.module.scss"

const CustomInput = ({label, value, onChange, type, className, name, error}) => {
    return (
        <div className={classNames(className, styles.root, {[styles.error]: error})}>
            <label className={styles.label}>{label}</label>
            <input name={name} className={styles.input} type={type} value={value} onChange={onChange}/>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default CustomInput;