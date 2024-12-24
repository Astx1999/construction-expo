import React, {useRef, useState} from 'react';
import {Button} from '@mui/material';
import {jsPDF} from 'jspdf';
import styles from "./pdfViewer.module.scss";
import {Document, Page, pdfjs} from "react-pdf";
import DownloadIcon from '@mui/icons-material/Download';
import Modal from "react-modal";
import {ReactComponent as Cross} from "../../images/cross.svg";
import {useLocation, useNavigate} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const PdfViewer = () => {
    const pdfUrl = '/uploads/pdf/agenda.pdf';
    const viewerRef = useRef();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'agenda.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const closeModal = () => {
        navigate(`/`)
    };

    const handleOpenInNewTab = () => {
        window.open(pdfUrl, '_blank');
    };


    return (
        <div className={styles.modal}>

            <div className={styles.close} onClick={closeModal}><Cross/></div>
            {/*    <Button
                className={styles.button}
                onClick={handleDownload}
                color={"warning"}
                style={{backgroundColor: 'transparent'}}
            >
                <DownloadIcon color={'#fff'} fill={"#fff"}/>
            </Button> */}
            <div className={styles.pdfContainer}>
                <iframe
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                    title="PDF Viewer"
                />
            </div>
        </div>
    );
};

export default PdfViewer;
