import React, { useState } from "react";
import { ReactComponent as Info } from "../../images/info.svg";
import styles from "./InfoIconWithTooltip.module.scss";

const InfoIconWithTooltip = ({text}) => {
    const [showTooltip, setShowTooltip] = useState(true);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(true);
    };

    return (
        <div
            className={styles.infoIconWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            <Info />
            {showTooltip && (
                <div className={styles.tooltip}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default InfoIconWithTooltip;
