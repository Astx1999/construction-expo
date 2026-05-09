// src/MainLayout.js
import React from 'react';
import Modal from 'react-modal';
import BecomeAVisitor from "../../components/BecomeAVisitor/BecomeAVisitor";
import useWindowResize from '../../hook/useWindowResize';

const MainLayout = () => {

    const { width } = useWindowResize();    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: "var(--background-color)",
          color: "white",
          fontWeight: "300",
          width: width <= 767 ? "100%" : "700px",
          maxHeight: "100vh",
          border: "none"
        },
        overlay: {
          zIndex: 9,
          backgroundColor: "#EAEAEA"
        }
      };
  return <Modal isOpen={true} style={customStyles} contentLabel="Become a visitor">
    <BecomeAVisitor />
  </Modal>;
};

export default MainLayout;
