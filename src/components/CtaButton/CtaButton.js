import React from 'react';
import classNames from "classnames";
import styles from "./CtaButton.module.scss";

const CtaButton = ({text, onClick, mirror, variant = "primary", className, IconLeft = null}) => {
    return (
        <div className={classNames(className, styles.cta, styles[variant], {[styles.mirror]: mirror})}
             onClick={onClick}>
            <span className={styles.text}> {IconLeft && <IconLeft className={styles.icon}/>} {text}</span>
        </div>
    );
};

export default CtaButton;