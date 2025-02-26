import React, {useState, useEffect, useRef} from "react"
// import ReactFullpage from "@fullpage/react-fullpage";

import HomeNew from "./pages/HomeNew/HomeNew";
import Home from "./pages/Home/Home";
import styles from "./pages/HomeNew/HomeNew.module.scss";
import {ReactComponent as Logo} from "./images/logo.svg";
import Header from "./components/Header/Header";
import AboutUs from "./pages/AboutUs/AboutUs";
import Zones from "./pages/Zones/Zones";
import SpecialOffers from "./pages/SpecialOffers/SpecialOffers";
import Blog from "./pages/Blog/Blog";
import Partners from "./pages/Partners/Partners";
import Footer from "./components/Footer/Footer";
import PdfViewer from "./components/pdfViewer/pdfViewer";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import BecomeAVisitor from "./components/BecomeAVisitor/BecomeAVisitor";
import {ModalProvider, useModal} from "./components/ModalContext/ModalContext";
import BecomeAnExhibitor from "./components/BecomeAnExhibitor/BecomeAnExhibitor";
import useWindowResize from "./hook/useWindowResize";
import AdminPage from "./layout/Admin/Admin";
import PartnersAndSponsors from "./pages/PartnersAndSponsors/PartnersAndSponsors";
import Events from "./pages/Events/Events";


const App = () => {
    // const anchors = ["home", "portfolio", "about-us", "services", "contact-us"];
    // const [currentPage, setCurrentPage] = useState({
    //     title: "",
    //     number: '',
    //     page: 0
    // });
    //
    // const onLeave = (origin, destination, direction) => {
    //     // console.log(destination.index)
    //     setCurrentPage({
    //         title: destination.anchor,
    //         number: `0${destination.index + 1}`,
    //         page: destination.index
    //     });
    //
    // };

    const [activeSection, setActiveSection] = useState('');
    const {width} = useWindowResize()
    const location = useLocation()
    const navigate = useNavigate()

    const {modalIsOpen, setIsOpen} = useModal();
    const {agendaIsOpen, setIsOpenAgenda} = useState(true);

    const urlHasModalCommand = location.pathname.search("becomeavisitor") > 0 ||
        location.pathname.search("giveaway") > 0 ||
        location.pathname.search("becomeanexhibitor") > 0 || location.pathname.search("agenda") > 0

    const urlHasAdminCommand = location.pathname.search("nbspkkwwdsc") > 0 ||
        location.pathname.search("visitors") > 0 ||
        location.pathname.search("exhibitors") > 0 ||
        location.pathname.search("login") > 0 ||
        location.pathname.search("ticket_qr_scan") > 0

    useEffect(() => {
        if (location.pathname.search("becomeavisitor") > 0 || location.pathname.search("giveaway") > 0) {
            setIsOpen("visitor")
        }
        if (location.pathname.search("becomeanexhibitor") > 0) {
            setIsOpen("exhibitor")
        }
    })

    // Set active section based on location.pathname
    useEffect(() => {

        setActiveSection(location.pathname.substring(1));
        if (location.pathname.search("agenda") > 0) {
            navigate("/uploads/pdf/agenda.pdf")
            window.location.reload();
        }
    }, [location.pathname]);


    // Update location.pathname when activeSection changes
    useEffect(() => {
        if (!urlHasModalCommand && !urlHasAdminCommand) {
            window.history.replaceState(null, '', `/${activeSection}`);
        }
    }, [activeSection]);


    // Handle scroll to update active section
    const handleScroll = () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const height = rect.height;
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            // Calculate visibility percentage
            const visibility = (visibleHeight / height) * 100;

            if (visibility >= 50) {
                setActiveSection(section.id);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial active section

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#22242C",
            color: "white",
            fontWeight: "300",
            width: width <= 767 ? "100%" : "700px",
            maxHeight: "100vh",
            border: "none"
        },
        overlay: {
            zIndex: 9,
            backgroundColor: "rgba(0, 0, 0, 0.75)"
        }
    };


    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup function to reset the style when the component is unmounted
        return () => {
            document.body.style.overflow = '';
        };
    }, [modalIsOpen]);


    Modal.setAppElement('#root');

    const root = useRef()

    return (
        <div ref={root}>
            {/*         {
                root.current && root.current.style &&
                <>
                    <div style={{
                        height: `${root.current.style.height}px`,
                        width: '2px',
                        background: "#f3f3f3"
                    }}/>
                    <div style={{
                        height: `${root.current.style.height}px`,
                        width: '2px',
                        background: "#f3f3f3"
                    }}/>
                    <div style={{
                        height: `${root.current.style.height}px`,
                        width: '2px',
                        background: "#f3f3f3"
                    }}/>
                    <div style={{
                        height: `${root.current.style.height}px`,
                        width: '2px',
                        background: "#f3f3f3"
                    }}/>
                </>
            } */}
            {!urlHasAdminCommand ?
                <>
                    <Header activeSection={activeSection}/>
                    <div className="section right-bar-home" id="home">
                        <HomeNew/>
                    </div>
                    <div className="section right-bar-home" id="about-us">
                        <AboutUs/>
                    </div>
                    <div className="section right-bar-home" id="zones">
                        <Zones/>
                    </div>
                  {/*  <div className="section right-bar-home" id="special-offers">
                        <SpecialOffers/>
                    </div>*/}
                    <div className="section right-bar-home" id="events">
                        <Events/>
                    </div>
                    <div className="section right-bar-home" id="partners-and-sponsors">
                        <PartnersAndSponsors/>
                    </div>

                    {/* <div className="section right-bar-home" id="partners">
                            <Partners/>
                        </div>
                        <div className="section right-bar-home" id="blog">
                            <Blog/>
                        </div>*/}
                    <div className="section right-bar-home" id="contact-us">
                        <Footer/>
                    </div>
                    {/*   <Modal
                            isOpen={location.pathname.search("agenda") > 0}
                            style={customStyles}
                            contentLabel="PDF Modal"
                        >
                           <PdfViewer/>
                        </Modal>*/}
                    <Modal
                        isOpen={!!modalIsOpen}
                        style={customStyles}
                        contentLabel="Register Modal"
                    >
                        {modalIsOpen === "exhibitor" ? <BecomeAnExhibitor/> : <BecomeAVisitor/>}
                    </Modal>
                </>
                :
                <AdminPage/>
            }


        </div>
    )
};

export default App;
