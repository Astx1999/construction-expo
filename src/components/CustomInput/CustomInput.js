import React from 'react';
import classNames from "classnames";
import styles from "./CustomInput.module.scss"
import {ReactComponent as Cross} from "../../images/cross.svg";

const CustomInput = ({label, value, onChange, type, className, name, error, placeholder, disabled, handleClearAll}) => {
    return (
        <div className={classNames(className, styles.root, {[styles.error]: error})}>
            {label && <label className={styles.label}>{label}</label>}
            <input disabled={disabled} placeholder={placeholder} name={name} className={styles.input} type={type}
                   value={value} onChange={onChange}/>
            {handleClearAll && <div className={styles.clear} onClick={() => handleClearAll()}><Cross/></div>}
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default CustomInput;