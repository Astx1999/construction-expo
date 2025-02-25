import React, {useRef, useState} from "react";
import {ReactComponent as Info} from "../../images/info.svg";
import styles from "./InfoIconWithTooltip.module.scss";
import useOnClickOutside from "../../hook/useOnClickOutside";

const InfoIconWithTooltip = ({text}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setShowTooltip(false);
    });
    return (
        <div
            ref={ref}
            className={styles.infoIconWrapper}
            onClick={() => setShowTooltip((prev) => !prev)}
            style={{position: 'relative'}}
        >
            <Info/>
            {showTooltip && (
                <div className={styles.tooltip}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default InfoIconWithTooltip;
