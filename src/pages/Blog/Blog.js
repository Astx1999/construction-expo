import React, {useRef, useState} from 'react';
import {ReactComponent as Rect} from "../../images/rect.svg";
import styles from "./Blog.module.scss"
import Blog1 from '../../images/blog1.png';
import Blog2 from '../../images/blog2.png';
import Blog3 from '../../images/blog3.jpg';
import {ReactComponent as Time} from "../../images/time.svg";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import {useNavigate} from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperButtonPrev from "../../components/SwiperButtons/SwiperButtonPrev";
import {ReactComponent as Prev} from "../../images/prev.svg";
import SwiperButtonNext from "../../components/SwiperButtons/SwiperButtonNext";
import {ReactComponent as Next} from "../../images/next.svg";
import {useTranslation} from "react-i18next";
import ReadMoreText from "../../components/ReadMoreText/ReadMoreText";
import useWindowResize from "../../hook/useWindowResize";
import CtaButton from "../../components/CtaButton/CtaButton";
import {useModal} from "../../components/ModalContext/ModalContext";
import {EffectFade} from 'swiper/modules';

const blogs = [
    // {
    //     title: "blog_title3",
    //     img: Blog3,
    //     text: "blog_text3"
    // },
    {
        title: "blog_title1",
        img: Blog1,
        text: "blog_text1"
    },
    {
        title: "blog_title2",
        img: Blog1,
        text: "blog_text2"
    }
]
const Blog = () => {

    const {t} = useTranslation()
    const {width} = useWindowResize();

    const [resetKey, setResetKey] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        if (swiper.activeIndex !== currentSlideIndex) {
            setCurrentSlideIndex(swiper.activeIndex);
            setResetKey(prevKey => prevKey + 1);
        }
    };

    const {setIsOpen} = useModal();
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <Swiper
                spaceBetween={70}
                slidesPerView={1}
                initialSlide={1}
                pagination={{clickable: true}}
                // centeredSlides={true}
                loop={true}
                onSlideChange={handleSlideChange} // Update resetKey on slide change
            >
                <div className={styles.navigation}>
                    <SwiperButtonPrev><Prev/></SwiperButtonPrev>
                    <SwiperButtonNext><Next/></SwiperButtonNext>
                </div>
                {blogs.map((blog, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.content}>
                                <div className={styles.imgContainer}>
                                    <img className={styles.img} src={blog.img} alt=""/>
                                </div>

                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        <p>{t('blog')}</p>
                                    </div>
                                    <div className={styles.textTitle}>
                                        <p>{t(blog.title)}</p>
                                    </div>
                                    <div>
                                        <div className={styles.time}>
                                            <Time/><span>15 {t("mins_to_read")}</span>
                                        </div>
                                        <div className={styles.desc}
                                             dangerouslySetInnerHTML={{__html: t(blog.text)}}/>
                                        {/* <ReadMoreText htmlContent={t(blog.text)} maxLines={4} resetKey={resetKey}/>*/}

                                        {/* {index === 0 &&
                                        <div className={styles.button}>
                                            <CtaButton onClick={() => {
                                                setIsOpen("visitor")
                                                navigate("/blog/giveaway")
                                            }}
                                                       text={t("participate_in_the_giveaway")}/>
                                        </div>
                                        }*/}
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                })
                }
            </Swiper>


        </div>
    );
};

export default Blog;