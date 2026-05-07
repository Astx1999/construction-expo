import React, { useEffect, useMemo } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowResize from "./hook/useWindowResize";
import AdminPage from "./layout/Admin/Admin";
import BecomeAVisitor from "./components/BecomeAVisitor/BecomeAVisitor";

const App = () => {
    const { width } = useWindowResize();
    const location = useLocation();
    const navigate = useNavigate();

    const isAdminRoute = useMemo(() => {
        const p = location.pathname || "";
        return (
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

    useEffect(() => {
        // If user is already authenticated and manually visits /login,
        // send them to the appropriate admin resource instead of the public "/".
        if (location.pathname !== "/login") return;

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        const role = localStorage.getItem("userRole");
        if (role === "ticket_qr_check") {
            navigate("/ticket_qr_scan", { replace: true });
        } else {
            // manager/basic default landing
            navigate("/visitors", { replace: true });
        }
    }, [location.pathname, navigate]);

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
