import React, {useEffect, useState, useCallback, useRef} from "react";
import cn from "classnames";
import {ReactComponent as Next} from "../../images/nextP.svg";
import {ReactComponent as Prev} from "../../images/prevP.svg";
import {debounce} from "lodash";
import styles from "./VerticalCarousel.module.scss";
import {ReactComponent as LinkSVG} from "../../images/link.svg";
import {ReactComponent as Rect} from "../../images/rect.svg";
import useWindowResize from "../../hook/useWindowResize";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ReadMoreText from "../ReadMoreText/ReadMoreText";


const VerticalCarousel = ({data}) => {

    const {width, height} = useWindowResize()
    const {t} = useTranslation()

    const [activeIndex, setActiveIndex] = useState(0);

    // #1 above. Used to determine which items appear above the active item
    const halfwayIndex = Math.ceil(data.length / 2);

    // #2 above. Used to determine the height/spacing of each item
    let itemHeight;

    switch (true) {
        case height <= 580:
            itemHeight = window.innerHeight / 3 - 400 / 3;
            break;
        case height <= 610:
            itemHeight = window.innerHeight / 3 - 450 / 3;
            break;
        case height <= 670:
            itemHeight = window.innerHeight / 3 - 470 / 3;
            break;
        case height <= 800:
            itemHeight = window.innerHeight / 3 - 500 / 3;
            break;
        case height <= 810:
            itemHeight = window.innerHeight / 3 - 550 / 3;
            break;
        case height <= 870:
            itemHeight = window.innerHeight / 3 - 600 / 3;
            break;
        default:
            itemHeight = window.innerHeight / 3 - 650 / 3;
    }

    // #3 above. Used to determine at what point an item is moved from the top to the bottom
    const shuffleThreshold = halfwayIndex * itemHeight;

    // #4 above. Used to determine which items should be visible. Prevents "ghost" transitions
    const visibleStyleThreshold = shuffleThreshold / 1.5;

    // const [isScrolling, setIsScrolling] = useState(null);
    //
    // useEffect(() => {
    //     window.addEventListener("keydown", keyDown);
    //     window.addEventListener("wheel", handleScroll);
    //
    //     return () => {
    //         window.removeEventListener("wheel", handleScroll);
    //         window.removeEventListener("keydown", keyDown);
    //     };
    // }, []);

    const handleClick = (direction) => {
        setActiveIndex((prevIndex) => {
            if (direction === "next") {
                // If we are at the end of the carousel, set the index to 0
                if (prevIndex + 1 > data.length - 1) {
                    return 0;
                }
                // Otherwise increment the index by 1
                return prevIndex + 1;
            }

            // If we are on the first slide and click previous, go to the last slide
            if (prevIndex - 1 < 0) {
                return data.length - 1;
            }
            // We are moving backwards in the carousel, decrement index by 1
            return prevIndex - 1;
        });
    };

    // const keyDown = (event) => {
    //     const {keyCode} = event;
    //
    //     if (keyCode === 37 || keyCode === 40) {
    //         handleClick("next");
    //     }
    //     if (keyCode === 39 || keyCode === 38) {
    //         handleClick("prev");
    //     }
    // };

    // const handleScroll = useCallback(
    //     debounce((debounceValue) => {
    //         setIsScrolling(debounceValue);
    //     }, 50),
    //     []
    // );
    //
    // useEffect(() => {
    //     if (isScrolling) {
    //         isScrolling.wheelDelta > 0
    //             ? handleClick("prev")
    //             : handleClick("next");
    //         setIsScrolling(null);
    //     }
    // }, [isScrolling]);

    const determinePlacement = (itemIndex) => {
        // Position item in the center of list
        if (activeIndex === itemIndex) return 0;

        // Targeting items in the second part of the list
        if (itemIndex >= halfwayIndex) {
            // If moving backwards from index 0 to the last item, move the value downwards
            if (activeIndex > itemIndex - halfwayIndex) {
                return (itemIndex - activeIndex) * itemHeight;
            } else {
                // Negative value moves upwards towards the top of the list
                return -(data.length + activeIndex - itemIndex) * itemHeight;
            }
        }

        // Spacing for items after the current index
        if (itemIndex > activeIndex) {
            return (itemIndex - activeIndex) * itemHeight;
        }

        // Spacing for items before the current index
        if (itemIndex < activeIndex) {
            // If passing the negative threshold, move into a positive positioning
            if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
                return (data.length - (activeIndex - itemIndex)) * itemHeight;
            }
            // Move into a negative positioning
            return -(activeIndex - itemIndex) * itemHeight;
        }
    };


    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance) {
            // Initial active index
            setActiveIndex(swiperInstance.realIndex);
            swiperInstance.on('slideChange', () => {
                setActiveIndex(swiperInstance.realIndex);
            });
        }
    }, [swiperInstance]);

    const handleSlideClick = (index) => {
        // console.log(index)
        // if (swiperRef.current) {
        //     swiperRef.current.swiper.slideTo(index > 5 ? index - 6 : index+3);
        // }
    };

    const swiperRef = useRef(null);

    return (
        <section className={styles.outerContainer}>
            <div className={styles.carouselWrapper}>

                <div className={styles.carousel}>
                    {width <= 767 ?
                        <Swiper
                            ref={swiperRef}
                            onSwiper={setSwiperInstance}
                            // install Swiper modules
                            loop={true}
                            freeMode={true}
                            allowTouchMove={true}
                            slidesPerView={5}
                            spaceBetween={10}
                            a11y={false}
                            centeredSlides={3}
                        >
                            {
                                data.map((partner, index) => (
                                    <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
                                        <div className={styles.partner}><img src={partner.image} alt=""/></div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        : <div className={styles.slides}>
                            <button
                                type="button"
                                className={cn(styles.carouselButton, styles.prev)}
                                onClick={() => handleClick("prev")}
                            >
                                <Prev/>
                            </button>
                            <div className={styles.carouselInner}>

                                {data.map((item, i) => (
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(i)}
                                        className={cn(styles.carouselItem, {
                                            [styles.active]: activeIndex === i,
                                            [styles.visible]:
                                            Math.abs(determinePlacement(i)) <=
                                            visibleStyleThreshold,
                                            [styles.lighter]:
                                            i === activeIndex - 2 ||
                                            i === activeIndex + 2,
                                            [styles.lightest]:
                                            i === activeIndex - 3 ||
                                            i === activeIndex + 3,
                                        })}
                                        key={i}
                                        style={{
                                            transform: `translateY(${determinePlacement(
                                                i
                                            )}px)`,
                                            height: `${itemHeight}px`,
                                        }}
                                    >
                                        <img
                                            style={{
                                                maxHeight: `${itemHeight - 20}px`,
                                            }}
                                            className={cn(
                                                styles.logo,
                                                styles[item.class]
                                            )}
                                            src={item.image}
                                            alt={item.introline}
                                        />
                                    </button>

                                ))}


                            </div>
                            <button
                                type="button"
                                className={cn(styles.carouselButton, styles.next)}
                                onClick={() => handleClick("next")}
                            >
                                <Next/>
                            </button>
                        </div>}


                    <div className={styles.content}>
                        <div className={styles.contentInner}>
                            <div className={styles.textTitle}>
                                <div className={styles.titleLogo}>
                                    <Rect/>
                                </div>
                                <p>{t(data[activeIndex].introline)}</p>
                                <div className={styles.line}>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div>
                            <ReadMoreText htmlContent={t(data[activeIndex].about)} maxLines={4} />
                            {/*<p className={styles.text} dangerouslySetInnerHTML={{__html: t(data[activeIndex].about)}}/>*/}

                            {!!data[activeIndex].website.length && <div className={styles.website}>
                                <LinkSVG/>
                                <a
                                    href={data[activeIndex].website}
                                    target={"_blank"}
                                >
                                    {data[activeIndex].website}
                                </a>
                            </div>}
                        </div>
                        <img className={styles.photo} src={data[activeIndex].photo} alt={data[activeIndex].introline}/>
                    </div>
                </div>


            </div>
        </section>
    );
};


export default VerticalCarousel;