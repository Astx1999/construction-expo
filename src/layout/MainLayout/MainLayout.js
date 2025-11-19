// src/MainLayout.js
import React from 'react';
import {Outlet} from 'react-router-dom';
import Modal from 'react-modal';
import HomeNew from '../../pages/HomeNew/HomeNew';
import AboutUs from "../../pages/AboutUs/AboutUs";
import Zones from "../../pages/Zones/Zones";
import SpecialOffers from "../../pages/SpecialOffers/SpecialOffers";
import Blog from "../../pages/Blog/Blog";
import Partners from "../../pages/Partners/Partners";
import Footer from "../../components/Footer/Footer";
import BecomeAnExhibitor from "../../components/BecomeAnExhibitor/BecomeAnExhibitor";
import BecomeAVisitor from "../../components/BecomeAVisitor/BecomeAVisitor";
import Header from "../../components/Header/Header";
import Events from "../../pages/Events/Events";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const MainLayout = ({modalIsOpen, activeSection}) => {
    const renderModalContent = () => {
        switch (modalIsOpen) {
            case "exhibitor":
                return <BecomeAnExhibitor/>;
            case "forum":
                return <BecomeAForumParticipant/>;
            case "visitor":
            default:
                return <BecomeAVisitor/>;
        }
    };

    return (
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
            <div className="section right-bar-home" id="special-offers">
                <SpecialOffers/>
            </div>
            <div className="section right-bar-home" id="agenda">
                <Events/>
            </div>
            <div className="section right-bar-home" id="partners">
                <Partners/>
            </div>
            <div className="section right-bar-home" id="blog">
                <Blog/>
            </div>
            <div className="section right-bar-home" id="contact-us">
                <Footer/>
            </div>
            <Modal
                isOpen={!!modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {renderModalContent()}
            </Modal>
            <Outlet/>
        </>
    )
};

export default MainLayout;
