import React, { useEffect, useMemo } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import useWindowResize from "./hook/useWindowResize";
import AdminPage from "./layout/Admin/Admin";
import BecomeAVisitor from "./components/BecomeAVisitor/BecomeAVisitor";

const App = () => {
    const { width } = useWindowResize();
    const location = useLocation();

    const isAdminRoute = useMemo(() => {
        const p = location.pathname || "";
        return (
            p.includes("nbspkkwwdsc") ||
            p.includes("visitors") ||
            p.includes("exhibitors") ||
            p.includes("login") ||
            p.includes("ticket_qr_scan")
        );
    }, [location.pathname]);

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

    useEffect(() => {
        document.body.style.overflow = isAdminRoute ? "" : "hidden";
        return () => {
            document.body.style.overflow = '';
        };
    }, [isAdminRoute]);

    Modal.setAppElement("#root");

    return (
        <>
            {isAdminRoute ? (
                <AdminPage />
            ) : (
                <Modal isOpen={true} style={customStyles} contentLabel="Become a visitor">
                    <BecomeAVisitor />
                </Modal>
            )}
        </>
    )
};

export default App;
