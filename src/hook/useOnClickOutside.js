import React, { useEffect } from "react";

// Hook

export default function useOnClickOutside(
    ref,
    handler
) {
    useEffect(() => {
        const listener = (event) => {
            event.stopPropagation();
            const el = ref?.current;
            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event?.target) || null) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
