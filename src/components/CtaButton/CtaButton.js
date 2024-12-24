import React from 'react';
import classNames from "classnames";
import styles from "./CtaButton.module.scss";

const CtaButton = ({text, onClick, mirror}) => {
    return (
        <div className={classNames(styles.cta, {[styles.mirror]: mirror})} onClick={onClick}>
            <span className={styles.text}>{text}</span>
        </div>
    );
};

export default CtaButton;