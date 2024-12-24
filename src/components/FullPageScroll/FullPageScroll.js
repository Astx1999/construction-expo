import React, {useRef, useEffect} from 'react';
import styles from './FullPageScroll.module.scss';

function FullPageScroll({children}) {
    const sectionRefs = useRef([]);
    const activeSectionIndex = useRef(0);

    // Scroll to the specified section index
    const scrollToSection = (index) => {
        const sectionRef = sectionRefs.current[index];
        console.log(sectionRef, 777)
        if (sectionRef) {
            window.scrollTo({
                top: sectionRef.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    // Handle scroll event to determine active section
    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        // Calculate the index of the section in view
        const currentIndex = sectionRefs.current.findIndex((sectionRef) => {
            if (sectionRef) {
                return (
                    sectionRef.offsetTop <= scrollPosition &&
                    sectionRef.offsetTop + sectionRef.clientHeight > scrollPosition
                );
            }
            return false; // Return false if sectionRef is undefined
        });

        console.log(currentIndex, activeSectionIndex.current)

        // Update active section index if different
        if (currentIndex !== activeSectionIndex.current) {
            activeSectionIndex.current = currentIndex;
            console.log("Active Section Index:", activeSectionIndex.current);
            scrollToSection(activeSectionIndex.current)
        }
        console.log(sectionRefs)
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // Add scroll event listener on mount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Populate sectionRefs array with section references
    const setRef = (index) => (ref) => {
        sectionRefs.current[index] = ref;
    };


    return (
        <>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    ref: setRef(index),
                    className: styles.section,
                })
            )}
        </>
    );
}

export default FullPageScroll;
