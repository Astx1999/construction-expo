import {useState, useEffect} from "react";

export default function HoverTooltip({hoverElement, zoneItemsData}) {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPos, setCursorPos] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({x: e.clientX, y: e.clientY});
        };

        if (hoverElement) {
            setIsHovered(zoneItemsData.zoneItems?.find((item) =>
                item.classname === hoverElement
            ));
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            setIsHovered(false);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hoverElement]);

    return (
        isHovered && isHovered.metadata && isHovered.metadata.size && (
            <div
                style={{
                    position: "fixed",
                    top: cursorPos.y - 90,
                    left: cursorPos.x - 70,
                    background: "rgba(30, 32, 40, 0.7)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    pointerEvents: "none",
                }}
            >
                {isHovered.metadata.size} sq. m
            </div>
        )
    );
}
